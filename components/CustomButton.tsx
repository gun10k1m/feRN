import React from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  Platform,
  GestureResponderEvent,
} from 'react-native';

function CustomButton({
  onPress = (event: GestureResponderEvent) => {},
  title = '',
  hasMarginBottom = false,
  theme = 'primary',
}: {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  hasMarginBottom: boolean;
  theme: 'primary' | 'secondary';
}) {
  const isPrimary = theme === 'primary';

  return (
    <View style={[styles.block, hasMarginBottom && styles.margin]}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.wrapper,
          isPrimary && styles.primaryWrapper,
          Platform.OS === 'ios' && pressed && {opacity: 0.5},
        ]}
        android_ripple={{
          color: isPrimary ? '#ffffff' : 'pink',
        }}>
        <Text
          style={[
            styles.text,
            isPrimary ? styles.primaryText : styles.secondaryText,
          ]}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  overflow: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  wrapper: {
    borderRadius: 4,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryWrapper: {
    backgroundColor: 'pink',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: '#ffbbfd',
  },
  margin: {
    marginBottom: 8,
  },
});

export default CustomButton;
