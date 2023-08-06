import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserLogin } from '../../redux/users/usersActions';
import Modal from 'react-native-modal';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const handleLogin = () => {
    dispatch(UserLogin({email, password}));
    console.log('email/password:', email + '/' + password);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    navigation.navigate('Login');
  };

  useEffect(() => {
    if (user) {
      console.log('role:', user.details.role);
      user.details.role === 'customer'
        ? navigation.navigate('ClientWelcome')
        : navigation.navigate('PharmacistWelcome');
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.headingSection}>
        <Text style={styles.headingText}>Login</Text>
      </View>
      <ScrollView style={styles.bottomSection}>
        <View style={styles.emailLabelInputContainer}>
          <Text style={styles.emailText}>Email Address</Text>
          <TextInput
            style={styles.emailInput}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.passwordLabelInputContainer}>
          <Text style={styles.passwordText}>Password</Text>
          <TextInput
            secureTextEntry
            style={styles.passwordInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.loginButtonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => handleLogin()}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.forgotPasswordTextContainer}>
          <TouchableOpacity style={styles.forgotPasswordTextClickable}>
            <Text style={styles.forgotPasswordText}>Forgot password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.noAccountTextsContainer}>
          <Text style={styles.noAccountText}>Don't have account?</Text>
          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.createAccountButtonText}>Create account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>User signed up successfully!</Text>
          <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#03C043',
    justifyContent: 'flex-start',
    width: '100%',
    margin: 0,
    padding: 0,
  },
  headingSection: {
    flex: 0.4,
    height: '10%',
    justifyContent: 'center',
  },
  headingText: {
    alignSelf: 'center',
    fontSize: 35,
    color: '#fefefe',
    fontWeight: '300',
  },
  bottomSection: {
    flex: 0.6,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 90,
    paddingHorizontal: 20,
  },
  emailLabelInputContainer: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#03C043',
    marginBottom: 30,
  },
  emailText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#565656',
    paddingLeft: 10,
    marginBottom: 16,
  },
  emailInput: {
    paddingLeft: 10,
    color: '#050505',
    fontSize: 18,
  },
  passwordLabelInputContainer: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#03C043',
    marginBottom: 30,
  },
  passwordText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#565656',
    paddingLeft: 10,
    marginBottom: 16,
  },
  passwordInput: {
    paddingLeft: 10,
    color: '#050505',
    fontSize: 18,
  },
  loginButton: {
    backgroundColor: '#03C043',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#fefefe',
    paddingVertical: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  forgotPasswordTextContainer: {
    marginTop: 15,
    marginBottom: 40,
  },
  forgotPasswordTextClickable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#03C043',
    fontSize: 18,
    fontWeight: '400',
  },
  noAccountTextsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccountText: {
    color: '#565656',
    fontSize: 18,
  },
  createAccountButtonText: {
    color: '#03C043',
    fontSize: 18,
    marginVertical: 2,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: '#03C043',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
