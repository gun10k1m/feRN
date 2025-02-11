import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {useDB} from '../context/db-context';
import {Post} from '../interface/db-entity.interface';
import PostCard from '../components/PostCard';
import {events} from '../lib/event';

const size = 3;

const renderItem = ({item}: {item: Post}) => <PostCard post={item} />;

const FeedScreen = () => {
  const {db} = useDB();
  const [page, setPage] = useState<number>(1);
  // 참고로 최신순
  const [posts, setPosts] = useState<Post[]>([]);
  const [noMorePost, setNoMorePost] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onLoadMore = () => {
    if (noMorePost || !posts || posts.length < size) {
      setNoMorePost(true);
      return;
    }
    const nextPage = page + 1;
    if (size * nextPage >= db.postList.length) {
      setNoMorePost(true);
    }
    setPosts(db.getPosts(size, nextPage));
    setPage(nextPage);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const recentPost = db.getPosts(size, page);
    if (!posts || recentPost.length === 0 || refreshing) {
      setRefreshing(false);
      setPosts([]);
      return;
    }

    const firstPost = posts[0];
    setRefreshing(false);
    if (
      recentPost.length === 0 ||
      JSON.stringify(recentPost[0]) === JSON.stringify(firstPost)
    ) {
      return;
    }

    setPosts(recentPost);
  }, [db, page, posts, refreshing]);

  useEffect(() => {
    events.addListener('refresh', onRefresh);

    return () => {
      events.removeListener('refresh', onRefresh);
    };
  }, [onRefresh]);

  useEffect(() => {
    setPosts(db.getPosts(size, page));
    //클래스로 관리하고 있어서 채워주면 알아서 리플레시가 되긴하지만 실습을 위해 비워둠
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      // 밑에는 인피니티 스크롤링 관련 설정
      // RN에서 스크롤이 되는 컴포넌트는 다 가능함함
      contentContainerStyle={styles.container}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.75}
      // 책에는 &&이지만 현재 RN에선 false가 들어가면 안됨(삼항연산자로 null로 들어가게 변경)
      ListFooterComponent={
        !noMorePost ? (
          <ActivityIndicator
            style={styles.spinner}
            size={32}
            color={'#6200ee'}
          />
        ) : null
      }
      //새로고침 관련 설정
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48,
  },
  spinner: {
    height: 64,
  },
});
export default FeedScreen;
