import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function PrescriptionItem({ data, receivers }) {
  const navigation = useNavigation();
  const receiver = receivers.filter((rec) => data.customerId === rec.id);
  console.log('receiver:', receiver);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.idDateContainer}>
        <Text style={styles.idText}>{data.id}</Text>
        <Text style={styles.dateText}>{data.date}</Text>
      </View>
      <View style={styles.infoButtonsContainer}>
        <View style={styles.infoSection}>
          <Text style={styles.customerText}>{data.customer}</Text>
          <Text style={styles.medincineText}>
            {data.prescription[0].medicine}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('PharmPrescriptionDetails', { data })}
          >
            <Ionicons name="md-eye-outline" size={22} color="#888" />
          </TouchableOpacity>
        </View>
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
  infoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
