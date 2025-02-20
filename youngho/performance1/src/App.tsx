import './App.css';
import SchoolList from './components/SchoolList';

function App() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="w-96 bg-white p-4 shadow-md rounded-lg">
        <h1 className="text-xl font-bold mb-4">학교 목록</h1>
        <SchoolList />
      </div>
    </div>
  );
}

export default App;
