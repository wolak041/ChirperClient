import React from 'react';
import PropTypes from 'prop-types';

class Entry extends React.Component {
  render() {
    return (
      <div>Entry</div>
    );
  }
}

Entry.propTypes = {
  test: PropTypes.any
}

export default Entry;
