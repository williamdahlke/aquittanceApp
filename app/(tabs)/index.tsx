import React, { useState } from 'react';
import {
  Alert,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';

export default function App() {
  const [id, setId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [price, setPrice] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');

  const buildPayload = () => ({
    id: Number(id),
    price: price ? Number(price) : undefined,
    customerName,
    serviceDescription,
  });

  // 🔥 função genérica pra salvar arquivo
  const downloadAndSave = async (url: string, fileName: string) => {
    try {

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload()),
      });
      if (!response.ok) throw new Error('Erro na requisição');

      const blob = await response.blob();

      if (Platform.OS === 'web') {

          const url = window.URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          a.click();

          window.URL.revokeObjectURL(url);
      }
      else
      {
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve, reject) => {
          reader.onloadend = () => {
            const data = reader.result as string;
            resolve(data.split(',')[1]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });

        const fileUri = FileSystem.documentDirectory + fileName;

        await FileSystem.writeAsStringAsync(fileUri, base64, {
          encoding: FileSystem.EncodingType.Base64,
        });

        await Sharing.shareAsync(fileUri);

        Alert.alert('Sucesso', 'Arquivo gerado com sucesso!');
    }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Falha ao gerar arquivo');
    }
  };

  const generatePDF = async () => {
    await downloadAndSave(
      'https://reciboapi.onrender.com/acquittance/pdf',
      `recibo_${id}.pdf`
    );
    clearForm();
  };

  const generateImage = async () => {
    await downloadAndSave(
      'https://reciboapi.onrender.com/acquittance/image',
      `recibo_${id}.png`
    );
    clearForm();    
  };

const clearForm = () => {
  setId('');
  setCustomerName('');
  setPrice('');
  setServiceDescription('');
};  

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text>Id</Text>
      <TextInput value={id} onChangeText={setId} style={styles.input} />

      <Text>Cliente</Text>
      <TextInput value={customerName} onChangeText={setCustomerName} style={styles.input} />

      <Text>Valor</Text>
      <TextInput value={price} onChangeText={setPrice} style={styles.input} />

      <Text>Serviço</Text>
      <TextInput
        value={serviceDescription}
        onChangeText={setServiceDescription}
        style={[styles.input, { height: 100 }]}
        multiline
      />

      <Button title="Gerar PDF" onPress={generatePDF}  />
      <View style={{ height: 10 }} />
      <Button title="Gerar imagem" onPress={generateImage} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
});