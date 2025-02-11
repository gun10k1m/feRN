/**
 * 안드로이드에서 카메라버튼 누르면 보여질 모달
 */

import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  visible: boolean;
  onLaunchCamera: () => void;
  onLaunchImageLib: () => void;
  onClose: () => void;
}

const UploadModeModal: React.FC<Props> = ({
  visible,
  onLaunchCamera,
  onLaunchImageLib,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      /**
       * animationType 종류 : slide, fade, none
       * slide: 위에서 아래로 올라오는 애니메이션
       * fade: 페이드인, 서서히 나타남남
       * none: 애니메이션 없음음
       */
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable style={styles.background} onPress={onClose}>
        <View style={styles.whiteBox}>
          <Pressable
            style={styles.actionButton}
            android_ripple={{color: '#eee'}}
            onPress={onLaunchCamera}>
            <Icon
              name="camera-alt"
              color={'#757575'}
              size={24}
              style={styles.icon}
            />
            <Text style={styles.text}>카메라로 촬영하기</Text>
          </Pressable>
          <Pressable
            style={styles.actionButton}
            android_ripple={{color: '#eee'}}
            onPress={onLaunchImageLib}>
            <Icon
              name="photo"
              color={'#757575'}
              size={24}
              style={styles.icon}
            />
            <Text style={styles.text}>사진 선택하기</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 2,
  },
  actionButton: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
  },
});

export default UploadModeModal;
