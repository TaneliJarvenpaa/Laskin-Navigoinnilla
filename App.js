import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const DataContext = React.createContext();

function DataSetter({ children }) {
  const [data, setData] = useState([]);
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

function Calculator({navigation}) {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, setResult] = useState('');
  const { data, setData } = useContext(DataContext);

  const handleNumberChange = (text, numberType) => {
    if (numberType === 1) {
      setNumber1(text);
    } else if (numberType === 2) {
      setNumber2(text);
    }
  };

  const handleCalculation = (operator) => {
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);

    let newResult = '';
    if (operator === '+') {
      newResult = (num1 + num2).toString();
    } else if (operator === '-') {
      newResult = (num1 - num2).toString();
    }

    setResult(newResult);
    setData([...data, { key: `${num1} ${operator} ${num2} = ${newResult}` }]);
    
  };

  useEffect(() => {
    setData([]);
  }, []);

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.result}>Result: {result}</Text>
      <View style={styles.inputbox}>
        <TextInput
          keyboardType="numeric"
          placeholder="Enter number"
          style={styles.input}
          onChangeText={(text) => handleNumberChange(text, 1)}
        />
        <TextInput
          keyboardType="numeric"
          placeholder="Enter number"
          style={styles.input}
          onChangeText={(text) => handleNumberChange(text, 2)}
        />
        <View style={styles.buttonContainer}>
          <Button onPress={() => handleCalculation('+')} title="+" />
          <View style={styles.buttonSpace} />
          <Button onPress={() => handleCalculation('-')} title="-" />
          <View style={styles.buttonSpace} />
          <Button title="History" onPress={() => navigation.navigate("History")}/>
        </View>
      </View>
    </View>
  );
}

function History() {
  const { data } = useContext(DataContext);
  return (
    <View style={styles.historyContainer}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text>{item.key}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}




export default function App() {
  return (
    <DataSetter>
      {/*<NavigationContainer>
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
          iconName = 'md-home';
          } else if (route.name === 'History') {
          iconName = 'md-history';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        })}>
          <Tab.Screen name="Home" component={Calculator} />
          <Tab.Screen name="History" component={History} />
        </Tab.Navigator>
      </NavigationContainer>*/}
      <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Home" component={Calculator} />
          <Stack.Screen name="History" component={History} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataSetter>

    
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyContainer:{
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderColor: 'black',
    width: 200,
    height: 50,
    borderWidth: 1,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    height: 40,
    width: 80,
  },
  buttonSpace: {
    width: 20,
  },
  result: {
    fontSize: 30,
    color: '#4682B4',
  },
  inputbox: {
    height: 200,
    width: 200,
  }
});
