import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {useUser} from '../context/user-context';

const LoginScreen = () => {
  const {login} = useUser();
  const [id, setId] = useState<string>('10km');
  const [password, setPassword] = useState<string>('10km111');

  return (
    <>
      <View style={styles.block}>
        <Text style={[styles.titleText, styles.centerText]}>FeRN Login</Text>
        <View>
          <TextInput value={id} onChangeText={setId} placeholder="id" />
          {/* secureTextEntry 비밀번호 처리(안보이게) */}
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholder="password"
          />
        </View>
        <Pressable hitSlop={10} onPress={() => login({id, password})}>
          <Text style={[styles.centerText]}>Login</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  block: {flex: 1, zIndex: 0},
  centerText: {
    textAlign: 'center',
  },
  titleText: {
    fontSize: 62,
    fontStyle: 'italic',
    fontWeight: '600',
    color: '#6200ee',
  },
});

export default LoginScreen;
