import PropTypes from 'prop-types';

const pinsShape = PropTypes.shape({
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
});

export default { pinsShape };
