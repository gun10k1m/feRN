import React from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useUser} from '../context/user-context';
import {useDB} from '../context/db-context';
import {events} from '../lib/event';
import PostGridItem from '../components/PostGridItem';
import {Post} from '../interface/db-entity.interface';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../type/Stack';

const renderItem = ({item}: {item: Post}) => <PostGridItem post={item} />;

const MyProfileScreen = () => {
  const {user, logout} = useUser();
  const {db} = useDB();
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamList, 'HomeStack'>>();
  const reset = async () => {
    await db.deleteAllPost();
    events.emit('refresh');
    navigation.navigate('HomeStack', {});
  };
  return (
    <View style={styles.block}>
      <Image source={require('../assets/user.png')} style={styles.profileImg} />
      <Text style={[styles.textCenter, styles.userName]}>{user?.name}</Text>
      <View style={styles.btnGroup}>
        <Pressable style={styles.warnBtn} onPress={logout}>
          <Text style={[styles.textCenter, styles.warnBtnText]}>logout</Text>
        </Pressable>
        <Pressable onPress={reset} style={styles.warnBtn}>
          <Text style={[styles.textCenter, styles.warnBtnText]}>
            reset posts
          </Text>
        </Pressable>
      </View>
      <FlatList
        style={styles.flat}
        data={db.postList.filter(post => post.userId === user?.id)}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flat: {marginTop: 24},
  block: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileImg: {
    width: 128,
    height: 128,
    borderRadius: 64,
    marginTop: 48,
  },
  textCenter: {
    textAlign: 'center',
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 24,
  },
  warnBtn: {
    borderRadius: 5,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    borderColor: '#ff5d5d',
    borderWidth: 1,
    marginVertical: 5,
  },
  warnBtnText: {
    color: '#ff5d5d',
  },
});

export default MyProfileScreen;
