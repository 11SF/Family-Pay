import "./App.css";
import SelectPage from "./pages/SelectPage";
import SpotifyPage from "./pages/SpotifyPage";
import Login from "./pages/Login";
import {Route, Redirect} from "react-router-dom";
import {isLogin} from "./modules/AuthService";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <div className="App">
      <Route path="/" exact>
        <SelectPage />
      </Route>
      <Route path="/spotify/:token" exact>
        <SpotifyPage />
      </Route>
      <Route path="/login" exact>
        {isLogin() ? <Redirect to="/admin"><AdminPage /></Redirect> : <Login />}
        <Login />
      </Route>
      <Route path="/admin" exact>
        {isLogin() ? <AdminPage /> : <Redirect to="/login"><Login /></Redirect>}
      </Route>
    </div>
  );
}

export default App;
