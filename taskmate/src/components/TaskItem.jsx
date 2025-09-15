import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TaskItem({ task, onToggle, onDelete }) {
  const isDone = task.status === 'done';

  // Badge warna kategori
  const getCategoryColor = (category) => {
    switch (category) {
      case "Mobile": return "#22c55e";   // hijau
      case "RPL": return "#3b82f6";      // biru
      case "IoT": return "#f97316";      // oranye
      default: return "#94a3b8";         // abu
    }
  };

  return (
    <View style={[styles.card, isDone && styles.cardDone]}>
      <TouchableOpacity onPress={() => onToggle?.(task)} style={{ flex: 1 }} activeOpacity={0.7}>
        <Text style={[styles.title, isDone && styles.strike]}>{task.title}</Text>
        <Text style={styles.desc}>{task.description}</Text>
        <Text style={styles.meta}>{task.category} • Due {task.deadline}</Text>

        {/* Badge kategori */}
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(task.category) }]}>
          <Text style={styles.categoryText}>{task.category}</Text>
        </View>
      </TouchableOpacity>

      {/* Badge status */}
        <View style={[
        styles.badge,
        task.status === 'todo' && styles.badgeTodo,
        task.status === 'pending' && styles.badgePending,
        task.status === 'done' && styles.badgeDone
        ]}>
        <Text style={[
            styles.badgeText,
            task.status === 'todo' && { color: '#b91c1c' },
            task.status === 'pending' && { color: '#ca8a04' },
            task.status === 'done' && { color: '#166534' } 
        ]}>
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </Text>
        </View>

      {/* Tombol hapus */}
      <TouchableOpacity onPress={() => onDelete?.(task)} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1
  },
  cardDone: { backgroundColor: '#f1f5f9' },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  strike: { textDecorationLine: 'line-through', color: '#64748b' },
  desc: { color: '#475569', marginBottom: 6 },
  meta: { fontSize: 12, color: '#64748b' },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginLeft: 12
  },
  badgePending: { backgroundColor: '#fee2e2' },
  badgeDone: { backgroundColor: '#dcfce7' },
  badgeText: { fontWeight: '700', fontSize: 12 },

  // kategori badge
  categoryBadge: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start'
  },
  categoryText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600'
  },

  // delete button
  deleteBtn: {
    marginLeft: 10,
    padding: 6,
  },
  deleteText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '700'
  }
});
