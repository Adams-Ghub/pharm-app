import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ClientFeedbackUser from '../../components/clientFeedbackUser';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllUsers } from '../../../redux/users/usersActions';
import { getMyPrescriptions } from '../../../redux/users/usersActions';
import { GetAllPrescription } from '../../../redux/prescriptions/prescriptionActions';

function ClientFeedbackScreen({ navigation }) {
  const users = [
    {
      name: 'Sarah Momo Mensah',
      lastChatDate: '13/09/2023',
      pharmacy: 'Sikwa Pharmacy',
    },
  ]

  const { user, allUsers } = useSelector((state) => state.users);
  const { prescriptions } = useSelector((state) => state.prescription);
  const dispatch = useDispatch();

  useEffect(() => {
    if (allUsers.length === 0) {
      dispatch(GetAllUsers());
    }
  }, [allUsers]);

  useEffect(() => {
    if (prescriptions.length === 0) { 
      dispatch(GetAllPrescription());
    }
  }, [prescriptions]);

  let myPrescriptions = []; 
    myPrescriptions = prescriptions.filter(
      (prescriptions) => prescriptions.customerId === user.id
    );
  

  let AllIds=[];
  myPrescriptions.map((pharmacist)=>{
    if(!AllIds.includes(pharmacist.pharmacistId)){
      AllIds.push(pharmacist.pharmacistId)
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

  console.log('latest:', feedBackList);

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
                onPress={() =>
                  navigation.navigate('chat', {
                    receiver: {
                      id: item.id,
                      name: item.name,
                      email: item.email,
                    },
                  })
                }
              >
                <ClientFeedbackUser
                  user={item.name}
                  lastChatDate={"20-09-23"}
                  pharmacy={item.pharmacy}
                />
              </TouchableOpacity>
            );
          }}
         
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

export default ClientFeedbackScreen;
