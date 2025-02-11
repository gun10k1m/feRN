import React, {useState} from 'react';
import {
  ActionSheetIOS,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UploadModeModal from './modal/UploadModeModal';
import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../type/Stack';

const TABBAR_HEIGHT = 49;
const imagePickerOption: CameraOptions = {
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  includeBase64: true, //파일을 업로드가 아니라 base64로 로컬에 저장시킬 예정이라 IOS도 base64로
};

type UploadScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'Upload'
>;

const CameraButton = () => {
  const navigation = useNavigation<UploadScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const bottom = Platform.select({
    android: TABBAR_HEIGHT / 2,
    ios: TABBAR_HEIGHT / 2 + insets.bottom - 4,
  });

  const onPickImage = (res: ImagePickerResponse) => {
    if (res.didCancel || !res) {
      return;
    }
    navigation.navigate('Upload', {res});
  };

  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
    setModalVisible(false);
  };
  const onLaunchImageLib = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
    setModalVisible(false);
  };

  const onPress = () => {
    // 안드로이드일 시 미리 만들어놓은 모달 보여주기
    if (Platform.OS === 'android') {
      setModalVisible(true);
      return;
    }

    // IOS의 경우 ActionSheetIOS로 보여주기
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: '사진 업로드', //시트 위에 타이틀 지정
        options: ['카메라로 촬영하기', '사진 선택하기', '취소'], // 시트에 보일 메뉴 이름
        cancelButtonIndex: 2, // 취소 버튼 index
        // cancelButtonTintColor: 'blue', //취소 버튼 색상(default red)
      },
      buttonIdx => {
        if (buttonIdx === 0) {
          onLaunchCamera();
        } else if (buttonIdx === 1) {
          onLaunchImageLib();
        }
      },
    );
  };

  return (
    <>
      {/* style은 리스트형태로 여러개 병함 가능, eq) {...styles.wrapper, ...bottom} */}
      <View style={[styles.wrapper, {bottom}]}>
        <Pressable
          android_ripple={{color: '#ffffff'}}
          style={styles.circle}
          onPress={onPress}>
          <Icon name="camera-alt" color={'white'} size={24} />
        </Pressable>
      </View>
      <UploadModeModal
        visible={modalVisible}
        onLaunchCamera={onLaunchCamera}
        onLaunchImageLib={onLaunchImageLib}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 5,
    borderRadius: 27,
    height: 54,
    width: 54,
    position: 'absolute',
    left: '50%',
    transform: [
      {
        translateX: -27,
      },
    ],
    ...Platform.select({
      ios: {
        shadowColor: '#4d4d4d',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
        overflow: 'hidden',
      },
    }),
  },
  circle: {
    backgroundColor: '#6200ee',
    borderRadius: 27,
    height: 54,
    width: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CameraButton;
