import React from 'react';
import {Post} from '../interface/db-entity.interface';
import {Image, Pressable, StyleSheet, useWindowDimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackParamList} from '../type/Stack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const PostGridItem: React.FC<{post: Post}> = ({
  post: {id, user, userId, contents, photo, createdAt},
}) => {
  const dimensions = useWindowDimensions();
  const size = dimensions.width / 3;
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamList, 'Post'>>();

  const onPress = () => {
    navigation.navigate('Post', {
      post: {id, user, userId, contents, photo, createdAt},
    });
  };

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {opacity: pressed ? 0.6 : 1, width: size, height: size},
        styles.block,
      ]}>
      <Image
        source={{uri: photo}}
        style={styles.image}
        resizeMethod="resize"
        resizeMode="cover"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  block: {},
  image: {backgroundColor: '#bdbdbd', width: '100%', height: '100%'},
});
export default PostGridItem;
