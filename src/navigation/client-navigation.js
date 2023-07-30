import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import DrawerItem from '../components/drawer-item';
import Account from '../screens/client/client-profile';
import ClientPrescriptionScreen from '../screens/client/client-prescription-screen';
import Home from '../screens/client/client-welcome-screen';
import Feedback from '../screens/client/client-feedback-screen';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import {
  Entypo,
  SimpleLineIcons,
  Fontisto,
  Ionicons,
} from '@expo/vector-icons';
import profileImg from '../../assets/profile.png';

function ClientNavigation({ navigation }) {
  const Drawer = createDrawerNavigator();
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
                }}
              >
                Sandra Momo
              </Text>
            </View>
          );
        },

        headerStyle: {
          backgroundColor: '#ddd',
          height: 80,
          borderBottomWidth:2,
          borderBottomColor:'#03C043'
        },
        headerTitleContainerStyle: {
          display:'none' // Adjust the top position to align with the drawer content
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
        component={Feedback}
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
