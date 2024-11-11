
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-4 max-w-5xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6">NASA Near-Earth Objects</h1>
        <Home />
      </div>
    </div>
    </div>
  );
}

export default App;
