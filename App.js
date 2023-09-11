import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/screens/Home';
import Add from './src/screens/AddTodo';

const Stack = createNativeStackNavigator()

export default function App() {
  console.log('Arranque del sistema')
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            headerShown: false
          }}
        >
        </Stack.Screen>
        <Stack.Screen
          name='Add'
          component={Add}
          options={{
            headerShown: true,
            presentation: 'modal',
          }}
        >
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
