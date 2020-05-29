import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = (props) => {
  return (
    <div>
      {props.children}
    </div>
  );
}

Sidebar.propTypes = {
  test: PropTypes.any
}

export default Sidebar;
