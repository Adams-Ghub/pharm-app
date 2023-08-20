import React, { useState,useEffect } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import DossageItem from '../../components/dossage-item';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GetAllUsers } from '../../../redux/users/usersActions';
import {AddPrescription} from '../../../redux/prescriptions/prescriptionActions';
import * as Crypto from 'expo-crypto';
import { format } from 'date-fns';
import Modal from 'react-native-modal';

export default function AddPrescriptionScreen() {
  const [dosageItems, setDosageItems] = useState(
    () => {
      // Initialize dosageItems with five DossageItem components
      return Array.from({ length: 5 }, (_, index) => (
        <DossageItem
          key={index}
          onMedicineChange={(value) => handleMedicineChange(index, value)}
        onAmtNumberChange={(value) =>  handleAmtNumberChange (index, value)}
        onAmtTypeChange={(value) => handleAmtTypeChange(index, value)}
        onFreqNumberChange={(value) => handleFreqNumberChange(index, value)}
        onFreqWordsChange={(value) => handleFreqWordsChange(index, value)}
        />
      ));
    }
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedItem, setSelectedItem] = useState(null);
  const [dosageData, setDosageData] = useState([]);
  const [patientInfo, setPatientInfo] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const { allUsers,loading, user} = useSelector((state) => state.users);
  // const { message} = useSelector((state) => state.prescription);
  
  useEffect(() => {
    dispatch(GetAllUsers());
  }, []);

  //Modal dialog 
  // useEffect(() => {
  //   if (message!==null) {
  //     setModalVisible(true);
  //   }
  // }, [message]);

  // const handleModalClose = () => {
  //   setModalVisible(false);
    
  // };

//Modal dialog ends

  // console.log("allUsers:",allUsers);

  let customers=[];
  allUsers.map((user)=>{
    if(user.role=='customer'){
      customers=[...customers,{id:user.id,name:user.name} ]
    }   
  })

  // const customers = [
  //   { id: 1, name: 'Sandra Momo' },
  //   { id: 2, name: 'Sandra Mensah' },
  //   { id: 3, name: 'Stephen Oduro' },
  //   // Add more options as needed
  // ];

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleAddPrescription = ()=>{
    if (!selectedItem) {
      console.log('Please select a customer before creating the prescription.');
      return;
    }

    console.log('pharmacy: ',user.pharmacy)
    dispatch(AddPrescription({ 
      id:Crypto.randomUUID().slice(-12),
      customerId:selectedItem.id,
      customer:selectedItem.name,
      pharmacy:user.details.pharmacy,           
      pharmacistId:user.id,
      prescription:dosageData,
      patientInfo:patientInfo,
      date:format(selectedDate, 'dd/MM/yyyy')}));
  }

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleMedicineChange = (index, value) => {
    // Update the medicine value for the corresponding DosageItem in the dosageData array
    setDosageData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], medicine: value };
      return newData;
    });
  };

 

  const addDosageItem = () => {
    setDosageItems((prevDosageItems) => [
      ...prevDosageItems,
      <DossageItem
        key={prevDosageItems.length}
        onMedicineChange={(value) => handleMedicineChange(prevDosageItems.length, value)}
        onAmtNumberChange={(value) =>  handleAmtNumberChange (prevDosageItems.length, value)}
        onAmtTypeChange={(value) => handleAmtTypeChange(prevDosageItems.length, value)}
        onFreqNumberChange={(value) => handleFreqNumberChange(prevDosageItems.length, value)}
        onFreqWordsChange={(value) => handleFreqWordsChange(prevDosageItems.length, value)}
      />,
    ]);

    // Add an empty data object for the new DosageItem to dosageData array
    setDosageData((prevData) => [...prevData, {}]);
  };

  const handleAmtNumberChange = (index, value) => {
    // Update the medicine value for the corresponding DosageItem in the dosageData array
    setDosageData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], AmtNumber: value };
      return newData;
    });
  };

  const handleAmtTypeChange = (index, value) => {
    // Update the medicine value for the corresponding DosageItem in the dosageData array
    setDosageData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], AmtType: value };
      return newData;
    });
  };

  const handleFreqNumberChange = (index, value) => {
    // Update the medicine value for the corresponding DosageItem in the dosageData array
    setDosageData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], FreqNumber: value };
      return newData;
    });
  };

  const handleFreqWordsChange = (index, value) => {
    // Update the medicine value for the corresponding DosageItem in the dosageData array
    setDosageData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], FreqWords: value };
      return newData;
    });
  };
  
   return(
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.prescriptionFormTitle}>Prescription Form</Text>
      </View>
      <View>
        <View>
          <Text style={styles.selectCustomerText}>Customer</Text>
          <SearchableDropdown
            onTextChange={(text) => console.log(text)}
            onItemSelect={handleSelectItem}
            containerStyle={{ marginBottom: 10 }}
            textInputStyle={{
              paddingHorizontal: 3,
              borderWidth: 1,
              borderColor: '#000',
              borderRadius: 5,
            }}
            itemStyle={{
              padding: 3,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={customers}
            placeholder={selectedItem ? selectedItem.name : ''}
            placeholderTextColor="#000"
            resetValue={false}
            underlineColorAndroid="transparent"
            value={selectedItem ? selectedItem.name : ''}
          />
        </View>
        <View>
          <Text style={styles.dateText}>Date</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
          <Text>{format(selectedDate, 'dd/MM/yyyy')}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
      </View>
      <View style={styles.patientInfoLabelInputContainer}>
        <Text style={styles.patientInfoLabel}>Patient info</Text>
        <TextInput
          placeholder="Eg. John Kingston, 2yrs, 10Kg"
          style={styles.patientInfoInput}
          onChangeText={(text)=>setPatientInfo(text)}
        />
      </View>

      <View>
        <Text style={styles.medicationAndDosageTitle}>Medication & Dosage</Text>

        <ScrollView style={styles.dossageItemContainer}>
          {/* <DossageItem onAmtNumberChange={()=>}/>
          <DossageItem />
          <DossageItem />
          <DossageItem />
          <DossageItem /> */}
          {dosageItems.map((dosageItem, index) => (
            <View key={index}>{dosageItem}</View>
          ))}
          <TouchableOpacity onPress={() => addDosageItem()}>
            <Text style={styles.moreMedicationText}>more medication</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.createPrescriptionBtnContainer}>
        <TouchableOpacity style={styles.createPrescriptionBtn} 
        onPress={()=>handleAddPrescription()}
        >
          <Text style={styles.prescriptionBtnText}>create prescription</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%',
    marginVertical: 10,
    marginHorizontal: 15,
    // backgroundColor:'#450989'
  },
  prescriptionFormTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#03C043',
    marginBottom: 5,
  },
  selectCustomerText: {
    paddingHorizontal: 4,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 0,
  },
  dateText:{
    fontSize:18,
    fontWeight:'600'
  },
  dateInput: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical:5,
    fontSize: 17,
    marginBottom: 7,
  
  },
  patientInfoLabel: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 4,
  },
  patientInfoInput: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 4,
    fontSize: 15,
    marginBottom: 15,
  },
  medicationAndDosageTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  moreMedicationText: {
    color: '#03C043',
    fontSize: 15,
  },
  dossageItemContainer: {
    flex: 0,
    // justifyContent: 'flex-start',
    width: '100%',
    height: '52%',
  },
  createPrescriptionBtn: {
    flex: 0,
    backgroundColor: '#03C043',
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '28%',
    borderRadius: 5,
  },
  createPrescriptionBtnContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prescriptionBtnText: {
    fontSize: 18,
    color: '#fff',
  },
  //modal styling begins
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
  //modal styling ends

});
