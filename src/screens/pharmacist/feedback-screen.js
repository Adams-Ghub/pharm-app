import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import FeedbackUser from '../../components/feedbackuser';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function FeedBackScreen() {
  users = [
    {
      name: 'Ivy Osardu',
      lastChatDate: '13/09/2023',
      lastMessage: 'Thank you',
    },
    {
      name: 'Raphael Donkor',
      lastChatDate: '13/09/2023',
      lastMessage: 'Thank you',
    },
    {
      name: 'Sandra Momo',
      lastChatDate: '13/09/2023',
      lastMessage: 'Thank you',
    },
    // {
    //   name: 'Sandra Momo Mensah',
    //   lastChatDate: '24/09/2023',
    //   lastMessage: 'Thank you',
    // },
    // {
    //   name: 'Sandra Momo Mensah',
    //   lastChatDate: '24/09/2023',
    //   lastMessage: 'Thank you',
    // },
    // {
    //   name: 'Sandra Momo Mensah',
    //   lastChatDate: '24/09/2023',
    //   lastMessage: 'Thank you',
    // },
    // {
    //   name: 'Sandra Momo Mensah',
    //   lastChatDate: '24/09/2023',
    //   lastMessage: 'Thank you',
    // },
    // {
    //   name: 'Sandra Momo Mensah',
    //   lastChatDate: '24/09/2023',
    //   lastMessage: 'Thank you',
    // },
    // {
    //   name: 'Sandra Momo Mensah',
    //   lastChatDate: '24/09/2023',
    //   lastMessage: 'Thank you',
    // },
  ];

  const { user, allUsers } = useSelector((state) => state.users);
  const { prescriptions } = useSelector((state) => state.prescription);

  const navigation = useNavigation();

  let myPrescriptions = [];
  myPrescriptions = prescriptions.filter(
    (prescriptions) => prescriptions.pharmacistId === user.id
  );

  let AllIds = [];
  myPrescriptions.map((pharmacist) => {
    if (!AllIds.includes(pharmacist.customerId)) {
      AllIds.push(pharmacist.customerId);
    }
  });

  let feedBackList = [];
  for (let i = 0; i < AllIds.length; i++) {
    allUsers.map((user) => {
      if (user.id === AllIds[i]) {
        feedBackList.push(user);
      }
    });
  }

  let latestPharmacy = [];
  myPrescriptions.map((prescription) => {
    allUsers.find((theuser) => {
      if (theuser.id === prescription.pharmacistId) {
        latestPharmacy.push(theuser);
      }
    });
  });
  return (
    <View style={styles.mainContainer}>
      <View style={styles.screenTitleContainer}>
        <Text style={styles.screenTitleText}>Feedbacks</Text>
      </View>
      <View style={styles.bottomSection}>
        <FlatList
          data={feedBackList}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('PharmacistChat', { item });
                  console.log('selected:', item);
                }}
              >
                <FeedbackUser
                  user={item.name}
                  lastChatDate={'17-09-2023'}
                  lastMessage={'thank you'}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.index}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    marginLeft: 8,
    marginRight: 8,
  },
  screenTitleContainer: {
    flex: 0.06,
    justifyContent: 'center',
  },
  bottomSection: {
    flex: 0.94,
  },
  screenTitleText: {
    color: '#03C043',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
  },
});
