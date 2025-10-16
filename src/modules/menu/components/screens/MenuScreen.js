import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')} // cria uma logo e põe em assets se quiser
        style={styles.logo}
      />
      <Text style={styles.title}>Minha Agenda Pessoal</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Calendário')}>
        <Text style={styles.buttonText}>📅 Calendário</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Configurações')}>
        <Text style={styles.buttonText}>⚙️ Configurações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282836',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3b3b5c',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
