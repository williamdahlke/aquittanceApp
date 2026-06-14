import { useFactory } from '@/contexts/AppDataContext';
import FactoryDTO from '@/models/factoryDTO';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function FactoryScreen() {

  const [selectedFactoryId, setSelectedFactoryId] = useState<number | null>(null);
  const [factories, setFactories] = useState<FactoryDTO[] | []>([]);
  const {selectedFactory, setSelectedFactory } = useFactory();

  useEffect(() => {
    async function GetFactoriesAsync(){
      const url = 'https://reciboapi.onrender.com/factory/getallfactories';
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Erro na requisição');
      const result = await response.json();
      setFactories(result);
      setSelectedFactoryId(selectedFactory?.id ?? 0);
    }
    GetFactoriesAsync();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Selecione a empresa
      </Text>

      {factories.map(factory => (
        <TouchableOpacity
          key={factory.id}
          style={[
            styles.card,
            selectedFactoryId === factory.id &&
              styles.cardSelected,
          ]}
          onPress={() =>
            setSelectedFactoryId(factory.id)
          }
        >
          <Text style={styles.cardText}>
            {factory.name}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        disabled={!selectedFactoryId}
        style={styles.button}
        onPress={() => {
          const factory = factories.find(
            f => f.id === selectedFactoryId
          );

          if (factory) {
            setSelectedFactory(factory);
          }          
         }
        }        
      >
        <Text style={styles.buttonText}>
          Selecionar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  cardSelected: {
    borderColor: '#2196F3',
    backgroundColor: '#E3F2FD',
  },
  cardText: {
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});