import React from 'react';
import PropTypes from 'prop-types';

import pinsShape from '../../helpers/propz/pinsShape';

class Pins extends React.Component {
  static propTypes = {
    pin: pinsShape.pinsShape,
    deleteSinglePin: PropTypes.func,
  }

  deleteSinglePinEvent = (e) => {
    e.preventDefault();
    const { deleteSinglePin, pin } = this.props;
    deleteSinglePin(pin.id);
  }

  render() {
    const { pin } = this.props;

    return (
      <div className="Pin col-md-3">
        <div className="card">
          <img src={pin.imageUrl} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">{pin.title}</h5>
            <button className="btn btn-danger" onClick={this.deleteSinglePinEvent}>X</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Pins;
