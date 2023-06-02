import logo from './logo.svg';
import './App.css';
import { SideBar } from './components/Sidebar/sidebar';
import { Feed } from './components/Feed/feed';
import { Widgets } from './components/Widgets/widgets';
import { AppContext } from './appContext/appContext';


function App() {
  return (
    <div className="app">
      <AppContext>
        <SideBar/>
        <Feed/>
        <Widgets/>
      </AppContext>
    </div>
  );
}

export default App;
