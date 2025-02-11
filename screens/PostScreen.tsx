import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ScrollView, StyleSheet} from 'react-native';
import {StackParamList} from '../type/Stack';
import PostCard from '../components/PostCard';

type PostRouteProp = RouteProp<StackParamList, 'Post'>;
const PostScreen = () => {
  const route = useRoute<PostRouteProp>();
  const {post} = route.params;

  return (
    <ScrollView style={styles.contentContainer}>
      <PostCard post={post} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {},
});

export default PostScreen;
