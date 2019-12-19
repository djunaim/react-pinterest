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
  // when updating board need to go where boards state is. Have editMode start out as false since in the beginning not trying to edit board
  // boardToEdit start as empty object
  state = {
    boards: [],
    editMode: false,
    boardToEdit: {},
    showBoardForm: false,
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
        // set state to false to close form
        this.setState({ showBoardForm: false });
      })
      .catch((error) => console.error(error));
  }

  updateBoard = (boardId, updatedBoard) => {
    boardsData.updateBoard(boardId, updatedBoard)
      .then(() => {
        this.getBoards();
        // no longer in edit mode
        this.setState({ editMode: false, showBoardForm: false });
      })
      .catch((error) => console.error(error));
  }

  // value passed into this will be true once it's used in Board.js
  setEditMode = (editMode) => {
    // when go into edit board, showBoardForm because need to have prepopulated info in there
    this.setState({ editMode, showBoardForm: true });
  }

  // board passed into this will have object passed into it from Board.js once button is clicked
  setBoardToEdit = (board) => {
    this.setState({ boardToEdit: board });
  }

  // sets state to true to show form
  setShowBoardForm = () => {
    this.setState({ showBoardForm: true });
  }

  render() {
    const { setSingleBoard } = this.props;

    return (
    <div>
      <button onClick={this.setShowBoardForm}>Add New Board</button>
      {/* looks at state of showBoardForm and if it's true it will show the BoardForm */}
      { this.state.showBoardForm && <BoardForm addNewBoard={this.addNewBoard} editMode={this.state.editMode} boardToEdit={this.state.boardToEdit} updateBoard={this.updateBoard}/> }
      <div className="container">
        <div className="row">
          {/* the boards being mapped here are the boards from line 23 */}
          {this.state.boards.map((board) => (<Board key={board.id} board={board} setSingleBoard={setSingleBoard} setEditMode={this.setEditMode} setBoardToEdit={this.setBoardToEdit}/>))}
        </div>
      </div>
    </div>
    );
  }
}

export default BoardsContainer;
