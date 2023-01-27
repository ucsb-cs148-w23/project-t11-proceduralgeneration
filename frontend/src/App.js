import './App.css';
import Header from './components/header.js'
import Model from './components/model.js'
import { Canvas } from '@react-three/fiber'

function log_in(){
  alert("Log in function will be implemented later")
}
function App() {
  return (
    <div className="App">
      <Header className="header" />
      <button className = "Button"onClick={log_in}>
        log_in
        
      </button>
      <Canvas className="model">
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Model position={[-1.2, 0, 0]} />
        <Model position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
