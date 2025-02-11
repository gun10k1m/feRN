import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import FeedScreen from './FeedScreen';
import MyProfileScreen from './MyProfileScreen';
import PostScreen from './PostScreen';
import ModifyScreen from './ModifyScreen';

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="Profile" component={MyProfileScreen} />
      <Stack.Screen
        name="Post"
        component={PostScreen}
        options={{title: '게시물'}}
      />
      <Stack.Screen name="Modify" component={ModifyScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
