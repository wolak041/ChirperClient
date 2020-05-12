import React from 'react';
import PropTypes from 'prop-types';

class Loading extends React.Component {
  render() {
    return (
      <div>Loading...</div>
    );
  }
}

Loading.propTypes = {
  test: PropTypes.any
}

export default Loading;
