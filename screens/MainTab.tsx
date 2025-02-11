import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyProfileStack from './MyProfileStack';
import CameraButton from '../components/CameraButton';
import {StyleSheet, View} from 'react-native';

const Tab = createBottomTabNavigator();
const getTabBarIcon =
  (name: string) =>
  ({color}: {focused: boolean; color: string}) =>
    <Icon name={name} color={color} size={24} />;

const MainTab = () => {
  return (
    <>
      <View style={styles.block}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#6200ee',
          }}>
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              tabBarIcon: getTabBarIcon('home'),
            }}
          />
          <Tab.Screen
            name="MyProfileStack"
            component={MyProfileStack}
            options={{
              tabBarIcon: getTabBarIcon('person'),
            }}
          />
        </Tab.Navigator>
      </View>
      <CameraButton />
    </>
  );
};

const styles = StyleSheet.create({
  block: {flex: 1, zIndex: 0},
});

export default MainTab;
