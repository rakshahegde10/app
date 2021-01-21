import React, {useState} from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import HealthkitController from './HealthKit.js';

const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';


export default function App() {
  const [name, setName] = useState('john');
  const [age, setAge] = useState('45');
  const [bp, setBp] = useState('180/60');
  const [step, setStep] = useState('1234');

  clickHandler = async() => {
    const login = HealthkitController.updateStepsCount()
    .then(result => console.warn(result));
    // all states (name, age, bp, step) are set here
  }

  const fetchSteps = () => {
    let date = new Date()
    return new Promise((resolve, reject) => {
      HealthkitController.updateSteps(date, (err, data) => {
      if (err) {
       console.log('err')
        reject(err);
      } else {
        resolve(Object.values(data));
      }
      });
    });
  }


  return (
    <View style={styles.container}>
      <View style={styles.touch}>
      <TouchableOpacity onPress={() => {isIOS ? HealthkitController.requestAuthorization() : console.log('need to handle android') }}>
        <Text style={styles.label}>Request Healthkit Permissions</Text>
      </TouchableOpacity>
      </View>
      <View style={{ paddingBottom: 50 }}></View>
      <View style={styles.touch}>
      <TouchableOpacity onPress={clickHandler}>
        <Text style={styles.label}>Request Steps</Text>
      </TouchableOpacity>
      </View>
      <View style={{ paddingBottom: 50 }}></View>
      <Text style={styles.label}>Name</Text>
      <TextInput value={name} placeholder='Type Here...'  style={styles.text} textAlign='center'/>
      <View style={{ paddingBottom: 50 }}></View>
      <Text style={styles.label}>Age</Text>
      <TextInput value={age} placeholder='Type Here...' style={styles.text} textAlign='center'/>
      <View style={{ paddingBottom: 50 }}></View>
      <Text style={styles.label}>BP</Text>
      <TextInput value={bp} placeholder='Type Here...' style={styles.text} textAlign='center'/>   
      <View style={{ paddingBottom: 50 }}></View>
      <Text style={styles.label}>Step Count</Text>
      <TextInput value={step} placeholder='Type Here...' style={styles.text} textAlign='center'/>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touch: {
    backgroundColor: 'grey',
    padding: 15
  },
  text: {
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderTopWidth:2,
    borderBottomWidth: 2,
    height: 40,
    width:200,
    borderColor: 'black',
    justifyContent: "center",
    alignItems: "stretch",
  },
  label: {
    fontFamily: 'helvetica',
    fontSize: 18
  }
});