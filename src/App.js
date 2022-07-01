import "./App.css";
import SelectPage from "./pages/SelectPage";
import SpotifyPage from "./pages/SpotifyPage";
import Login from "./pages/Login";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { isLogin } from "./modules/AuthService";
import AdminPage from "./pages/Admin/AdminPage";
import AdminSelectPage from "./pages/Admin/AdminSelectPage";
import AdminCreateFamily from "./pages/Admin/AdminCreateFamily";
import YoutubeyPage from "./pages/YoutubePage";
import Register from "./pages/Register";
import Aos from "aos";
import "aos/dist/aos.css";
import HomeAdmin from "./pages/Admin/HomeAdmin";
import ManageMember from "./pages/Admin/ManageMember";
import ManagePrice from "./pages/Admin/ManagePrice";
import TransactionView from "./pages/Admin/TransactionView";
import FamilyDetail from "./pages/Admin/FamilyDetail";
import ForbiddenPage from "./pages/ForbiddenPage";
function App() {
  Aos.init();
  return (
    <div className="App">
      {/* <Router> */}
      <Switch>
        <Route path="/" exact>
          <SelectPage />
        </Route>
        <Route path="/spotify/:token" exact>
          <SpotifyPage />
        </Route>
        <Route path="/youtube/:token" exact>
          <YoutubeyPage />
        </Route>
        <Route path="/login" exact>
          {isLogin() ? (
            <Redirect to="/admin/selectfamily"></Redirect>
          ) : (
            <Login />
          )}
          <Login />
        </Route>
        <Route path="/admin/managefamily/:token" exact>
          {isLogin() ? <AdminPage /> : <Redirect to="/login"></Redirect>}
        </Route>

        <Route path="/admin/:token/home" exact>
          {isLogin() ? <HomeAdmin /> : <Redirect to="/login"></Redirect>}
        </Route>

        <Route path="/admin/:token/member" exact>
          {isLogin() ? <ManageMember /> : <Redirect to="/login"></Redirect>}
        </Route>

        <Route path="/admin/:token/prices" exact>
          {isLogin() ? <ManagePrice /> : <Redirect to="/login"></Redirect>}
        </Route>

        <Route path="/admin/:token/detail" exact>
          {isLogin() ? <FamilyDetail /> : <Redirect to="/login"></Redirect>}
        </Route>

        <Route path="/admin/:token/transaction" exact>
          {isLogin() ? <TransactionView /> : <Redirect to="/login"></Redirect>}
        </Route>

        <Route path="/admin/selectfamily" exact>
          {isLogin() ? <AdminSelectPage /> : <Redirect to="/login"></Redirect>}
        </Route>
        <Route path="/admin/createfamily" exact>
          {isLogin() ? (
            <AdminCreateFamily />
          ) : (
            <Redirect to="/login"></Redirect>
          )}
        </Route>
        <Route path="/register" exact>
          {!isLogin() ? (
            <Register />
          ) : (
            <Redirect to="/admin/selectfamily"></Redirect>
          )}
        </Route>

        <Route path="/forbidden" exact>
          <ForbiddenPage />
        </Route>
      </Switch>
      {/* </Router> */}
    </div>
  );
}

export default App;
