import "./App.css";
import FormComponent from "./components/Form";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Welcome to the <span className="tittle">team</span>
        </h1>
        <FormComponent />
      </header>
    </div>
  );
}

export default App;
