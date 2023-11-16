import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ClientDossageTemplate from '../../components/client-dossage-template';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { CreateChatRoom } from '../../../redux/users/usersActions';
import { useDispatch } from 'react-redux';

function ClientPrescriptionDetails() {
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
      <Text>Client Prescription Details</Text>
      <View style={styles.buttonIdContainer}>
        <Text>Id: {data.id}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => handleSetNotification(data.prescription[0].medicine)}
          >
            <Ionicons name="notifications-outline" size={22} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCreateChat}>
            <Ionicons name="chatbox-outline" size={22} color="#888" />
          </TouchableOpacity>
        </View>
      </View>
      <ClientDossageTemplate
        pharmacy={data.pharmacy}
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
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 5,
  },
});

export default ClientPrescriptionDetails;
