import React, {
  useCallback,
  useState,
  useLayoutEffect,
  useEffect,
} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth, db } from '../../../firebase/firebase';
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { GiftedChat } from 'react-native-gifted-chat';

const Chat = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const signOutNow = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.replace('Login');
      })
      .catch((error) => {
        // An error happened.
      });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginTop: 80 }}>
          <Avatar
            rounded
            source={{
              uri: user.photo || 'image',
            }}
          />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginTop: 80,
          }}
          onPress={signOutNow}
        >
          <Text>logout</Text>
        </TouchableOpacity>
      ),
    });

   
    // const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));
    // const unsubscribe = onSnapshot(q, (snapshot) => setMessages(
    //     snapshot.docs.map(doc => ({
    //         _id: doc.data()._id,
    //         createdAt: doc.data().createdAt.toDate(),
    //         text: doc.data().text,
    //         user: doc.data().user,

    //     }))
    // ));

   // Replace your existing code that retrieves chat messages with the following:



// Get the chat room ID from your route or wherever it's stored

const messagesRef = collection(db, 'chats', chatRoomId, 'messages');
const q = query(messagesRef, orderBy('createdAt', 'desc'));

const unsubscribe = onSnapshot(q, (snapshot) => {
  setMessages(
    snapshot.docs.map(doc => ({
      _id: doc.id, // Use doc.id as the message ID
      createdAt: doc.data().createdAt.toDate(),
      text: doc.data().text,
      user: doc.data().user,
    }))
  );
});

// Ensure that you have access to the chat room ID when entering the chat room.


    return () => {
      unsubscribe();
      <Text>Good</Text>;
    };
  }, [navigation]);

  const to = route.params.receiver;  
  const { user } = useSelector((state) => state.users);

  const chatRoomId =  user.id.slice(0, 8) + to.id.slice(0, 8);

  // const onSend = useCallback((messages = []) => {
  //     const { _id, createdAt, text, user} = messages[0]

  //     addDoc(collection(db, 'chats'), { _id, createdAt,  text, user, });
  // }, []);

 // Update your onSend function to add messages to the appropriate chat room's "messages" subcollection:

const onSend = useCallback((messages = []) => {
  const chatRoomId =  user.id.slice(0, 8) + to.id.slice(0, 8);

  messages.forEach((message) => {
    // Use addDoc to add the message to the "messages" subcollection of the chat room
    addDoc(collection(db, 'chats', chatRoomId, 'messages'), {
      createdAt: message.createdAt,
      text: message.text,
      user: message.user,
    });
  });
}, []);



  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user.id,
        name: user.name,
        avatar: auth?.currentUser?.photoURL,
      }}
    />
  );
};

export default Chat;
