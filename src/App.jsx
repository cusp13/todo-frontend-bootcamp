// import './App.css'
import Todos from "./components/Todos";
import DisplayTodos from "./components/DisplayTodos";
import "./index.css";

// import TodoItem from "./components/TodoItem";

function App() {
  return (
    <>
      <div className="App">
        <h1>Propeer's Bootcamp 🚀</h1>
        <Todos />
        <DisplayTodos/>
      </div>
    </>
  )
}

export default App
