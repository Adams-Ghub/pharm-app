import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

function ProfileScreen() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
    });

    console.log(result);

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
                style={{ width: '100%', height: '100%',alignSelf:'center' }}
              />
            )
          ) : (
            <Text style={styles.selectImgText}>select an image</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.usernameAndInputContainer}>
          <View style={styles.usernameEditContainer}>
            <Text style={[styles.usernameText,styles.labelText]}>username</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>edit</Text>
            </TouchableOpacity>
          </View>
          <TextInput style={styles.allTextInput}/>
        </View>
        <View style={styles.emailAndInputContainer}>
          <View style={styles.emailEditContainer}>
            <Text style={[styles.emailText,styles.labelText]}>email</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>edit</Text>
            </TouchableOpacity>
          </View>
          <TextInput style={styles.allTextInput}/>
        </View>
        <View style={styles.pharmacyAndInputContainer}>
          <View style={styles.pharmacyEditContainer}>
            <Text style={[styles.pharmacyText,styles.labelText]}>pharmacy</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>edit</Text>
            </TouchableOpacity>
          </View>
          <TextInput style={styles.allTextInput}/>
        </View>
        <View style={styles.phoneAndInputContainer}>
          <View style={styles.phoneEditContainer}>
            <Text style={[styles.phoneText,styles.labelText]}>phone</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>edit</Text>
            </TouchableOpacity>
          </View>
          <TextInput style={styles.allTextInput}/>
        </View>
        <View style={styles.regNumberAndInputContainer}>
          <View style={styles.regNumberEditContainer}>
            <Text style={[styles.regNumberText,styles.labelText]}>registration number</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>edit</Text>
            </TouchableOpacity>
          </View>
          <TextInput style={styles.allTextInput}/>
        </View>
        <View>
            <TouchableOpacity style={styles.updateButton}>
                <Text style={styles.updateButtonText}>
                    update
                </Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>
                    update
                </Text>
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
      width:'100%',
      marginTop:10
  },
  selectImgText:{
    fontSize:20,
    position:'relative',
    top:'40%',
    alignSelf:'center'
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
    width:'100%'
  },
  usernameEditContainer:{
    flexDirection:'row',    
    justifyContent:'space-between'
  },
  emailEditContainer:{
    flexDirection:'row',    
    justifyContent:'space-between'
  }
  ,
  pharmacyEditContainer:{
    flexDirection:'row',    
    justifyContent:'space-between'
  },
  regNumberEditContainer:{
    flexDirection:'row',    
    justifyContent:'space-between'
  }
  ,
  phoneEditContainer:{
    flexDirection:'row',    
    justifyContent:'space-between'
  },
  allTextInput:{
    borderStyle:'solid',
      borderWidth:1,
      borderColor:'#333',
      borderRadius:5,
      paddingHorizontal:5,
      fontSize:14,
      height:24,

  },
  editButtonText:{
    color:'#03C043',
    fontSize:16
  },
  labelText:{
    fontSize:18,
    fontWeight:'700'    
  },
  usernameAndInputContainer:{
    marginBottom:10
  },
  emailAndInputContainer:{
    marginBottom:10
  },
  pharmacyAndInputContainer:{
    marginBottom:10
  },
  phoneAndInputContainer:{
    marginBottom:10
  },
  regNumberAndInputContainer:{
    marginBottom:10
  },
  updateButton:{
    backgroundColor:'#03C043',
    paddingVertical:8,
    alignItems:'center',
    borderRadius:5
  },
  updateButtonText:{
    color:'#fff',
    fontSize:18
  }
});

export default ProfileScreen;
