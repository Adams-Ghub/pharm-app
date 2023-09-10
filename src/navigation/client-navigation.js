import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerActions } from '@react-navigation/native';
import DrawerItem from '../components/drawer-item';
import Account from '../screens/client/client-profile';
import ClientPrescriptionScreen from '../screens/client/client-prescription-screen';
import Home from '../screens/client/client-welcome-screen';
import Feedback from '../screens/client/client-feedback-screen';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import { Logout } from '../../redux/users/usersActions';
import {
  Entypo,
  SimpleLineIcons,
  Fontisto,
  Ionicons,
  AntDesign
} from '@expo/vector-icons';
import Chat from '../screens/client/chat-screen';
import profileImg from '../../assets/profile.png';

const Stack = createNativeStackNavigator();
const chatNavigation = () => { 

  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="feedback-list"
    >
      <Stack.Screen
        name="feedback-list"
        // options={{ header: () => {} }}
        component={Feedback}
      />
      <Stack.Screen
        name="chat"
        // options={{ header: () => {} }}
        component={Chat}
      />
    </Stack.Navigator>
  );
};

function ClientNavigation({ navigation }) {
  const Drawer = createDrawerNavigator();
  const dispatch = useDispatch();
  const { user, loggedIn } = useSelector((state) => state.users);

  useEffect(() => {
    if (loggedIn === false) {
      navigation.navigate('Login');
    }
  }, [loggedIn, dispatch]);
  console.log('user:', user)

  const displayName = loggedIn ? user.details.name.split(' ') : '';

  const handleLogout = () => {
    dispatch(Logout());
  };
  return (
    <Drawer.Navigator
      screenOptions={{
        headerLeft: () => {
          return (
            <TouchableOpacity
              style={{ marginLeft: 12 }}
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            >
              <Entypo name="menu" size={30} color="#000" />
            </TouchableOpacity>
          );
        },
        headerRight: () => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                gap: 3,
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: 130,
              }}
            >
              <Image
                source={profileImg}
                style={{
                  width: 25,
                  height: 25,
                  borderWidth: 1.5,
                  borderColor: '#03C043',
                  borderRadius: 50,
                }}
              />

              <Text
                style={{
                  margin: 0,
                  padding: 0,
                  fontWeight: '600',
                  fontSize: 16,
                  marginRight: 15,
                  width: 50,
                }}
              >
                {displayName[0]}
              </Text>
              <TouchableOpacity onPress={handleLogout}>
                <AntDesign name="logout" size={16} color="#03C043" />
              </TouchableOpacity>
            </View>
          );
        },

        headerStyle: {
          backgroundColor: '#ddd',
          height: 80,
          borderBottomWidth: 2,
          borderBottomColor: '#03C043',
        },
        headerTitleContainerStyle: {
          display: 'none', // Adjust the top position to align with the drawer content
        },
        headerStatusBarHeight: 20,
        drawerStyle: {
          backgroundColor: '#03C043',
          width: '55%',
          paddingTop: '20%',
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: () => {
            return (
              <DrawerItem
                icon={
                  <SimpleLineIcons
                    name="home"
                    style={{}}
                    size={16}
                    color="#000"
                  />
                }
                title="Home"
              />
            );
          },
          drawerItemStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />
      <Drawer.Screen
        name="Account"
        component={Account}
        options={{
          drawerLabel: () => {
            return (
              <DrawerItem
                icon={
                  <SimpleLineIcons
                    name="user"
                    style={{}}
                    size={16}
                    color="#000"
                  />
                }
                title="Account"
              />
            );
          },
          drawerItemStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />
      <Drawer.Screen
        name="Prescription"
        component={ClientPrescriptionScreen}
        options={{
          drawerLabel: () => {
            return (
              <DrawerItem
                icon={
                  <Fontisto
                    name="prescription"
                    style={{}}
                    size={16}
                    color="#000"
                  />
                }
                title="Prescription"
              />
            );
          },
          drawerItemStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />
      <Drawer.Screen
        name="Feedback"
        component={chatNavigation}
        style
        options={{
          drawerLabel: () => {
            return (
              <DrawerItem
                icon={
                  <Ionicons
                    name="ios-chatbubbles-outline"
                    style={{}}
                    size={16}
                    color="#000"
                  />
                }
                title="Feedback"
              />
            );
          },
          drawerItemStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default ClientNavigation;
