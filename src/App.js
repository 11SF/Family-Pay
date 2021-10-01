import "./App.css";
import SelectPage from "./pages/SelectPage";
import SpotifyPage from "./pages/SpotifyPage";
import Login from "./pages/Login";
import {Route, Redirect} from "react-router-dom";
import {isLogin} from "./modules/AuthService";
import AdminPage from "./pages/AdminPage";
import AdminSelectPage from "./pages/AdminSelectPage";
import AdminCreateFamily from "./pages/AdminCreateFamily";

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
        {isLogin() ? <Redirect to="/admin/selectfamily"></Redirect> : <Login />}
        <Login />
      </Route>
      <Route path="/admin/managefamily/:token" exact>
        {isLogin() ? <AdminPage /> : <Redirect to="/login"></Redirect>}
      </Route>
      <Route path="/admin/selectfamily" exact>
        {isLogin() ? <AdminSelectPage /> : <Redirect to="/login"></Redirect>}
      </Route>
      <Route path="/admin/createfamily" exact>
        {isLogin() ? <AdminCreateFamily /> : <Redirect to="/login"></Redirect>}
      </Route>
    </div>
  );
}

export default App;
