import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import Dropdown from 'react-native-input-select';


export default function DossageItem({
  onMedicineChange,
  onAmtNumberChange,
  onAmtTypeChange,
  onFreqWordsChange,
  onFreqNumberChange,
}) {
  
  const [medicine, setMedicine] = useState();
  const [amtNumber, setAmtNumber] = useState();
  const [amtType, setAmtType] = useState();
  const [FreqNumber, setFreqNumber] = useState();
  const [freqWords, setFreqWords] = useState();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.medicineContainer}>
        <Text style={styles.medicineText}>medicine</Text>
        <TextInput
          style={styles.medicineInput}
          placeholder="Eg. Paracetamol syrup"
          onChangeText={(text) => onMedicineChange(text)}
        />
      </View>
      <View style={styles.amountContainer}>
        <Text style={[styles.amountText, styles.allText]}>amount</Text>
        <View style={styles.amountInputContainer}>
          <TextInput
            style={styles.amountInput}
            placeholder="1"
            onChangeText={(text) => onAmtNumberChange(text)}
          />
          <TextInput
            style={styles.amountTypeInput}
            placeholder="tablet"
            onChangeText={(text) => onAmtTypeChange(text)}
          />
        </View>
      </View>
      <View style={styles.frequencyContainer}>
        <Text style={[styles.frequencyText, styles.allText]}>frequency</Text>
        <View style={styles.frequencyInputContainer}>
          <TextInput
            style={styles.frequencyNumOfTimes}
            placeholder="3"
            onChangeText={(text) => onFreqNumberChange(text)}
          />
          <Text>x</Text>
          <TextInput
            style={styles.frequencyOption}
            placeholder="daily"
            onChangeText={(text) => onFreqWordsChange(text)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 4,
    gap: 12,
  },
  medicineContainer: {
    flex: 0.5,
  },
  amountContainer: {
    flex: 0.25,
  },
  frequencyContainer: {
    flex: 0.25,
    justifyContent: 'flex-start',
  },
  frequencyInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 1,
    width: '100%',
  },
  frequencyNumOfTimes: {
    flex: 0.25,
    borderStyle: 'solid',
    borderWidth: 1,
    textAlign: 'center',
  },
  frequencyOption: {
    flex: 0.65,
    borderStyle: 'solid',
    borderWidth: 1,
    textAlign: 'center',
  },
  allText: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
  },
  medicineText: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
  },
  medicineInput: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    fontSize: 15,
    width: '100%',
    paddingHorizontal: 2,
  },
  amountInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 1,
    alignItems: 'center',
    width: '100%',
  },
  amountInput: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    textAlign: 'center',
    width: '30%',
  },
  amountTypeInput: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    textAlign: 'center',
    width: '70%',
  },
});

