import React from 'react';
import {Post} from '../interface/db-entity.interface';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../type/Stack';
import {useUser} from '../context/user-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import usePostActions from '../hook/usePostActions';
import ActionSheetModal from './modal/ActionSheetModal';

const PostCard: React.FC<{post: Post}> = ({
  post: {id, user, userId, contents, photo, createdAt},
}) => {
  const {user: loggedUser} = useUser();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<StackParamList, 'Profile' | 'Post'>
    >();

  const {actions, isSelecting, onClose, onPressMore} = usePostActions({
    id,
    description: contents,
  });

  const onOpenProfile = () => {
    navigation.navigate('Profile', {});
  };
  const onPressImage = () => {
    navigation.navigate('Post', {
      post: {id, user, userId, contents, photo, createdAt},
    });
  };
  return (
    <>
      <View style={styles.block}>
        <View style={[styles.head, styles.paddingBlock]}>
          <Pressable style={styles.profile} onPress={onOpenProfile}>
            <Image
              source={require('../assets/user.png')}
              style={styles.avatar}
              resizeMode="cover"
            />
            <Text style={styles.displayName}>{user ?? 'unknown user'}</Text>
          </Pressable>
          {loggedUser!.id === userId && (
            <Pressable hitSlop={8} onPress={onPressMore}>
              <Icon name="more-vert" size={24} />
            </Pressable>
          )}
        </View>
        <Pressable onPress={onPressImage}>
          <Image
            source={{uri: photo}}
            style={styles.image}
            resizeMode="cover"
            resizeMethod="resize"
          />
        </Pressable>
        <View style={styles.paddingBlock}>
          <Text style={styles.description}>{contents}</Text>
          <Text style={styles.date}>{createdAt.toLocaleString()}</Text>
        </View>
      </View>
      <ActionSheetModal
        actions={actions}
        onClose={onClose}
        visible={isSelecting}
      />
    </>
  );
};

const styles = StyleSheet.create({
  block: {paddingVertical: 16},
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  paddingBlock: {
    paddingHorizontal: 16,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayName: {
    lineHeight: 16,
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  image: {
    backgroundColor: '#bfbfbf',
    width: '100%',
    aspectRatio: 1,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 6,
  },
  date: {
    color: '#757575',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default PostCard;
