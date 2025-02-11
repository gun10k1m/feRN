import {
  RouteProp,
  useNavigation,
  // useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  // Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import {StackParamList} from '../type/Stack';
import IconRightBtn from '../components/IconRightBtn';
import uuid from 'react-native-uuid';
import {useDB} from '../context/db-context';
import {useUser} from '../context/user-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {events} from '../lib/event';

type UploadRouteProp = RouteProp<StackParamList, 'Upload'>;

const UploadScreen = () => {
  const {db} = useDB();
  const {user} = useUser();
  const route = useRoute<UploadRouteProp>();
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamList, 'MainTab'>>();

  const {res} = route.params;
  const {width} = useWindowDimensions();
  // const navigation = useNavigation();
  const animation = useRef(new Animated.Value(width));
  const [isKeyboardOpen, setIsKeyboardOpen] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');

  const onSubmit = useCallback(async () => {
    const uid = uuid.v4();
    await db.addPost({
      id: uid,
      userId: user!.id,
      photo: `data:image/jpeg;base64,${res.assets?.[0].base64}`,
      contents: description,
    });
    navigation.pop(); //뒤로가기
    // navigation.navigate('MainTab', {});
    events.emit('refresh');
  }, [db, description, navigation, res.assets, user]);

  useEffect(() => {
    const didShow = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardOpen(true);
    });
    const didHide = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardOpen(false);
    });

    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: isKeyboardOpen ? 0 : width,
      useNativeDriver: false, //native모듈에선 height을 지원하지 않음
      duration: 150, //ms 단위
      delay: 100,
    }).start();
  }, [isKeyboardOpen, width, animation]);

  // android 모바일에서 버튼이 안눌리는 버그가 있음(간헐적으로 눌리긴 한다)
  // 미러링해서 컴퓨터에서 클릭 시 잘 작동하는데 실제 기기에서 이벤트 실행이 안되는..
  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => <IconRightBtn name="send" onPress={onSubmit} />,
  //   });
  // }, [navigation, onSubmit]);

  return (
    // IOS에서 엔터를 많이 치면 텍스트가 화면 밖으로 나갈 수 있기 때문에 사용해줌
    // 안드로이드에선 상관없이 되는거 확인
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'height'})}
      keyboardVerticalOffset={Platform.select({ios: 180})}
      style={styles.block}>
      {/*
      keyboard 유무에 따른 이미지 애니메이션
      애니메이션은 Animated 컴포넌트를 사용해야함
      */}
      {/* <Image
        source={{uri: res.assets?.[0].uri}}
        style={[styles.image, {height: width}]}
        resizeMode="cover"
      /> */}
      <Animated.Image
        source={{uri: `data:image/jpeg;base64,${res.assets?.[0].base64}`}}
        style={[styles.image, {height: animation.current}]}
        resizeMode="cover"
      />
      <TextInput
        style={styles.input}
        multiline={true}
        placeholder="이 사진에 대한 설명을 입력하세요..."
        textAlignVertical="top"
        placeholderTextColor={'#12121233'}
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.sendBtn}>
        <IconRightBtn onPress={() => onSubmit()} name="edit-note" />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  block: {flex: 1},
  image: {width: '100%'},
  input: {
    paddingHorizontal: 16,
    paddingVertical: 16,
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

export default UploadScreen;
