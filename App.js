import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [value, setValue] = useState('');
  const [storedValue, setStoredValue] = useState('');

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@storage_Key', value);
      setStoredValue(value);
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');

      if (value !== null) {
        setStoredValue(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.childContainer}>
        <TextInput style={styles.textInput} onChangeText={text => setValue(text)} value={value} />
        <Button title='Store Data' onPress={storeData} />
        <Button title='Retrieve Data' onPress={retrieveData} />
        <Text>Stored Value: {storedValue}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  childContainer: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  textInput: {
    width: 120,
    height: 40,
    borderColor: 'black',
    borderWidth: 1
  }
});

export default App;