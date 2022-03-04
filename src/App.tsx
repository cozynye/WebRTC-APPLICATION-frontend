import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ThemeProvider} from 'styled-components/native';
import SignUp from '@screens/SignUp';
import Entry from '@screens/Entry';
import SignIn from '@screens/SignIn';
import Main from '@screens/Main';
import theme from './styles/theme';
import {createStore} from 'redux';
import rootReducer from './module/index';
import {Provider} from 'react-redux';

const store = createStore(rootReducer);

const Stack = createNativeStackNavigator();

const App: FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <Stack.Navigator>
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
            <Stack.Screen
              name="Main"
              component={Main}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </ThemeProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
