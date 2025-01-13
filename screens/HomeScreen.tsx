import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
} from 'react-native';
import React, {useCallback} from 'react';
import {storeData} from '../data';

const ListItem = ({item, navigation}: {item: any; navigation: any}) => (
  <View style={styles.buttonContainer}>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.push('Detail', {id: item.id})}>
      <Text style={styles.buttonText}>{item.title}</Text>
      <Text style={styles.descriptionText}>{item.description}</Text>
    </TouchableOpacity>
  </View>
);

function HomeScreen({navigation}: {navigation: any}) {
  const renderItem = useCallback(
    ({item}: {item: any}) => <ListItem item={item} navigation={navigation} />,
    [navigation],
  ); //useCallback 함수 최적화

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>가게를 선택해주세요.</Text>
        <Button title="프로필" onPress={() => navigation.navigate('Profile')} />
      </View>
      <FlatList
        data={storeData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false} //스크롤바 안보이게
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    gap: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    alignItems: 'center',
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: 'skyblue',
    borderRadius: 10,
    width: '100%',
    padding: 10,
  },
  button: {
    width: '100%',
    padding: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionText: {
    color: 'white',
    fontSize: 14,
  },
  listContainer: {
    width: '100%',
    gap: 10,
    paddingBottom: 20,
  },
});

export default HomeScreen;
