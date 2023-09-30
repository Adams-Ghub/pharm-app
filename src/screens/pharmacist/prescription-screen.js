import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import PrescriptionItem from '../../components/prescription-item';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetAllPrescription,
  listenToPrescriptionsUpdate,
} from '../../../redux/prescriptions/prescriptionActions';

export default function PrescriptionScreen({ navigation }) {
  const prescribtions = [
    {
      Id: '7ae458o90',
      name: 'Sandra Momo Mensah',
      Date: '24/09/2023',
      medicines: 'Paracetamol, Citro-C',
    },
    {
      Id: '7ae458o90',
      name: 'Sandra Momo Mensah',
      Date: '24/09/2023',
      medicines: 'Paracetamol, Citro-C',
    },
    {
      Id: '7ae458o90',
      name: 'Sandra Momo Mensah',
      Date: '24/09/2023',
      medicines: 'Paracetamol, Citro-C',
    },
    {
      Id: '7ae458o90',
      name: 'Sandra Momo Mensah',
      Date: '24/09/2023',
      medicines: 'Paracetamol, Citro-C',
    },
    {
      Id: '7ae458o90',
      name: 'Sandra Momo Mensah',
      Date: '24/09/2023',
      medicines: 'Paracetamol, Citro-C',
    },
    {
      Id: '7ae458o90',
      name: 'Sandra Momo Mensah',
      Date: '24/09/2023',
      medicines: 'Paracetamol, Citro-C',
    },
    {
      Id: '7ae458o90',
      name: 'Sandra Momo Mensah',
      Date: '24/09/2023',
      medicines: 'Paracetamol, Citro-C',
    },
    {
      Id: '7ae458o90',
      name: 'Sandra Momo Mensah',
      Date: '24/09/2023',
      medicines: 'Paracetamol, Citro-C',
    },
    {
      Id: '7ae458o90',
      name: 'Sandra Momo Mensah',
      Date: '24/09/2023',
      medicines: 'Paracetamol, Citro-C',
    },
    {
      Id: '7ae458o90',
      name: 'Sandra Momo Mensah',
      Date: '24/09/2023',
      medicines: 'Paracetamol, Citro-C',
    },
  ];

  //Get all prescription start
  const { prescriptions } = useSelector((state) => state.prescription);
  const { user } = useSelector((state) => state.users);

  const myPrescriptions = prescriptions.filter(
    (pres) => pres.pharmacistId === user.id
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllPrescription());
    dispatch(listenToPrescriptionsUpdate());
  }, []);

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
        {myPrescriptions.length === 0 ? (
          <Text style={styles.prescriptionMsg}>No prescriptions yet!</Text>
        ) : (
          <FlatList
            data={myPrescriptions}
            renderItem={({ item }) => {
              return (
                <PrescriptionItem
                  Id={item.id}
                  customer={item.customer}
                  medicine={item.prescription[0].medicine}
                  date={item.date}
                />
              );
            }}
          />
        )}
      </View>
      <View>
        <TouchableOpacity
          style={styles.createPrescriptionButton}
          onPress={() => {
            navigation.navigate('AddPrescription');
          }}
        >
          <AntDesign
            name="plus"
            size={24}
            color="#fff"
            iconSyle={styles.filterIcon}
          />
        </TouchableOpacity>
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
  prescriptionMsg: {
    textAlign: 'center',
    fontSize: 18,
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
  createPrescriptionButton: {
    backgroundColor: '#03C043',
    padding: 10,
    width: 45,
    height: 45,
    borderRadius: 50,
    position: 'absolute',
    right: 2,
    bottom: 5,
  },
});
