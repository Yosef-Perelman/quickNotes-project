import "@mantine/core/styles.css";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import InputForm from "./components/InputForm.jsx";

function App() {
  return (
    <MantineProvider>
      <InputForm />
    </MantineProvider>
  );
}

export default App;
