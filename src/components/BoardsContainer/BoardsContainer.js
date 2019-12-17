import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';
import boardsData from '../../helpers/data/boardsData';
import Board from '../Board/Board';
import BoardForm from '../BoardForm/BoardForm';

class BoardsContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func,
  }

  // want state to live within boards container. Does not make sense to have it live in App.js
  state = {
    boards: [],
  }

  // making the getting boards function reusable
  getBoards = () => {
    boardsData.getBoardsByUid(authData.getUid())
      .then((boards) => {
        // resetting boards from line 9 with our data
        this.setState({ boards });
      })
      .catch((errorFromBoardsContainer) => console.error(errorFromBoardsContainer));
  }

  // as soon as component called, it runs on load
  componentDidMount() {
    this.getBoards();
  }

  addNewBoard = (newBoard) => {
    boardsData.addBoard(newBoard)
      .then(() => {
        this.getBoards();
      })
      .catch((error) => console.error(error));
  }

  render() {
    const { setSingleBoard } = this.props;

    return (
    <div>
      <BoardForm addNewBoard={this.addNewBoard}/>
      <div className="container">
        <div className="row">
          {/* the boards being mapped here are the boards from line 23 */}
          {this.state.boards.map((board) => (<Board key={board.id} board={board} setSingleBoard={setSingleBoard} />))}
        </div>
      </div>
    </div>
    );
  }
}

export default BoardsContainer;
