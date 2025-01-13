import {View, Text, StyleSheet, Button} from 'react-native';
import React, {useEffect} from 'react';
import {storeData} from '../data';

function DetailScreen({route, navigation}: {route: any; navigation: any}) {
  const {id} = route.params;
  const storeDetail = storeData.find(item => item.id === id);

  useEffect(() => {
    navigation.setOptions({
      title: storeDetail?.title || '상세 화면',
    });
  }, [navigation, storeDetail]);

  return (
    <View style={styles.container}>
      <Text>상세 화면</Text>
      <Text>ID: {id}</Text>
      <Text>가게 이름: {storeDetail?.title}</Text>
      <Text>가게 설명: {storeDetail?.description}</Text>
      <Button
        title="다음"
        onPress={() => navigation.push('Detail', {id: route.params.id + 1})} //navigate로 바꿔보기
      />
      <Button title="뒤로가기" onPress={() => navigation.goBack()} />
      <Button title="처음으로" onPress={() => navigation.popToTop()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailScreen;
