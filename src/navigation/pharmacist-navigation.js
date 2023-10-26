import React,{useEffect} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { DrawerActions } from '@react-navigation/native';
import DrawerItem from '../components/drawer-item';
import Account from '../screens/pharmacist/profile-screen';
import PrescriptionScreen from '../screens/pharmacist/prescription-screen';
import AddPrescriptionScreen from '../screens/pharmacist/add-prescription-screen';
import PharmacyPrescriptionDetails from '../screens/pharmacist/pharmacy-prescription-details'
import Feedback from '../screens/pharmacist/feedback-screen';
import PharmacistChat from '../screens/pharmacist/pharmacist-chat'
import Home from '../screens/pharmacist/pharmacist-welcome-screen';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { Logout } from '../../redux/users/usersActions';
import {
  Entypo,
  SimpleLineIcons,
  Fontisto,
  Ionicons,
  AntDesign
} from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import profileImg from '../../assets/profile.png';

const Stack = createNativeStackNavigator();
const PrescriptionNavigatior=()=> {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="PrescriptionScreen"
      
    >
      <Stack.Screen
        name="PrescriptionScreen"
        // options={{ header: () => {} }}
        component={PrescriptionScreen}
      />    
      <Stack.Screen
        name="AddPrescription"
        // options={{ header: () => {} }}
        component={AddPrescriptionScreen}
      />    
      <Stack.Screen
        name="PharmPrescriptionDetails"
        // options={{ header: () => {} }}
        component={PharmacyPrescriptionDetails}
      />    
    </Stack.Navigator>
  );
}
const FeedbackNavigator=()=> {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="FeedbackScreen"
      
    >
      <Stack.Screen
        name="FeedbackScreen"
        // options={{ header: () => {} }}
        component={Feedback}
      />    
      <Stack.Screen
        name="PharmacistChat"
        // options={{ header: () => {} }}
        component={PharmacistChat}
      />    
    </Stack.Navigator>
  );
}

function PharmacistNavigation({ navigation }) {
  const Drawer = createDrawerNavigator();
  const { user, loggedIn } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(Logout());
  };

  useEffect(() => {
    if (loggedIn === false) {
      navigation.navigate('Login');
    }
  }, [loggedIn, dispatch]);
  console.log('user:', user)
  const displayName = loggedIn ? user.name.split(' ') : '';

  return (
    <Drawer.Navigator
      screenOptions={{
        headerLeft: () => {
          return (
            <TouchableOpacity
              style={{ marginLeft: 20 }}
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
                  fontSize: 13,
                  marginRight: 10,
                  width: 55,
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
          height: 70,
        },
        headerTitleContainerStyle: {
          top: 0, // Adjust the top position to align with the drawer content
        },
        headerStatusBarHeight: 15,
        drawerStyle: {
          backgroundColor: '#03C043',
          width: '55%',
          paddingTop: '10%',
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
        component={PrescriptionNavigatior}
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
        component={FeedbackNavigator}
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
        {/* <Drawer.Screen name="AddPrescription" component={AddPrescriptionScreen} /> */}
    </Drawer.Navigator>
  );
}

export default PharmacistNavigation;
