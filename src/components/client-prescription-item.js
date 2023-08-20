import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { schedulePushNotification,Notification } from '../../notification/notificationLogicFunctions';

function ClientPrescriptionItem({ Id, date, pharmacy, medicine }) {
  const[notify, setNotify]= useState(false)

  const handleSetNotification=(medication)=>{
    schedulePushNotification(medication);
    setNotify(true);
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.idDateContainer}>
        <Text style={styles.idText}>{Id}</Text>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <View style={styles.infoSectionNotificationContainer}>
        <View style={styles.infoSection}>
          <Text style={styles.customerText}>{pharmacy}</Text>
          <Text style={styles.medincineText}>{medicine}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={()=>handleSetNotification(medicine)}>
            <Ionicons name="notifications-outline" size={24} color="#888" />
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
  infoSectionNotificationContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default ClientPrescriptionItem;
