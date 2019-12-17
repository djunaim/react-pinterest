import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';

class BoardForm extends React.Component {
  static propTypes = {
    addNewBoard: PropTypes.func,
  }

  // need to save form information in state and once sent and trying to retrieve info back, will need to get it back from state
  state = {
    boardName: '',
    boardDescription: '',
  }

  addBoardEvent= (e) => {
    e.preventDefault();
    const { addNewBoard } = this.props;
    const newBoard = {
      name: this.state.boardName,
      description: this.state.boardDescription,
      uid: authData.getUid(),
    };
    // actually save
    addNewBoard(newBoard);
    this.setState({ boardName: '', boardDescription: '' });
  }

  // for each different input field. Need to write function
  nameChange = (e) => {
    e.preventDefault();
    this.setState({ boardName: e.target.value });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ boardDescription: e.target.value });
  }

  render() {
    return (
      <div>
        <form className='col-6 offset-3 BoardForm'>
          <div className="form-group">
            <label htmlFor="order-name">Board Name:</label>
            <input
              type="text"
              className="form-control"
              id="board-name"
              placeholder="Enter board name"
              value={this.state.boardName}
              onChange={this.nameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description-name">Board Description:</label>
            <input
              type="text"
              className="form-control"
              id="board-description"
              placeholder="Enter board description"
              value={this.state.boardDescription}
              onChange={this.descriptionChange}
            />
          </div>
          <button className="btn btn-secondary" onClick={this.addBoardEvent}>Save Board</button>
        </form>
      </div>
    );
  }
}

export default BoardForm;
