import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PharmacistDossageTemplate from '../../components/pharmacist-dossage-template';
import FeedbackUser from '../../components/feedbackuser';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllPrescription } from '../../../redux/prescriptions/prescriptionActions';

const PharmacistWelcomeScreen = () => {
  const users = [
    {
      name: 'Raphael Donkor',
      lastChatDate: '24/09/2023',
      lastMessage: 'Thank you',
    },
    {
      name: 'Ivy Osardu',
      lastChatDate: '24/09/2023',
      lastMessage: 'Thank you',
    },
    {
      name: 'Sandra Momo',
      lastChatDate: '24/09/2023',
      lastMessage: 'Thank you',
    },
  ];

  const { prescriptions } = useSelector((state) => state.prescription);
  const { user,allUsers } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllPrescription());
  }, []);

  console.log('prescriptions:', prescriptions);
  let myPrescriptions = [];
  if (user && prescriptions.length > 0) {
    prescriptions.map((prescription) => {
      if (prescription.pharmacistId === user.id) {
        myPrescriptions.push(prescription);
      }
    });
  }

  console.log('my prescriptions:', myPrescriptions);

  let sortedPrescription = [];
  if (prescriptions.length > 1) {
    sortedPrescription = myPrescriptions.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
  } else {
    sortedPrescription = myPrescriptions;
  }


  let AllIds=[];
  myPrescriptions.map((pharmacist)=>{
    if(!AllIds.includes(pharmacist.customerId)){
      AllIds.push(pharmacist.customerId)
    }
  })

let feedBackList=[];
for(let i=0;i<AllIds.length;i++){
  allUsers.map((user)=>{
    if(user.id===AllIds[i]){
      feedBackList.push(user)
    }
  })
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
    <View style={styles.principalContainer}>
      <View style={styles.latestDossageSection}>
        <Text style={styles.latestDossageText}>Latest dossage</Text>

        {sortedPrescription.length === 0 || prescriptions.length === 0 ? (
          <Text>No prescriptions yet!</Text>
        ) : (
          <PharmacistDossageTemplate
            name={sortedPrescription[0].customer}
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
            data={feedBackList}
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

export default PharmacistWelcomeScreen;
