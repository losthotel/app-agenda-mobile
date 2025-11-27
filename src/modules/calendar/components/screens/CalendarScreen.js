import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, Modal, TextInput, FlatList, StyleSheet, Platform
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { scheduleTaskNotification } from '../../../../utils/notifications';

// ======= IDIOMA =======
LocaleConfig.locales["pt-br"] = {
  monthNames: ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
  monthNamesShort: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
  dayNames: ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"],
  dayNamesShort: ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],
  today: "Hoje"
};
LocaleConfig.defaultLocale = "pt-br";

export default function CalendarScreen() {
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState('');
  const [tasks, setTasks] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const [newTask, setNewTask] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  
  // NOVOS: notificações
  const [taskDatePicker, setTaskDatePicker] = useState(new Date());
  const [taskTimePicker, setTaskTimePicker] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const saved = await AsyncStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  };

  const saveTasks = async (updated) => {
    const cleaned = Object.fromEntries(
      Object.entries(updated).filter(([_, arr]) => arr.length > 0)
    );
    setTasks(cleaned);
    await AsyncStorage.setItem("tasks", JSON.stringify(cleaned));
  };

  // SALVAR EVENTO + AGENDAR NOTIFICAÇÃO
  const handleAddTask = async () => {
    if (!selectedDate || !newTask.trim()) return;

    // Junta data do calendário com horário do picker
    const finalDate = new Date(selectedDate);
    finalDate.setHours(taskTimePicker.getHours());
    finalDate.setMinutes(taskTimePicker.getMinutes());

    // Agendar notificação
    await scheduleTaskNotification(newTask, finalDate);

    const updated = {
      ...tasks,
      [selectedDate]: [
        ...(tasks[selectedDate] || []),
        {
          id: Date.now(),
          title: newTask,
          description,
          time: `${String(taskTimePicker.getHours()).padStart(2, "0")}:${String(
            taskTimePicker.getMinutes()
          ).padStart(2, "0")}`
        }
      ]
    };

    saveTasks(updated);

    setNewTask('');
    setDescription('');
    setTime('');
    setModalVisible(false);
  };

  const handleDeleteTask = (id) => {
    const updated = { ...tasks };
    if (!updated[selectedDate]) return;

    updated[selectedDate] = updated[selectedDate].filter(t => t.id !== id);
    if (updated[selectedDate].length === 0) delete updated[selectedDate];

    saveTasks(updated);
  };

  const formatDateLocal = (dateString) => {
    if (!dateString) return '';
    const [y, m, d] = dateString.split("-").map(Number);
    const local = new Date(y, m - 1, d);
    return local.toLocaleDateString("pt-BR", { day: "2-digit", month: "long" });
  };

  // MARCA DATAS
  const markedDates = {
    ...Object.keys(tasks).reduce((acc, date) => {
      acc[date] = { marked: true, dotColor: "#A855F7" };
      return acc;
    }, {}),
    ...(selectedDate && { [selectedDate]: { selected: true, selectedColor: "#6B21A8" } })
  };

  const selectedTasks = tasks[selectedDate] || [];

  return (
    <LinearGradient colors={["#2e2e47", "#1e1e2f"]} style={styles.background}>
      <FlatList
        data={selectedTasks}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Feather name="calendar" size={26} color="#fff" />
              <Text style={styles.headerTitle}>AGENDA</Text>
            </View>

            <View style={styles.card}>
              <Calendar
                onDayPress={(day) => setSelectedDate(day.dateString)}
                markedDates={markedDates}
                theme={{
                  backgroundColor: "#2e2e47",
                  calendarBackground: "#2e2e47",
                  todayTextColor: "#b979f5ff",
                  arrowColor: "#A855F7",
                  monthTextColor: "#fff",
                  textSectionTitleColor: "#A855F7",
                  selectedDayBackgroundColor: "#A855F7",
                  selectedDayTextColor: "#fff",
                  dayTextColor: "#fff",
                  textDisabledColor: "#666",
                }}
              />
            </View>

            {selectedDate && (
              <View style={styles.card}>
                <View style={styles.taskHeader}>
                  <Text style={styles.dateTitle}>
                    {formatDateLocal(selectedDate)}
                  </Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setModalVisible(true)}
                  >
                    <Feather name="plus" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.taskItem}>
              <View style={{ flex: 1 }}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                {item.time ? (
                  <Text style={styles.taskTime}>
                    <Feather name="clock" size={12} /> {item.time}
                  </Text>
                ) : null}
                {item.description ? (
                  <Text style={styles.taskDesc}>{item.description}</Text>
                ) : null}
              </View>

              <TouchableOpacity
                onPress={() => handleDeleteTask(item.id)}
                style={styles.deleteButton}
              >
                <Feather name="trash-2" size={18} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={[styles.card, styles.noTask]}>
            <Feather name="clock" size={40} color="#A1A1AA" />
            <Text style={styles.noTaskText}>Nenhum evento hoje</Text>
          </View>
        }
        ListFooterComponent={
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("ReturnMenu")}
          >
            <Feather name="arrow-left" size={18} color="white" />
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        }
      />

      {/* MODAL NOVO EVENTO */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Novo Evento</Text>

            <TextInput
              placeholder="Título"
              value={newTask}
              onChangeText={setNewTask}
              style={styles.input}
              placeholderTextColor="#A1A1AA"
            />

            {/* Picker de Hora (substitui seu input antigo) */}
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              style={styles.input}
            >
              <Text style={{ color: "#fff" }}>
                Horário: {taskTimePicker.toLocaleTimeString().slice(0, 5)}
              </Text>
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={taskTimePicker}
                mode="time"
                display="default"
                onChange={(e, t) => {
                  setShowTimePicker(false);
                  if (t) setTaskTimePicker(t);
                }}
              />
            )}

            <TextInput
              placeholder="Descrição (opcional)"
              value={description}
              onChangeText={setDescription}
              multiline
              style={[styles.input, { height: 80 }]}
              placeholderTextColor="#A1A1AA"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#E5E7EB" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "#374151", fontWeight: "600" }}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#A855F7" }]}
                onPress={handleAddTask}
              >
                <Text style={{ color: "white", fontWeight: "600" }}>
                  Salvar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { padding: 16, paddingBottom: 40 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
    justifyContent: "center"
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  card: {
    backgroundColor: "#3b3b5c",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  dateTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "capitalize"
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  addButton: {
    backgroundColor: "#A855F7",
    padding: 10,
    borderRadius: 50
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#2e2e47",
    borderLeftWidth: 4,
    borderLeftColor: "#A855F7",
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
  },
  taskTitle: { fontSize: 16, fontWeight: "600", color: "#fff" },
  taskTime: { fontSize: 13, color: "#A855F7", marginTop: 2 },
  taskDesc: { fontSize: 13, color: "#d1d5db", marginTop: 4 },
  deleteButton: { padding: 8 },
  noTask: { alignItems: "center", paddingVertical: 20 },
  noTaskText: { color: "#9CA3AF", marginTop: 4 },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A855F7",
    borderRadius: 12,
    paddingVertical: 10,
    marginTop: 16,
    gap: 6,
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600"
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  modalContent: {
    backgroundColor: "#3b3b5c",
    borderRadius: 16,
    padding: 20,
    width: "100%"
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16
  },
  input: {
    borderWidth: 1,
    borderColor: "#A855F7",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color: "#fff",
    backgroundColor: "#2e2e47"
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10
  },
  modalBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10
  }
});
