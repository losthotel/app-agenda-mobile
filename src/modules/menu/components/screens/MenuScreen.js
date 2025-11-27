import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext } from '../../../../contexts/ThemeContext';

export default function MenuScreen({ navigation }) {

  const { theme, darkMode } = useContext(ThemeContext);

  return (
    <LinearGradient
      colors={darkMode ? ['#2e2e47', '#1e1e2f'] : ['#ffffff', '#e7e7e7']}
      style={[styles.container]}
    >

      <Image
        source={{ uri: 'https://i.ibb.co/GQ9xPRnC/agenda2.png' }}
        style={styles.logo}
      />

      {/* Botão Calendário */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.card }]}
        onPress={() => navigation.navigate('Calendário')}
      >
        <Text style={[styles.buttonText, { color: theme.text }]}>
          📅 Calendário
        </Text>
      </TouchableOpacity>

      {/* Botão Configurações */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.card }]}
        onPress={() => navigation.navigate('Configurações')}
      >
        <Text style={[styles.buttonText, { color: theme.text }]}>
          ⚙️ Configurações
        </Text>
      </TouchableOpacity>

      <Text style={[styles.footer, { color: theme.textSecondary }]}>
        Versão 2.0.0
      </Text>

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
  button: {
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
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    fontSize: 12,
    textAlign: 'center',
  },
});
