import { StyleSheet, View } from 'react-native';
import MainNavigation from './src/navigation/main-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store,persistor} from './redux/store';



export default function App() {
  return (
   
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer style={styles.container}>
          <MainNavigation />
        </NavigationContainer>
        </PersistGate>
      </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
  },
});
