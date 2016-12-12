import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {

  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    // initial state
    this.state = {
      fishes: {},
      order: {},
    };

  }

  componentWillMount(){
    // This runs right before the App is rendered.
    this.ref = base.syncState(`${this.props.params.storeID}/fishes`,
    {
      context: this,
      state: 'fishes'
    });

    // Check if there is any order in local storage.
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
    if (localStorageRef) {
      // Update state of our App to include order.
      this.setState({
        order : JSON.parse(localStorageRef)
      });
    }

  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`,
      JSON.stringify(nextState.order));
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

  updateFish(key, updatedFish) {
    // Make copy of fishes
    const fishes = {...this.state.fishes};

    // Update fish in copy.
    fishes[key] = updatedFish;

    // Set copy to be new state.
    this.setState( { fishes } );
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    // Normally you would do the following, but Firebase doesn't play well
    // with 'delete' operation, instead need to explicitly set to null
    // delete fishes[key];
    fishes[key] = null;
    this.setState({fishes});
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

  removeFromOrder(key) {
    const order = {...this.state.order}

    // We can use 'delete' operation here, because Order doesn't sync with firebase
    // (it syncs with Local Storage).
    delete order[key];
    this.setState({order});
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
                              key={key}  // the prop 'key' is reserved for React, dont use it
                              index={key} // but we need to have access to the key, so we use our own property, we called it index
                              details={this.state.fishes[key]}
                              addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          loadSamples={this.loadSamples}
          fishes={this.state.fishes}
        />
      </div>
    )
  }

}

export default App;
