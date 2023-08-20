import * as Notifications from 'expo-notifications';
import {useState,useRef,useEffect} from 'react';
import Constants from 'expo-constants'; 

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      sound: true,
      lightColor: '#FF231F7C',
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      bypassDnd: true,
    });
  }
console.log('token',token)
  return token;
  
}

async function schedulePushNotification( prescription) {
  // time = new Date(time.getTime() + 2 * 60000);
  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  // const minutes = time.getMinutes();
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Dosage time',
      body: prescription,
      // sound: 'default',
    },
    trigger: {
      seconds: 60000,
      repeats: true,
    },
  });
  console.log('notif id on scheduling', id);
  return id;
}

function Notification() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return null;
}

async function cancelNotification(notifId) {
  await Notifications.cancelScheduledNotificationAsync(notifId);
}

export {
  registerForPushNotificationsAsync,
  schedulePushNotification,
  cancelNotification,
  Notification,
};
