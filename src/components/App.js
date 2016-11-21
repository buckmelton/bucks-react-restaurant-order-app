import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {

  constructor() {
    super();

    this.addFish = this.addFish.bind(this);

    // initial state
    this.state = {
      fishes: {},
      order: {},
    };

  }

  addFish(fish) {

    // update our state

    // Could just do:
    // this.state.fishes.fish1 = fish;
    // but this is not considered good practice
    // best practice: first make copy of state
    const fishes = {...this.state.fishes};
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;

    // set state
    // Not all state, just the 'fishes' part that we updated
    // take the new local const 'fishes' and set it to be the new App state for 'fishes'
    this.setState({fishes: fishes});
    // alternative shortcut: this.setState({ fishes });

  }

  render() {
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
        </div>
        <Order />
        <Inventory addFish={this.addFish}/>
      </div>
    )
  }

}

export default App;
