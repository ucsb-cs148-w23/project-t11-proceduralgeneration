import logo from './logo.svg';
import './App.css';
function log_in(){
  alert("Log in function will be implemented later")
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello world</h1> 
        <p>
          Hello world web app on Firebase
        </p>
      <button className = "Button"onClick={log_in}>
        log_in
        
      </button>

      </header>

    </div>
  );
}

export default App;