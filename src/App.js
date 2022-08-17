import './App.css';
import { FiveDay } from './Components/Public/FiveDays';
import { InputBox } from './Components/Public/InputBox';
import {Latitude} from "./Components/Logic/Latitude"

function App() {
  return (
    <div onLoad={Latitude()} className="App">
      <InputBox />
      <FiveDay />
    </div>
  );
}

export default App;
