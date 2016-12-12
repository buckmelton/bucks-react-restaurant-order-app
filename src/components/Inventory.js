import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {

  renderInventory(key) {
    return (
      <p>{key}</p>
    )
  }

  render() {
    return(
      <div>
        <h2>Inventory</h2>
        {/* Loop through each fish to display it as inventory */}
        {Object.keys(this.props.fishes).map(this.renderInventory)}

        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}

export default Inventory;
