import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  Platform,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import BorderedInput from '../components/BorderedInput';
import CustomButton from '../components/CustomButton';

function ProfileScreen() {
  const [displayName, setDisplayName] = useState('');
  const [response, setResponse] = useState<ImagePickerResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    // 목업 데이터 처리 로직
    setTimeout(() => {
      setLoading(false);
      console.log('Submitted:', {displayName, response});
    }, 1000);
  };

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      (res: ImagePickerResponse) => {
        if (res.didCancel) {
          // 취소했을 경우
          return;
        }
        console.log(res);
        setResponse(res);
      },
    );
  };

  return (
    <View style={styles.block}>
      <Pressable onPress={onSelectImage}>
        <Image
          style={styles.circle}
          source={
            response && response.assets && response.assets[0]?.uri
              ? {uri: response.assets[0].uri}
              : require('../assets/user.png')
          }
        />
      </Pressable>

      <View style={styles.form}>
        <BorderedInput
          placeholder="닉네임"
          value={displayName}
          onChangeText={setDisplayName}
          onSubmitEditing={onSubmit}
          returnKeyType="next"
        />
        {loading ? (
          <ActivityIndicator size={32} color="pink" style={styles.spinner} />
        ) : (
          <View style={styles.buttons}>
            <CustomButton
              title="다음"
              onPress={onSubmit}
              hasMarginBottom
              theme="primary"
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    width: '100%',
  },
  circle: {
    backgroundColor: '#cdcdcd',
    borderRadius: 64,
    width: 128,
    height: 128,
  },
  form: {
    marginTop: 16,
    width: '100%',
  },
  buttons: {
    marginTop: 48,
  },
  spinner: {
    marginTop: 48,
    height: 104,
  },
});

export default ProfileScreen;
