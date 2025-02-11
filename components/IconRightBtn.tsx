import React from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  name: string;
  color?: string;
  onPress: () => void;
}

const IconRightBtn: React.FC<Props> = ({color = '#6200ee', name, onPress}) => {
  return (
    <View>
      <Pressable
        style={({pressed}) => [
          style.circle,
          Platform.OS === 'ios' && pressed && {opacity: 0.3},
        ]}
        onPress={onPress}
        android_ripple={{color: '#eee'}}>
        <Icon name={name} color={color} size={24} />
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  block: {
    marginRight: -8,
    borderRadius: 24,
    overflow: 'hidden',
  },
  circle: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IconRightBtn;
