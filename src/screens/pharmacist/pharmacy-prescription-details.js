import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PharmacyDossageTemplate from '../../components/pharmacist-dossage-template';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { CreateChatRoom } from '../../../redux/users/usersActions';
import { useDispatch } from 'react-redux';

function PharmacyPrescriptionDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  data = route.params.data;

  const generateChatRoomId = (userId, pharmacistId) => {
    chatroomId = userId.slice(0, 8) + pharmacistId.slice(0, 8);
    return chatroomId;
  };

  const handleCreateChat = () => {
    dispatch(
      CreateChatRoom(generateChatRoomId(data.customerId, data.pharmacistId))
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Prescription Details</Text>
      <View style={styles.buttonIdContainer}>
        <Text style={styles.IdText}>Id: {data.id}</Text>
      </View>
      <PharmacyDossageTemplate
        name={data.customer}
        date={data.date}
        patientInfo={data.patientInfo}
        prescription={data.prescription}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  buttonIdContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical:10,
    borderStyle:'solid',
    borderWidth:1,
    borderColor:'#ccc'
    
  },
  IdText:{
    fontSize:17,
  },    
  buttonContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
    marginBottom:20
  }
});

export default PharmacyPrescriptionDetails;
