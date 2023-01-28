import './App.css';
import Header from './components/header.js'
import Model from './components/model.js'
import { Canvas } from '@react-three/fiber'


function App() {
  return (
    <div className="App">
      <Header className="header" />
      <Canvas className="model">
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Model position={[-1.2, 0, 0]} />
        <Model position={[1.2, 0, 0]} />
      </Canvas>
      <body className="body">
        <button className="button">Generate</button>
      </body>
    </div>
  );
}

export default App;
