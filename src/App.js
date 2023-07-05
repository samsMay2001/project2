import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AppContext } from './appContext/appContext';
import { Main } from './components/Main/Main';


function App() {
  return (
    <div>
      <AppContext>
          <Main/>
      </AppContext>
    </div>
  );
}

export default App;
