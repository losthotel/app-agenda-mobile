import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// title = nome da tarefa
// date = objeto Date COMPLETO (dia + hora), vindo da tela
export async function scheduleTaskNotification(title, date) {
  await Notifications.requestPermissionsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body: "Você tem um evento marcado.",
      sound: true,
    },
    trigger: date, // <-- AQUI PERMITE QUALQUER HORÁRIO
  });
}
//Aqui terá os códigos da notificação
