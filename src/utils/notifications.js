import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function pedirPermissao() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function agendarNotificacao(titulo, corpo, data) {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: titulo,
      body: corpo,
      sound: true,
    },
    trigger: {
      date,
    },
  });
}

export async function cancelarNotificacao(id) {
  await Notifications.cancelScheduledNotificationAsync(id);
}
