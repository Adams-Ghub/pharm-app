import * as Notifications from 'expo-notifications';
import { useState, useRef, useEffect } from 'react';
import Constants from 'expo-constants';
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';

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
  console.log('token', token);
  return token;
}

let sound = new Audio.Sound();

const playDefaultAlarmSound = async () => {
  try {
    await sound.loadAsync(require('./assets/alarm.mp3')); // Replace with the actual filename if different

    await sound.playAsync();

    setTimeout(async () => {
      await sound.stopAsync();
    }, 6000); // Stop after 6 seconds
  } catch (error) {
    console.error('Error playing default alarm sound:', error);
  }
};

async function schedulePushNotification(prescription) {
  // time = new Date(time.getTime() + 2 * 60000);

  //const minutes = time.getMinutes();


  for(let i=0;i<prescription.medication.FreqNumber;i++){
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Dosage time',
        body: `${prescription.medication.medicine}: ${prescription.medication.AmtNumber} ${prescription.medication.AmtType}`,
        // sound: ''
      },
      trigger: {
        seconds: i===0?5:prescription.interval*3600,
        repeats: false,
      },
    });
    console.log('notif id on scheduling', id);
    return id;
  }

  // console.log('notif id on scheduling', id);
  
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
