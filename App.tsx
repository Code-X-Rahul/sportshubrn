import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/components/Navigation';
import {UserProvider} from './src/context/AuthContext';

function App(): JSX.Element {
  return (
    <UserProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
