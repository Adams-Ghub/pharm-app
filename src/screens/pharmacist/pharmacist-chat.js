import React, {
  useCallback,
  useState,
  useLayoutEffect,
  useEffect,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth, db } from '../../../firebase/firebase';
import { signOut } from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { GiftedChat } from 'react-native-gifted-chat';

const PharmacistChat = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  //   const navigation = useNavigation();
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

    // useEffect(() => {
    //   const backButtonHandler = () => {
    //     // Check your condition here, for example:
    //     if (shouldNavigateToSpecificScreen) {
    //       navigation.navigate('Feedback'); // Navigate to your specific screen
    //       return true; // Prevent default back behavior
    //     }
    //     return false; // Allow default back behavior
    //   };

    //   // Add the back button listener when the screen is focused
    //   const backHandler = BackHandler.addEventListener(
    //     'hardwareBackPress',
    //     backButtonHandler
    //   );

    //   return () => {
    //     // Remove the back button listener when the screen is unfocused
    //     backHandler.remove();
    //   };
    // }, [navigation]);

    const messagesRef = collection(db, 'chats', chatRoomId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
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
      console.log('good');
      // <Text>Good</Text>;
    };
  }, [navigation]);

  const to = route.params.item;
  console.log('to:', to);
  const { user } = useSelector((state) => state.users);

  const chatRoomId = to.id.slice(0, 8) + user.id.slice(0, 8);

  const onSend = useCallback((messages = []) => {
    const chatRoomId = to.id.slice(0, 8) + user.id.slice(0, 8);

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

export default PharmacistChat;
