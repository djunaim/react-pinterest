import React from 'react';

import authData from '../../helpers/data/authData';
import boardsData from '../../helpers/data/boardsData';

class BoardsContainer extends React.Component {
  // want state to live within boards container. Does not make sense to have it live in App.js
  state = {
    boards: [],
  }

  // as soon as component called, it runs
  componentDidMount() {
    boardsData.getBoardsByUid(authData.getUid())
      .then((boards) => {
        // resetting boards from line 9 with our data
        this.setState({ boards });
      })
      .catch((errorFromBoardsContainer) => console.error(errorFromBoardsContainer));
  }

  render() {
    // the boards here are the boards from line 16
    return (<div>{this.state.boards.map((board) => <h6>{board.name}</h6>)}</div>);
  }
}

export default BoardsContainer;