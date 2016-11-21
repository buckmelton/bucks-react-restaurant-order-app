import React from 'react';

class App extends React.Component {
  render() {
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header />
          <Fish />
          <Fish />
          <Fish />
          <Fish />
          <Fish />
          <Fish />
          <Fish />
        </div>
      </div>

    );
  }
}

export default StorePicker;
