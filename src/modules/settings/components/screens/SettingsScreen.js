import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [sound, setSound] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const saved = await AsyncStorage.getItem('settings');
    if (saved) {
      const config = JSON.parse(saved);
      setDarkMode(config.darkMode);
      setNotifications(config.notifications);
      setVibration(config.vibration);
      setSound(config.sound);
    }
  };

  const saveSettings = async (key, value) => {
    const current = { darkMode, notifications, vibration, sound };
    const updated = { ...current, [key]: value };
    await AsyncStorage.setItem('settings', JSON.stringify(updated));
  };

  const clearAllEvents = () => {
    Alert.alert(
      "Limpar Agenda",
      "Deseja realmente apagar todos os eventos?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Apagar tudo",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("tasks");
            Alert.alert("Eventos apagados!");
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Configurações</Text>

      {/* Tema */}
      <View style={styles.option}>
        <Text style={styles.optionText}>Tema escuro</Text>
        <Switch
          value={darkMode}
          onValueChange={(v) => { setDarkMode(v); saveSettings("darkMode", v); }}
        />
      </View>

      {/* Notificações */}
      <View style={styles.option}>
        <Text style={styles.optionText}>Notificações</Text>
        <Switch
          value={notifications}
          onValueChange={(v) => { setNotifications(v); saveSettings("notifications", v); }}
        />
      </View>

      {/* Vibração */}
      <View style={styles.option}>
        <Text style={styles.optionText}>Vibração</Text>
        <Switch
          value={vibration}
          onValueChange={(v) => { setVibration(v); saveSettings("vibration", v); }}
        />
      </View>

      {/* Som */}
      <View style={styles.option}>
        <Text style={styles.optionText}>Som dos lembretes</Text>
        <Switch
          value={sound}
          onValueChange={(v) => { setSound(v); saveSettings("sound", v); }}
        />
      </View>

      {/* Limpar agenda */}
      <TouchableOpacity style={styles.clearButton} onPress={clearAllEvents}>
        <Feather name="trash-2" size={18} color="white" />
        <Text style={styles.clearButtonText}>Limpar todos os eventos</Text>
      </TouchableOpacity>

      {/* Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={18} color="white" />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282836',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3b3b5c',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
  clearButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 30,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: '#A855F7',
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
