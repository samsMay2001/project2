import logo from './logo.svg';
import './App.css';
import { SideBar } from './components/Sidebar/sidebar';
import { Feed } from './components/Feed/feed';
import { Widgets } from './components/Widgets/widgets';


function App() {
  return (
    <div className="app">
      <SideBar/>
      <Feed/>
      <Widgets/>
    </div>
  );
}

export default App;
