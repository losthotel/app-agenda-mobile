import { registerRootComponent } from 'expo';
import AppNavigator from './src/AppNavigator.js';  // ← só acrescentar o .js aqui

registerRootComponent(AppNavigator);

export default AppNavigator;