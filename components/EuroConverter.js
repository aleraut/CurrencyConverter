import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, StatusBar } from "react-native";
import { Picker } from '@react-native-picker/picker';

export default function EuroConverter() {
    const [rates, setRates] = useState({});
    const [amount, setAmount] = useState(0);
    const [result, setResult] = useState(0);
    const [currency, setCurrency] = useState('');

    const fetchData = () => {
      fetch('https://api.apilayer.com/exchangerates_data/latest', 
        { headers: { 'apikey' : 'nlhHkkTQ5cZPbgzs37y3g2ANMepOFUf3' }})
      .then(response => response.json())
      .then(data => setRates(data.rates))
      .catch(err => console.error(err))
    }

    useEffect(() => {
      fetchData();
    }, []);

    const rateConversion = () => {
    const rate = rates[currency];
    setResult((amount / rate).toFixed(5))
  }

    return(
         <View style={styles.container}>
         <StatusBar hidden={true} />
         <Text style={{fontSize: 24}}>{result} €</Text> 
         <View style={styles.input}>
            <TextInput
                style={{width: 200, borderColor: 'gray', borderWidth: 1}}
                onChangeText={amount => setAmount(amount)}
                placeholder='amount'
                type="numeric"
            />
            <Picker style={{height:30, width:100, marginTop: 40}}
                selectedValue={currency}
                onValueChange={value => setCurrency(value)}>
            {
            Object.keys(rates).map(item => 
              <Picker.Item key={item} label={item} value={item} />)
            }
            </Picker>
            </View>
            <Button color="blue" onPress={rateConversion} title="convert" />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginTop: 160,
    },
});