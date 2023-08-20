import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import ClentPrescriptionItem from '../../components/client-prescription-item';
import { GetAllPrescription } from '../../../redux/prescriptions/prescriptionActions';

function ClientPrescriptionScreen() {

  //Get all prescription start
  const { prescriptions, loading } = useSelector((state) => state.prescription);
  const { user} = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllPrescription());
  }, []);

  const specificPrescriptions = prescriptions.filter((prescription) =>{
    return prescription.customerId===user.id})
  //Get all prescription ends

  return (
    <View style={styles.mainContainer}>
      <View style={styles.filterSection}>
        <View style={styles.byIdContainer}>
          <Text style={styles.byIdText}>by Id</Text>
          <TextInput style={[styles.byIdInput, styles.allInput]} />
        </View>
        <View style={styles.byDateContainer}>
          <Text style={styles.byDateText}>by Date</Text>
          <TextInput style={[styles.byDateInput, styles.allInput]} />
        </View>
        <View style={styles.byNameContainer}>
          <Text style={styles.byNameText}>by Name</Text>
          <TextInput style={[styles.byNameInput, styles.allInput]} />
        </View>
        <View style={styles.filterButtonContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomSection}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={specificPrescriptions}
            renderItem={({ item }) => {
              return (
                <ClentPrescriptionItem
                  Id={item.id}
                  pharmacy={item.pharmacy}
                  medicine={item.prescription[0].medicine}
                  date={item.date}
                />
              );
            }}
          />
        )}
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  filterSection: {
    flex: 0.1,
    flexDirection: 'row',
    gap: 3,
    paddingHorizontal: 10,
  },
  byIdContainer: {
    flex: 0.2,
    alignSelf: 'center',
  },
  byDateContainer: {
    flex: 0.2,
    alignSelf: 'center',
  },
  byNameContainer: {
    flex: 0.5,
    alignSelf: 'center',
  },
  filterButtonContainer: {
    flex: 0.1,
    alignSelf: 'center',
  },
  filterButton: {
    marginTop: 12,
    alignSelf: 'center',
    paddingHorizontal: 4,
    backgroundColor: '#03C043',
    borderRadius: 50,
    height: 30,
  },

  bottomSection: {
    flex: 0.9,
    marginHorizontal: 10,
  },
  allInput: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 4,
    fontSize: 14,
    color: '#000',
    height: 24,
  },
 
});
export default ClientPrescriptionScreen;
