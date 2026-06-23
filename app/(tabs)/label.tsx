// LabelSheetScreen.tsx

import React, { useState } from 'react';
import {
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Label } from '@/models/labelType';
import LabelEditorModal from '../views/labelEditorModal';
import LabelPreview from '../views/labelPreview';

export default function LabelSheetScreen() {
  const [labels, setLabels] = useState<Label[]>([
    { id: 1, items: [] },
    { id: 2, items: [] },
    { id: 3, items: [] },
    { id: 4, items: [] }
  ]);

  const [selectedLabel, setSelectedLabel] =
    useState<Label | null>(null);

  function saveLabel(updated: Label) {
    setLabels(prev =>
      prev.map(x => (x.id === updated.id ? updated : x))
    );

    setSelectedLabel(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Folha de Etiquetas
      </Text>

      <View style={styles.grid}>
        {labels.map(label => (
          <Pressable
            key={label.id}
            style={styles.card}
            onPress={() => setSelectedLabel(label)}
          >
            <Text style={styles.header}>
              ETQ {label.id}
            </Text>

              {label.items.length > 0 ? (
                <View style={styles.scrollWrapper}>
                  <LabelPreview items={label.items} />
                </View>
              ) : (
                <View style={styles.emptyContainer}>
                  <Text>Toque para editar</Text>
                </View>
              )}
          </Pressable>
        ))}
      </View>

      <Modal
        visible={!!selectedLabel}
        animationType="slide"
      >
        {selectedLabel && (
          <LabelEditorModal
            label={selectedLabel}
            onClose={() => setSelectedLabel(null)}
            onSave={saveLabel}
          />
        )}
      </Modal>
      <Button title="Gerar etiquetas" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  card: {
    width: '48%',
    height: 180,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,

    overflow: 'hidden' // mantém corte visual do card
  },

  header: {
    fontWeight: '700',
    marginBottom: 10
  },

  // 🔥 WRAPPER QUE GARANTE SCROLL NO WEB
  scrollWrapper: {
    flex: 1,
    minHeight: 0,

    // ESSENCIAL para web
    overflowY: 'auto' as any,

    paddingRight: 4
  },

  empty: {
    marginTop: 10,
    color: '#999'
  },
  
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }  

});