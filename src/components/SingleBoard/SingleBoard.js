import React from 'react';
import PropTypes from 'prop-types';

import boardsData from '../../helpers/data/boardsData';
import Pins from '../Pins/Pins';
import pinsData from '../../helpers/data/pinsData';
import PinForm from '../PinForm/PinForm';

class SingleBoard extends React.Component {
  static propTypes = {
    selectedBoardId: PropTypes.string,
    setSingleBoard: PropTypes.func,
  }

  state = {
    board: {},
    pins: [],
  }

  getPinData = (selectedBoardId) => {
    pinsData.getPinsByBoardId(selectedBoardId).then((pins) => {
      this.setState({ pins });
    })
      .catch((errorFromGetPins) => console.error({ errorFromGetPins }));
  }

  componentDidMount() {
    const { selectedBoardId } = this.props;
    boardsData.getSingleBoard(selectedBoardId)
      .then((request) => {
        this.setState({ board: request.data });
        this.getPinData(selectedBoardId);
      })
      .catch((errorfromGetSingleBoard) => console.error(errorfromGetSingleBoard));
  }

  deleteSinglePin = (pinId) => {
    const { selectedBoardId } = this.props;
    pinsData.deletePins(pinId)
      .then(() => {
        this.getPinData(selectedBoardId);
      })
      .catch((error) => console.error(error));
  }

  removeSelectedBoardID = (e) => {
    e.preventDefault();
    const { setSingleBoard } = this.props;
    setSingleBoard(null);
  }

  addNewPin = (newPin) => {
    const { selectedBoardId } = this.props;
    pinsData.addPins(newPin)
      .then(() => {
        this.getPinData(selectedBoardId);
      })
      .catch((error) => console.error(error));
  }

  render() {
    const { board, pins } = this.state;

    return (
      <div>
        <button className="btn btn-info" onClick={this.removeSelectedBoardID}>x Close Board View</button>
        <div className="SingleBoard col-8 offset-2">
          <h2>{board.name}</h2>
          <p>{board.description}</p>
          < PinForm addNewPin={this.addNewPin} selectedBoardId={this.props.selectedBoardId}/>
          <div className="d-flex flex-wrap container">
            <div className="row">
              { pins.map((pin) => <Pins key={pin.id} pin={pin} deleteSinglePin={this.deleteSinglePin} />) }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleBoard;
