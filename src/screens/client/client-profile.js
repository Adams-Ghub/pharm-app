import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  listenToProfileUpdate,
  UpdateProfile,
} from '../../../redux/users/usersActions';
import { resetProfileMsg } from '../../../redux/users/usersSlice';

function ClientProfileScreen() {
  const dispatch = useDispatch();

  const { user, profileMsg } = useSelector((state) => state.users);

  const [image, setImage] = useState(null);
  const [fullName, setFullName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  handledUpdate = () => {
    data = {
      email,
      phone,
      name: fullName,
      id: user.id,
      role: user.role,
    };

    if (!fullName || !email || !phone) {
      Alert.alert('Error', 'All input fields must be filled');
    }
    dispatch(UpdateProfile(data));
  };

  useEffect(() => {
    listenToProfileUpdate(user.id);
  }, [user]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  console.log('user:', user);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageMajorContainer}>
        <TouchableOpacity
          onPress={pickImage}
          style={styles.profileImageContainer}
        >
          {image ? (
            image && (
              <Image
                source={{ uri: image }}
                style={{ width: '100%', height: '100%', alignSelf: 'center' }}
              />
            )
          ) : (
            <Text style={styles.selectImgText}>select an image</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.bottomSection}>
        <ScrollView style={styles.formContainer}>
          <View style={styles.usernameAndInputContainer}>
            <View style={styles.usernameEditContainer}>
              <Text style={[styles.usernameText, styles.labelText]}>
                username
              </Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>edit</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.allTextInput}
              value={fullName}
              onChangeText={(text) => setFullName(text)}
            />
          </View>
          <View style={styles.emailAndInputContainer}>
            <View style={styles.emailEditContainer}>
              <Text style={[styles.emailText, styles.labelText]}>email</Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>edit</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.allTextInput}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          {/* <View style={styles.pharmacyAndInputContainer}>
            <View style={styles.pharmacyEditContainer}>
              <Text style={[styles.pharmacyText,styles.labelText]}>pharmacy</Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>edit</Text>
              </TouchableOpacity>
            </View>
            <TextInput style={styles.allTextInput}/>
          </View> */}
          <View style={styles.phoneAndInputContainer}>
            <View style={styles.phoneEditContainer}>
              <Text style={[styles.phoneText, styles.labelText]}>phone</Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>edit</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              keyboardType="number-pad"
              style={styles.allTextInput}
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
          </View>
        </ScrollView>
        <View></View>
        <View>
          {profileMsg === 'updating...' ? (
            <Text style={styles.updateMsg}>updating...</Text>
          ) : profileMsg === 'updated successfully' ? (
            Alert.alert(
              'Message',
              'updated successfully',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    dispatch(resetProfileMsg());
                  },
                },
              ],
              { cancelable: false }
            )
          ) : null}
          <TouchableOpacity style={styles.updateButton} onPress={handledUpdate}>
            <Text style={styles.updateButtonText}>update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  imageMajorContainer: {
    flex: 0.45,
    width: '100%',
    marginTop: 10,
  },
  selectImgText: {
    fontSize: 20,
    position: 'relative',
    top: '40%',
    alignSelf: 'center',
  },
  formContainer: {
    marginVertical: 25,
  },
  profileImageContainer: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    height: '100%',
    marginVertical: 0,
    paddingVertical: 0,
  },
  bottomSection: {
    flex: 0.5,
    width: '100%',
  },
  updateMsg: {
    textAlign: 'center',
  },
  usernameEditContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emailEditContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pharmacyEditContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  regNumberEditContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  phoneEditContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  allTextInput: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 5,
    fontSize: 14,
    height: 30,
  },
  editButtonText: {
    color: '#03C043',
    fontSize: 16,
  },
  labelText: {
    fontSize: 18,
    fontWeight: '700',
  },
  usernameAndInputContainer: {
    marginBottom: 10,
  },
  emailAndInputContainer: {
    marginBottom: 10,
  },
  pharmacyAndInputContainer: {
    marginBottom: 10,
  },
  phoneAndInputContainer: {
    marginBottom: 10,
  },
  regNumberAndInputContainer: {
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: '#03C043',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 5,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ClientProfileScreen;
