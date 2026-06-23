// LabelPreview.tsx

import { LabelItem } from '@/models/labelType';
import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  items: LabelItem[];
};

export default function LabelPreview({
  items
}: Props) {
  return (
    <View>
      {items.map(item => {
        if (item.type === 'text') {
          return (
            <Text
              key={item.id}
              style={{
                fontSize: item.fontSize,
                fontWeight: item.bold
                  ? '700'
                  : '400',
                textAlign: item.align
              }}
              numberOfLines={1}
            >
              {item.text}
            </Text>
          );
        }
        if (item.type === "space"){
          return (
            <Text
              key={item.id}                                      
              numberOfLines={1}
              style={{
                textAlign: 'center',  
                fontSize: 16,              
                height: 20
              }}>              
            </Text>
          )
        }
      })}
    </View>
  );
}