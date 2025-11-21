import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveTasks(tasks) {
  await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
}

export async function loadTasks() {
  const data = await AsyncStorage.getItem('tasks');
  return data ? JSON.parse(data) : [];
}
