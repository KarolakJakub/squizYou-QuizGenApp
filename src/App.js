import React, { Component } from "react";
import NewNavbar from "./components/Navbar/NewNavbar";
import QuizGenWrapper from "./components/quizGenerator/QuizGenWrapper";
import QuizList from "./components/Quiz/QuizList.js";
import Quiz from "./components/Quiz/Quiz";
import Home from "./Home";
import { signOutWithFirebase} from './services/AuthService'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import QuizesGenList from './components/quizGenerator/QuizesGenList'
import firebase from 'firebase'


const NoMatch = () => <h1>404</h1>;

class App extends Component {

  state = {
    isLoggedIn: null,
    uniqueId: '',
    userName: ''
  }

  onLoginFromApp() {


    firebase.auth().then(console.log('lol'))

    // () => (firebase.auth().currentUser === null || firebase.auth().currentUser === undefined) ? console.log('niezalogowany') : this.setState({ isLoggedIn: true })

  }

  onLogout() {

    signOutWithFirebase().then((firebase.auth().currentUser === null || firebase.auth().currentUser === undefined) ? null : this.setState({ isLoggedIn: false }))


  }

  render() {
    return (



      <Router>
        {console.log(this.state)}
        <div>
          <NewNavbar isLoggedIn={this.state.isLoggedIn} onClickLogout={this.onLogout.bind(this)} />
          <Switch>
            <Route exact path="/" render={(props) =>
              <Home {...props} isLoggedIn={this.state.isLoggedIn} onLogin={this.onLoginFromApp.bind(this)} userName={this.state.userName} />
            } />
            {/* {this.state.isLoggedIn ? 
              <> */}
            <Route exact path="/quizes-gen-list" render={(props) =>
              <QuizesGenList  {...props} uniqueUserId={this.state.uniqueId} isLoggedIn={this.state.isLoggedIn}
              />} />
            <Route exact path="/quizes-gen-list/:id" component={QuizGenWrapper} />
            <Route path="/quizlist" component={QuizList} />
            <Route path="/quiz/:id" component={Quiz} />
            {/* </>:null} */}
            <Redirect from="/home" to="/" />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;
