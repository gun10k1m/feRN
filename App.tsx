import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StyleSheet} from 'react-native';
import {DBProvider} from './context/db-context';
import {UserProvider} from './context/user-context';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootStack from './screens/RootStack';

function App(): React.JSX.Element {
  return (
    <DBProvider>
      <UserProvider>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <NavigationContainer>
              <RootStack />
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </UserProvider>
    </DBProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#1e1e1e',
  },
});

export default App;
