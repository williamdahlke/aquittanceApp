// LabelEditorModal.tsx

import { Label, LabelItem } from '@/models/labelType';
import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import DraggableFlatList from 'react-native-draggable-flatlist';

type Props = {
  label: Label;
  onClose(): void;
  onSave(label: Label): void;
};

export default function LabelEditorModal({
  label,
  onClose,
  onSave
}: Props) {
  const [items, setItems] = useState<LabelItem[]>(label.items);

  function addText() {
    setItems(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        type: 'text',
        text: 'Novo Texto',
        fontSize: 16,
        bold: false,
        align: 'center'
      }
    ]);
  }

  function addSpace() {
    setItems(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        type: 'space',
        height: 20
      }
    ]);
  }

  function save() {
    onSave({
      ...label,
      items
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        ETIQUETA {label.id}
      </Text>

      <View style={styles.buttons}>
        <Button title="+ Texto" onPress={addText} />
        <Button title="+ Espaço" onPress={addSpace} />
      </View>

      {/* 🔥 AREA COM SCROLL REAL NO WEB */}
      <View style={styles.listContainer}>
        <View style={styles.scrollWrapper}>
          <DraggableFlatList
            data={items}
            keyExtractor={x => x.id}
            onDragEnd={({ data }) => setItems(data)}
            style={{ flex: 1 }}

            contentContainerStyle={{
              paddingBottom: 20
            }}

            renderItem={({ item, drag }) => (
              <View style={styles.item}>
                <Text
                  onLongPress={drag}
                  style={styles.drag}
                >
                  ☰
                </Text>

                {item.type === 'text' && (
                  <TextInput
                    style={styles.input}
                    value={item.text}
                    onChangeText={text =>
                      setItems(prev =>
                        prev.map(x =>
                          x.id === item.id
                            ? { ...x, text }
                            : x
                        )
                      )
                    }
                  />
                )}

                {item.type === 'space' && (
                  <Text>
                    Espaço
                  </Text>
                )}
              </View>
            )}
          />
        </View>
      </View>

      <Button title="Salvar" onPress={save} />

      <View style={{ height: 10 }} />

      <Button title="Cancelar" onPress={onClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    minHeight: 0
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20
  },

  buttons: {
    gap: 10,
    marginBottom: 20
  },

  listContainer: {
    flex: 1,
    minHeight: 0,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    overflow: 'hidden'
  },

  // 🔥 ISSO AQUI GARANTE SCROLL NO WEB
  scrollWrapper: {
    flex: 1,
    minHeight: 0,
    overflowY: 'scroll' as any
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10
  },

  drag: {
    fontSize: 22,
    marginRight: 12
  },

  input: {
    flex: 1,
    fontSize: 16
  }
});