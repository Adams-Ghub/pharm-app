import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import FeedbackUser from '../../components/feedbackuser';

export default function FeedBackScreen() {
  users = [
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
    <View style={styles.mainContainer}>
      <View style={styles.screenTitleContainer}>
        <Text style={styles.screenTitleText}>Feedbacks</Text>
      </View>
      <View style={styles.bottomSection}>
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
});
