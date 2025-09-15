import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, View, TouchableOpacity } from 'react-native';
import TaskItem from '../src/components/TaskItem';
import { dummyTasks } from '../src/data/dummyTasks';
import { loadTasks, saveTasks } from '../src/storage/taskStorage';

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  // Load data dari storage saat pertama kali
  useEffect(() => {
    (async () => {
      const stored = await loadTasks();
      if (stored.length > 0) {
        setTasks(stored);
      } else {
        // kalau kosong pakai dummy
        setTasks(dummyTasks);
        saveTasks(dummyTasks);
      }
    })();
  }, []);

  // Toggle status: todo -> pending -> done -> todo
  const handleToggle = async (task) => {
    const updated = tasks.map(t => {
      if (t.id === task.id) {
        let nextStatus;
        if (t.status === 'todo') nextStatus = 'pending';
        else if (t.status === 'pending') nextStatus = 'done';
        else if (t.status === 'done') nextStatus = 'todo';
        else nextStatus = 'todo'; // fallback default

        return { ...t, status: nextStatus };
      }
      return t;
    });

    setTasks(updated);
    await saveTasks(updated);
  };

  // Hapus task
  const handleDelete = async (task) => {
    const updated = tasks.filter(t => t.id !== task.id);
    setTasks(updated);
    await saveTasks(updated);
  };

  // Filter task sesuai pilihan
  const filteredTasks = tasks.filter(task => {
    if (filter === "All") return true;
    if (filter === "Todo") return task.status === "todo";
    if (filter === "Pending") return task.status === "pending";
    if (filter === "Done") return task.status === "done";
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>TaskMate – Daftar Tugas</Text>

      {/* Filter Button */}
      <View style={styles.filterContainer}>
        {["All", "Todo", "Pending", "Done"].map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterButton, filter === f && styles.filterActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List Tugas */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={handleToggle} onDelete={handleDelete} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { fontSize: 20, fontWeight: '700', padding: 16 },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 8
  },
  filterButton: {
    marginHorizontal: 6,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#e2e8f0'
  },
  filterActive: {
    backgroundColor: '#0ea5e9'
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155'
  },
  filterTextActive: {
    color: '#fff'
  }
});
