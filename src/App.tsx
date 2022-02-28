import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ThemeProvider} from 'styled-components/native';
import SignUp from '@screens/SignUp';
import Entry from '@screens/Entry';
import SignIn from '@screens/SignIn';
import theme from './styles/theme';

const Stack = createNativeStackNavigator();

const App: FC = () => {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <Stack.Navigator>
          <Stack.Screen name="Entry" component={Entry} />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{title: '회원가입'}}
          />
          <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
};
export default App;
