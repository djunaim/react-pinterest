import React from 'react';
import firebase from 'firebase/app';

import firebaseConnection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import BoardsContainer from '../components/BoardsContainer/BoardsContainer';
import SingleBoard from '../components/SingleBoard/SingleBoard';

import './App.scss';

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
    selectedBoardId: null,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  setSingleBoard = (selectedBoardId) => {
    this.setState({ selectedBoardId });
  }

  renderView = () => {
    const { authed, selectedBoardId } = this.state;
    if (!authed) {
      return (<Auth/>);
    }
    if (!selectedBoardId) {
      return (<BoardsContainer setSingleBoard={this.setSingleBoard}/>);
    }
    return (<SingleBoard selectedBoardId={selectedBoardId} setSingleBoard={this.setSingleBoard}/>);
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        {/* pass authed to Navbar to show buttons depending on log in state since it lives in App.js */}
          <MyNavbar authed={authed}/>
          <button className="btn btn-danger">Freedom</button>
          {/* if user authenticated, load board */}
          {/* else show login button */}
          {
            this.renderView()
          }
          {/* {
            // it will only show once you click on one of the buttons, and then it will keep on showing. Pass selectedBoardId to singleBoard to use axio call
            (selectedBoardId) && (<SingleBoard selectedBoardId={selectedBoardId} setSingleBoard={this.setSingleBoard}/>)
          } */}
      </div>
    );
  }
}

export default App;
