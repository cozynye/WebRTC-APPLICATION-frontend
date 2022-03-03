import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {ThemeProvider} from 'styled-components';
// import {theme} from './styles/theme';
import SignUp from './screens/SignUp';
import Entry from './screens/Entry';
import SignIn from './screens/SignIn';

const Stack = createNativeStackNavigator();

const App: FC = () => {
  return (
    <NavigationContainer>
      {/* <ThemeProvider theme={theme}> */}
      <Stack.Navigator initialRouteName="Entry">
        <Stack.Screen
          name="Entry"
          component={Entry}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{title: '회원가입', headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{title: '로그인'}}
        />
      </Stack.Navigator>
      {/* </ThemeProvider> */}
    </NavigationContainer>
  );
};

export default App;
