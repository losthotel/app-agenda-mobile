import React from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';

export default function TaskList({ tasks, onEdit }) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onEdit(item)}>
          <Text>{item.title} - {item.time}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
