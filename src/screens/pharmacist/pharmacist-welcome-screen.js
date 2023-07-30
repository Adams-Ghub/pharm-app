import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PharmacistDossageTemplate from '../../components/pharmacist-dossage-template';
import FeedbackUser from '../../components/feedbackuser';

const PharmacistWelcomeScreen = () => {
  const users = [
    {
      name: 'Sandra Momo Mensah',
      lastChatDate: '24/09/2023',
      lastMessage: 'Thank you',
    },
    {
      name: 'Sandra Momo Mensah',
      lastChatDate: '24/09/2023',
      lastMessage: 'Thank you',
    },
    {
      name: 'Sandra Momo Mensah',
      lastChatDate: '24/09/2023',
      lastMessage: 'Thank you',
    },
  ];
  return (
    <View style={styles.principalContainer}>
      <View style={styles.latestDossageSection}>
        <Text style={styles.latestDossageText}>Latest dossage</Text>
        <PharmacistDossageTemplate
          name={'Sandra Momo Mensah'}
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
                <FeedbackUser
                  user={item.name}
                  lastChatDate={item.lastChatDate}
                  lastMessage={item.lastMessage}
                />
              );
            }}
            keyExtractor={(item) => item.index}
          />
        </View>
      </View>
    </View>
  );
};
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
    marginBottom:4,
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

export default PharmacistWelcomeScreen;
