import React from 'react';
import './assets/styles/app.scss';

class App extends React.Component {
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

export default App;
