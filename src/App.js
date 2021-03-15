import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import RegisterVolunteer from './components/RegisterVolunteer/RegisterVolunteer';
import { AuthContextProvider, PrivateRouteForLogin, PrivateRouteForVLogin } from './components/Login/useAuth';
import Admin from './components/Admin/Admin';
import MyProfile from './components/MyProfile/MyProfile';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthContextProvider>
          <div>
            <Switch>
              <Route exact path="/myprofile">
                <Header />
                <MyProfile />
              </Route>
              <Route exact path="/signin">
                <Login />
              </Route>
              <Route exact path="/signin/r/:rof">
                <Login />
              </Route>
              <Route path="/registerVolunteer/:op">
                <RegisterVolunteer />
              </Route>
              <Route path="/registerVolunteer/:op">
                <RegisterVolunteer />
              </Route>
              <Route path="/registerVolunteer/">
                <RegisterVolunteer />
              </Route>
              <Route path="/opportunities/">
                
              </Route>
              <Route path="/donation">

              </Route>
              <Route path="/blog">

              </Route>
              <Route path="/events">

              </Route>
              <Route exact path="/admin">
                <Admin />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="*">

              </Route>
              <Route path="/signin/*">
                
              </Route>
            </Switch>
          </div>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
