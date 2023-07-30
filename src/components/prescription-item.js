import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function PrescribtionItem({ Id, customer, medicine, date }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.idDateContainer}>
        <Text style={styles.idText}>{Id}</Text>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.customerText}>{customer}</Text>
        <Text style={styles.medincineText}>{medicine}</Text>
      </View>
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
    marginBottom:3
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
    fontWeight: 700,
  },
  medincineText: {
    fontSize: 15,
  },
});
