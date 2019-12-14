import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';
import boardsData from '../../helpers/data/boardsData';
import Board from '../Board/Board';

class BoardsContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func,
  }

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
    const { setSingleBoard } = this.props;

    // the boards being mapped here are the boards from line 16
    return (
    <div>
      {this.state.boards.map((board) => (<Board key={board.id} board={board} setSingleBoard={setSingleBoard}/>))}
    </div>
    );
  }
}

export default BoardsContainer;
