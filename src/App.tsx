import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from './screens/SignUp';
import Entry from './screens/Entry';
import SignIn from './screens/SignIn';

const Stack = createNativeStackNavigator();

const App: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Entry">
        <Stack.Screen name="Entry" component={Entry} />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{title: '회원가입'}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{title: '로그인'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
