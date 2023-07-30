import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import DossageItem from '../../components/dossage-item';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default function AddPrescriptionScreen() {
  const [dosageItems, setDosageItems] = useState([]);

  const addDosageItem = () => {
    setDosageItems((prevDosageItems) => [
      ...prevDosageItems,
      <DossageItem key={prevDosageItems.length} />,
    ]);
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.prescriptionFormTitle}>Prescription Form</Text>
      </View>
      <View>
        <TextInput
          placeholder="select customer"
          style={styles.selectCustomerInput}
        />
        <TextInput placeholder="date" style={styles.dateInput} />
      </View>
      <View style={styles.patientInfoLabelInputContainer}>
        <Text style={styles.patientInfoLabel}>Patient info</Text>
        <TextInput
          placeholder="Eg. John Kingston, 2yrs, 10Kg"
          style={styles.patientInfoInput}
        />
      </View>

      <View>
        <Text style={styles.medicationAndDosageTitle}>Medication & Dosage</Text>

        <ScrollView style={styles.dossageItemContainer}>
          <DossageItem />
          <DossageItem />
          <DossageItem />
          <DossageItem />
          <DossageItem />
          {dosageItems.map((dosageItem, index) => (
            <View key={index}>{dosageItem}</View>
          ))}
          <TouchableOpacity onPress={() => addDosageItem()}>
            <Text style={styles.moreMedicationText}>more medication</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.createPrescriptionBtnContainer}>
        <TouchableOpacity style={styles.createPrescriptionBtn}>
          <Text style={styles.prescriptionBtnText}>create prescription</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%',
    marginVertical: 10,
    marginHorizontal: 15,
    // backgroundColor:'#450989'
  },
  prescriptionFormTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#03C043',
    marginBottom: 5,
  },
  selectCustomerInput: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 4,
    fontSize: 17,
    marginBottom:7
  },
  dateInput: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 4,
    fontSize: 17,
    marginBottom:7
  },
  patientInfoLabel:{
    fontSize:17,
    fontWeight: '600',
    marginTop:4
  },
  patientInfoInput: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 4,
    fontSize: 15,
    marginBottom:15
  },
  medicationAndDosageTitle:{
    fontSize:17,
    fontWeight:'600'
  },
  moreMedicationText:{
    color:'#03C043',
    fontSize:15
  },
  dossageItemContainer: {
    flex: 0,
    // justifyContent: 'flex-start',
    width: '100%',
    height: '62%',
  },
  createPrescriptionBtn: {
    flex: 0,
    backgroundColor: '#03C043',
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '28%',
    borderRadius: 5,
  },
  createPrescriptionBtnContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prescriptionBtnText: {
    fontSize: 18,
    color: '#fff',
  },
});
