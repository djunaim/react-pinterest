import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';

class PinForm extends React.Component {
  static propTypes = {
    addNewPin: PropTypes.func,
    selectedBoardId: PropTypes.string,
  }

  // info that needs to be typed in form
  state = {
    pinTitle: '',
    pinImageUrl: '',
  }

  // new pin object needs to be the same as json data file
  addPinEvent = (e) => {
    e.preventDefault();
    const { addNewPin } = this.props;
    const newPin = {
      title: this.state.pinTitle,
      imageUrl: this.state.pinImageUrl,
      uid: authData.getUid(),
      boardId: this.props.selectedBoardId,
    };
    addNewPin(newPin);
    this.setState({ pinTitle: '', pinImageUrl: '' });
  }

  titleChange = (e) => {
    e.preventDefault();
    this.setState({ pinTitle: e.target.value });
  }

  imageUrlChange = (e) => {
    e.preventDefault();
    this.setState({ pinImageUrl: e.target.value });
  }

  render() {
    const { pinTitle, pinImageUrl } = this.state;

    return (
      <div>
        <form className='col-6 offset-3 PinForm'>
          <div className="form-group">
            <label htmlFor="pin-title">Pin Title:</label>
            <input
              type="text"
              className="form-control"
              id="pin-title"
              placeholder="Cat Pic"
              value={pinTitle}
              onChange={this.titleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pin-image-url">Pin Image Url:</label>
            <input
              type="text"
              className="form-control"
              id="pin-image-url"
              placeholder="https://www.google.com"
              value={pinImageUrl}
              onChange={this.imageUrlChange}
            />
          </div>
          <button className="btn btn-secondary" onClick={this.addPinEvent}>Add Pin</button>
        </form>
      </div>
    );
  }
}

export default PinForm;
