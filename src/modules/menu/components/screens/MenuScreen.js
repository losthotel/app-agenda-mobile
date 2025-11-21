import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function MenuScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#2e2e47', '#1e1e2f']}
      style={styles.container}
    >
    <Image
      source={{ uri: 'https://i.ibb.co/GQ9xPRnC/agenda2.png' }}
      style={styles.logo}
    />
      {/* <Text style={styles.title}>AgendaGO</Text> */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Calendário')}>
        <Text style={styles.buttonText}>📅 Calendário</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Configurações')}>
        <Text style={styles.buttonText}>⚙️ Configurações</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Versão 2.0.0</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 25,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 40,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  button: {
    backgroundColor: '#3b3b5c',
    width: '80%',
    paddingVertical: 15,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
  },
});
