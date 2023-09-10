import React, { useCallback, useState, useLayoutEffect,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth, db } from '../../../firebase/firebase';
import { signOut } from 'firebase/auth';
import {useSelector} from 'react-redux';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { GiftedChat } from 'react-native-gifted-chat';

const Chat = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const route = useRoute();
    const signOutNow = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigation.replace('Login');
        }).catch((error) => {
            // An error happened.
        });
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <Avatar
                        rounded
                        source={{
                            uri: auth?.currentUser?.photoURL,
                        }}
                    />
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={{
                    marginRight: 10
                }}
                    onPress={signOutNow}
                >
                    <Text>logout</Text>
                </TouchableOpacity>
            )
        })

        const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
               
            }))
        ));

        return () => {
          unsubscribe();
        };

    }, [navigation]);

    const to = route.params.receiver;
  
    const onSend = useCallback((messages = []) => {
        const { _id, createdAt, text, user} = messages[0]
       
        addDoc(collection(db, 'chats'), { _id, createdAt,  text, user, });
    }, []);

    const { user,} = useSelector((state) => state.users);

    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: user.details.id,
                name: user.details.name,
                avatar: auth?.currentUser?.photoURL
            }}
        />
    );
}

export default Chat;