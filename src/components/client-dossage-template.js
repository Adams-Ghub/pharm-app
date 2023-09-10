import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function clientDosageTemplate({ pharmacy, date, patientInfo, prescription }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerSection}>
        <View style={styles.toContainer}>
          <Text style={styles.toText}>From:</Text>
          <Text style={styles.toValueText}> {pharmacy}</Text>
        </View>
        <View style={styles.onContainer}>
          <Text style={styles.onText}>On:</Text>
          <Text style={styles.onValueDate}>{date}</Text>
        </View>
        <View style={styles.forContainer}>
          <Text style={styles.forText}>Patient info:</Text>
          <Text style={styles.patientInfoText}>{patientInfo}</Text>
        </View>
      </View>
      <View style={styles.medicationSection}>
        <View style={styles.medicationHeading}>
          <Text style={styles.medicationHeadingText}>Medication</Text>
          <Text style={styles.amountHeadingText}>Amount</Text>
          <Text style={styles.frequencyHeadingText}>Frequency</Text>
        </View>
        {prescription.map((presc) => {
          return (
            <View style={styles.medicationContainer}>
              <Text style={styles.medicineText}>{presc.medicine}</Text>
              <Text style={styles.amountText}>{presc.AmtNumber+" "+ presc.AmtType}</Text>
              <Text style={styles.frequencyText}>{presc.FreqNumber+" x "+presc.FreqWords}</Text>
            </View>
          );
        })}
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 0,
    shadowColor: 'black',
    elevation: 3, // Adjust the value as per your requirement
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 16,
  },
  headerSection: {
    marginVertical: 5,
    paddingHorizontal: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
  },

  toContainer: {
    flexDirection: 'row',
  },
  toText: {
    fontSize: 17,
    fontWeight: '600',
    marginRight: 2,
  },
  onText: {
    fontSize: 17,
    fontWeight: '600',
    marginRight: 2,
  },
  forText: {
    fontSize: 17,
    fontWeight: '600',
    marginRight: 2,
  },
  toValueText: {
    fontSize: 17,
  },
  onValueDate: {
    fontSize: 17,
  },
  patientInfoText: {
    fontSize: 17,
  },
  onContainer: {
    flexDirection: 'row',
  },

  forContainer: {
    flexDirection: 'row',
  },
  medicationSection: {
    flex: 0.7,
  },
  medicationHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  medicationHeadingText: {
    marginBottom: 5,
    fontSize: 17,
    fontWeight: '600',
    width: '30%',
  },
  medicationHeadingText: {
    width: '55%',
    marginBottom: 5,
    fontSize: 17,
    fontWeight: '600',
  },
  amountHeadingText: {
    width: '22%',
    marginBottom: 5,
    fontSize: 18,
    fontWeight: '600',
  },
  frequencyHeadingText: {
    width: '23%',
    marginBottom: 5,
    fontSize: 17,
    fontWeight: '600',
  },
  medicationContainer: {
    flexDirection: 'row',
    fontSize: 17,
    fontWeight: '600',
  },
  medicineText: {
    flex: 0.55,
    marginBottom: 5,
    fontSize: 16,
  },
  amountText: {
    flex: 0.21,
    alignSelf: 'center',
    marginBottom: 5,
    fontSize: 16,
  },
  frequencyText: {
    flex: 0.24,
    marginBottom: 5,
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
  },
});
export default clientDosageTemplate;
