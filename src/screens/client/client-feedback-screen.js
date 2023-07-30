import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ClientFeedbackUser from '../../components/clientFeedbackUser';

function ClientFeedbackScreen() {
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
  return (
    <View style={styles.mainContainer}>
      <View style={styles.screenTitleContainer}>
        <Text style={styles.screenTitleText}>Feedbacks</Text>
      </View>
      <View style={styles.bottomSection}>
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
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    marginLeft:8,
    marginRight:8
    },
  screenTitleContainer:{
    flex:0.06,
    justifyContent:'center',
    
  },
  bottomSection:{
    flex:0.94
  },
  screenTitleText: {
    color: '#03C043',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
  },
})

export default ClientFeedbackScreen