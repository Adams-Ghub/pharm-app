import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  UpdateProfile,
  listenToProfileUpdate,
} from '../../../redux/users/usersActions';
import { resetProfileMsg } from '../../../redux/users/usersSlice';

function ProfileScreen() {
  const [image, setImage] = useState(null);
  const { user, profileMsg } = useSelector((state) => state.users);

  console.log("profileuser:",user)

  const [username, setUsername] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [pharmacy, setPharmacy] = useState(user.pharmacy);
  const [phone, setPhone] = useState(user.phone);
  const [registration, setRegistration] = useState(user.registration);

  const dispatch = useDispatch();

  const handleUpdate = () => {
    data = {
      email,
      phone,
      registration,
      name: username,
      pharmacy,
      role: user.role,
      id: user.id,
    };
    if (!username || !pharmacy || !registration || !phone || !email) {
      Alert.alert('Error', 'All input fields are required');
    } else {
      dispatch(UpdateProfile(data));
    }
  };

  useEffect(() => {
    dispatch(listenToProfileUpdate(user.id));
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
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
        <ScrollView>
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
              value={username}
              style={styles.allTextInput}
              onChangeText={(text) => setUsername(text)}
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
              value={email}
              style={styles.allTextInput}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.pharmacyAndInputContainer}>
            <View style={styles.pharmacyEditContainer}>
              <Text style={[styles.pharmacyText, styles.labelText]}>
                pharmacy
              </Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>edit</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              value={pharmacy}
              style={styles.allTextInput}
              onChangeText={(text) => setPharmacy(text)}
            />
          </View>
          <View style={styles.phoneAndInputContainer}>
            <View style={styles.phoneEditContainer}>
              <Text style={[styles.phoneText, styles.labelText]}>phone</Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>edit</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              value={phone}
              style={styles.allTextInput}
              onChangeText={(text) => setPhone(text)}
            />
          </View>
          <View style={styles.regNumberAndInputContainer}>
            <View style={styles.regNumberEditContainer}>
              <Text style={[styles.regNumberText, styles.labelText]}>
                registration number
              </Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>edit</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              value={registration}
              style={styles.allTextInput}
              onChangeText={(text) => setRegistration(text)}
            />
          </View>
        </ScrollView>
        <View>
          {profileMsg === 'updating...' ? (
            <Text style={styles.updateMsg}>updating...</Text>
          ) : profileMsg === 'updated successfully' ? (
            Alert.alert(
              'Message',
              'profile updated successfully',
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
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
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
  updateMsg: {
    textAlign: 'center',
    marginVertical: 10,
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
    height: 24,
    color: '#000',
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

export default ProfileScreen;
