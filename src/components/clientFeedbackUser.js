import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import profile from '../../assets/profile.png';

function ClientFeedbackUser({ user, lastChatDate, pharmacy }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.feedbackProfileImage} source={profile} />
      </View>
      <View style={styles.namepharmacyContainer}>
        <Text style={styles.fullNameText}>{user}</Text>
        <Text style={styles.pharmacyText}>{pharmacy}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{lastChatDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
    marginHorizontal:4,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackProfileImage: {
    width: 70,
    height: 70,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#03C043',
  },
  imageContainer: {
    flex: 0.22,
  },
  namepharmacyContainer: {
    flex: 0.55,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  dateContainer: {
    flex: 0.23,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  fullNameText: {
    fontSize: 20,
    fontWeight: '600',
  },
  pharmacyText: {
    fontSize: 16,
    color:'#000'
  },
});

export default ClientFeedbackUser