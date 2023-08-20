import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ClientDossageTemplate from '../../components/client-dossage-template';
import ClientFeedbackUser from '../../components/feedbackuser';
import * as Notifications from 'expo-notifications';

function ClientWelcomeScreen() {
  const users = [
    {
      name: 'Ivy Osardu',
      lastChatDate: '24/09/2023',
      pharmacy: 'Sikwa Pharmacy',
    },
    {
      name: 'Ivy Osardu',
      lastChatDate: '24/09/2023',
      pharmacy: 'Sikwa Pharmacy',
    },
    {
      name: 'Ivy Osardu',
      lastChatDate: '24/09/2023',
      pharmacy: 'Sikwa Pharmacy',
    },
  ];

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  return (
    <View style={styles.principalContainer}>
      <View style={styles.latestDossageSection}>
        <Text style={styles.latestDossageText}>Latest dossage</Text>
        <ClientDossageTemplate
          pharmacy={'Ivy Osardu (Sikwa Pharmacy)'}
          date={'17/09/2023'}
          patientInfo={'Ama Mensah, 2yrs, 10Kg'}
        />
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
