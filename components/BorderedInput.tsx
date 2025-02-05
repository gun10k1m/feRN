import React from 'react';
import {
  StyleSheet,
  TextInput,
  ReturnKeyTypeOptions,
  KeyboardTypeOptions,
} from 'react-native';

interface BorderedInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
  returnKeyType: ReturnKeyTypeOptions;
  hasMarginBottom?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  autoCompleteType?:
    | 'off'
    | 'username'
    | 'password'
    | 'email'
    | 'name'
    | 'street-address'
    | 'postal-code'
    | 'telephone'
    | 'off';
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
}

const BorderedInput = React.forwardRef<TextInput, BorderedInputProps>(
  (
    {
      placeholder,
      value,
      onChangeText,
      onSubmitEditing,
      returnKeyType,
      hasMarginBottom,
      autoCapitalize,
      autoCorrect,
      autoCompleteType,
      keyboardType,
      secureTextEntry,
    },
    ref,
  ) => {
    return (
      <TextInput
        style={[styles.input, hasMarginBottom && styles.margin]}
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
      />
    );
  },
);

const styles = StyleSheet.create({
  input: {
    borderColor: '#bdbdbd',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 48,
    backgroundColor: 'white',
  },
  margin: {
    marginBottom: 16,
  },
});

export default BorderedInput;
