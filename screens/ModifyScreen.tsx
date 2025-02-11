import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import IconRightBtn from '../components/IconRightBtn';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../type/Stack';
import {useDB} from '../context/db-context';
import {events} from '../lib/event';

const ModifyScreen = () => {
  const {db} = useDB();
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamList, 'Feed'>>();

  const {params} = useRoute<RouteProp<StackParamList, 'Modify'>>();

  const [description, setDescription] = useState(params.description);

  const onSubmit = useCallback(async () => {
    await db.editPost(params.id, {contents: description});
    navigation.pop();
    events.emit('refresh');
  }, [db, description, navigation, params.id]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'height'})}
      style={styles.block}
      keyboardVerticalOffset={Platform.select({
        ios: 88,
      })}>
      <TextInput
        style={styles.input}
        multiline={true}
        placeholder="이 사진에 대한 설명을 입력하세요..."
        textAlignVertical="top"
        value={description}
        onChangeText={setDescription}
      />

      <View style={styles.sendBtn}>
        <IconRightBtn onPress={onSubmit} name="edit-note" />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  input: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    flex: 1,
    fontSize: 16,
  },
  sendBtn: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    borderRadius: 9999,
    borderColor: '#6200ee',
    borderWidth: 2,
  },
});

export default ModifyScreen;
