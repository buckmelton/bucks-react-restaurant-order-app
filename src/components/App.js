import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component {

  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);

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

  loadSamples() {
    this.setState({
      fishes: sampleFishes,
    });
  }

  addToOrder(key) {
    // best practice: first make copy of state
    const order = {...this.state.order};

    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;

    // update state
    this.setState({ order });  // shortcut for ({ order: order})
  }

  render() {
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish
                              key={key}  // the prop 'key' is reserved for React, don't use it
                              index={key} // but we need to have access to the key, so we use our own property, we called it 'index'
                              details={this.state.fishes[key]}
                              addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
      </div>
    )
  }

}

export default App;
