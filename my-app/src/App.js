import logo from './logo.svg';
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";

import './App.css';
import HomePage from './components/HomePage.js';
import UserPage from './components/UserPage';
import AdminPage from './components/AdminPage';
import Login from './components/Login';

function App() {
  return (
    <>
      <switch>
        <Routes>
          <Route exact path="/" Component={HomePage} />
          <Route exact path="/user" Component={UserPage} />
          <Route exact path="/admin" Component={AdminPage} />
          <Route exact path="/login" Component={Login} />
        </Routes>
      </switch>
    </>
  );
}

export default App;
