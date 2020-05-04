import React from 'react';

class Main extends React.Component {
  clickHandler = () => {
    alert('works')
  }

  render() {
    return (
      <div
        onClick={this.clickHandler}
      >1</div>
    );
  }
}

export default Main;
