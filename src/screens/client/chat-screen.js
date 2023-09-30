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

    const generateChatId = (user1Id, user2Id) => {
      const users = [user1Id, user2Id];
      users.sort(); // Sort user IDs to ensure consistency
      return users.join('_'); // Concatenate and create a unique chat room ID
    };

    // const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));
    // const unsubscribe = onSnapshot(q, (snapshot) => setMessages(
    //     snapshot.docs.map(doc => ({
    //         _id: doc.data()._id,
    //         createdAt: doc.data().createdAt.toDate(),
    //         text: doc.data().text,
    //         user: doc.data().user,

    //     }))
    // ));

    const q = query(
      collection(db, 'chats', generateChatId(user.id, to.id)),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) =>
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id, // Use the document ID as the message ID
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      )
    );

    return () => {
      unsubscribe();
      <Text>Good</Text>;
    };
  }, [navigation]);

  const to = route.params.receiver;

  // const onSend = useCallback((messages = []) => {
  //     const { _id, createdAt, text, user} = messages[0]

  //     addDoc(collection(db, 'chats'), { _id, createdAt,  text, user, });
  // }, []);

  const onSend = useCallback((messages = []) => {
    const { _id, createdAt, text, user } = messages[0];
    const chatId = generateChatId(user.id, to.id); // Generate a unique chat ID

    // Add the message to the chat document
    addDoc(collection(db, 'chats', chatId), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  const { user } = useSelector((state) => state.users);

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
