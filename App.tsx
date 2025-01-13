import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaView, StyleSheet} from 'react-native';
import SettingsScreen from './screens/SettingScreen';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 홈 스택 네비게이터
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

//렌더링 중에 새로운 컴포넌트를 정의하면 생기는 경고 해결
const getTabBarIcon =
  (name: string) =>
  ({color, size}: {color: string; size: number}) =>
    <Icon name={name} color={color} size={size} />;

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              headerShown: false,
              tabBarIcon: getTabBarIcon('home'),
            }}
          />
          <Tab.Screen
            name="Profile"
            options={{tabBarIcon: getTabBarIcon('person')}}
            component={ProfileScreen}
          />
          <Tab.Screen
            name="Settings"
            options={{tabBarIcon: getTabBarIcon('settings')}}
            component={SettingsScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
});

export default App;
