import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ClientDossageTemplate from '../../components/client-dossage-template';
import ClientFeedbackUser from '../../components/clientFeedbackUser';
import * as Notifications from 'expo-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllPrescription } from '../../../redux/prescriptions/prescriptionActions';

function ClientWelcomeScreen() {
  const users = [
    {
      name: 'Ivy Osardu',
      lastChatDate: '24/09/2023',
      pharmacy: 'Sikwa Pharmacy',
    },
    {
      name: 'John Addo',
      lastChatDate: '24/09/2023',
      pharmacy: 'Abric Pharmacy',
    },
    {
      name: 'Stella Odum',
      lastChatDate: '24/09/2023',
      pharmacy: `Asher's Haven Pharmacy`,
    },
  ];

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const prescription = [
    {
      AmtNumber: '1',
      AmtType: 'handful',
      FreqNumber: '2',
      FreqWords: 'Daily',
      medicine: 'Leopard ointment ',
    },
    {
      AmtNumber: '2',
      AmtType: 'tablets',
      FreqNumber: '3',
      FreqWords: 'Daily',
      medicine: 'paracetamol',
    },
    // Add more customer objects here
  ];

  const { prescriptions } = useSelector((state) => state.prescription);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (prescriptions.length === 0) {
      dispatch(GetAllPrescription());
    }
  }, [prescriptions, dispatch]);

  let myPrescriptions = [];
  if (user.details && prescriptions.length > 0) {
    prescriptions.map((prescriptions) => {
      if (prescriptions.customerId === user.details.id)
        myPrescriptions.push(prescriptions);
    });
  }

  let sortedPrescription = [];
  if (prescriptions.length >= 1) {
    sortedPrescription = myPrescriptions.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
  } else {
    sortedPrescription = myPrescriptions;
    return sortedPrescription;
  }

  console.log('latestDose', myPrescriptions);

  return (
    <View style={styles.principalContainer}>
      <View style={styles.latestDossageSection}>
        <Text style={styles.latestDossageText}>Latest dossage</Text>
        {sortedPrescription.length <= 0 ? (
          <Text>No prescriptions yet!</Text>
        ) : (
          <ClientDossageTemplate
            pharmacy={sortedPrescription[0].pharmacy}
            date={sortedPrescription[0].date}
            patientInfo={sortedPrescription[0].patientInfo}
            prescription={sortedPrescription[0].prescription}
          />
        )}
      </View>
      <View style={styles.latestFeedbackSection}>
        <Text style={styles.latestFeedbackText}>Latest feedback</Text>
        <View style={styles.feedbacksContianer}>
          <FlatList
            data={users}
            renderItem={({ item }) => {
              return (
                <ClientFeedbackUser
                  user={item.name}
                  lastChatDate={item.lastChatDate}
                  pharmacy={item.pharmacy}
                />
              );
            }}
            keyExtractor={(item) => item.index}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  principalContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
    gap: 10,
  },
  latestDossageSection: {
    flex: 0.45,
    marginHorizontal: 15,
  },

  latestDossageText: {
    padding: 0,
    marginTop: 10,
    marginBottom: 4,
    color: '#03C043',
    fontSize: 20,
    fontWeight: '600',
  },
  latestFeedbackSection: {
    flex: 0.5,
    flexDirection: 'column',
  },
  latestFeedbackText: {
    padding: 0,
    marginHorizontal: 10,
    marginVertical: 0,
    color: '#03C043',
    fontSize: 20,
    fontWeight: '600',
  },
  feedbacksContianer: {
    flexDirection: 'column',
    marginHorizontal: 15,
    marginTop: 5,
  },
});

export default ClientWelcomeScreen;
