import React from 'react';

import pinsShape from '../../helpers/propz/pinsShape';

class Pins extends React.Component {
  static propTypes = {
    pin: pinsShape.pinsShape,
  }

  render() {
    const { pin } = this.props;

    return (
      <div className="Pin col-3">
        <div className="card">
          <img src={pin.imageUrl} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">{pin.title}</h5>
            <button className="btn btn-danger" onClick={() => {}}>X</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Pins;
