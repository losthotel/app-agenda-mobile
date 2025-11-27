import AppNavigator from "./src/AppNavigator";
import { ThemeProvider } from "./src/contexts/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
