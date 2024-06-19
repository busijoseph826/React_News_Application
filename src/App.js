import './App.css';
import Navbar from './components/navbar/Navbar';
import News from './components/news/News';
import { Provider } from 'react-redux';
import store from './components/store/store';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter alias as Router

function App() {
  return (
    <Provider store={store}>
      <Router> {/* Wrap entire application with Router */}
        <div className="App">
          <Navbar /> {/* Render Navbar component */}
          <News /> {/* Render News component */}
        </div>
      </Router>
    </Provider>
  );
}

export default App;
