import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {

const [resposta, setResposta] = useState('');

function MostrarResposta(){
  setResposta('How I Met Your Mother');
}

  return (
    <View style={styles.container}>
      <Text>Qual a série que Joana ama?</Text>
      <Button onPress={MostrarResposta} title="Ver resposta"/>
      <Text>{resposta}</Text>
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
});
