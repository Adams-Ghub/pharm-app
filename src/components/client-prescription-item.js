import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  schedulePushNotification,
  Notification,
} from '../../notification/notificationLogicFunctions';
import { useNavigation } from '@react-navigation/native';

function ClientPrescriptionItem({ data }) {
  const [notify, setNotify] = useState(false);

  const navigation = useNavigation();

  const handleSetNotification = (prescription) => {
    prescription.forEach((element) => {
      let duration =
        element.FreqWords.toLowerCase() === 'daily'
          ? 24
          : element.FreqWords.toLowerCase() === 'weekly'
          ? 168
          : element.FreqWords.toLowerCase() === 'monthly'
          ? 720
          : 0;
        let dossageInterval = duration/element.FreqNumber;
        let info={medication:element, duration, interval:dossageInterval}
        schedulePushNotification(info);
        setNotify(true);
        console.log('notificationInfo:', info);
    });
    
   
    
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.idDateContainer}>
        <Text style={styles.idText}>{data.id}</Text>
        <Text style={styles.dateText}>{data.date}</Text>
      </View>
      <View style={styles.infoSectionNotificationContainer}>
        <View style={styles.infoSection}>
          <Text style={styles.customerText}>{data.pharmacy}</Text>
          <Text style={styles.medincineText}>
            {data.prescription[0].medicine}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => handleSetNotification(data.prescription)}
          >
            <Ionicons name="notifications-outline" size={22} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSetNotification(medicine)}>
            <Ionicons name="chatbox-outline" size={22} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('PrescriptionDetails', { data })}
          >
            <Ionicons name="md-eye-outline" size={22} color="#888" />
          </TouchableOpacity>
        </View>
      </View>
      {notify && <Notification />}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#eee',
    padding: 4,
    marginVertical: 2,
  },
  idDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  idText: {
    color: '#000',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  dateText: {
    fontSize: 14,
  },
  customerText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },
  medincineText: {
    fontSize: 15,
  },
  infoSectionNotificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 5,
  },
});

export default ClientPrescriptionItem;
