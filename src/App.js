import { Component } from "react";
import "./App.css";
import villagerData from "./data";

class App extends Component {
  constructor() {
    console.log('constructor')
    super();

    this.state = {
      villagerData: {},
      villagers: [],
      currentVillager: villagerData.ant00,
      showVillage: true,
    };
  }

  changeVillager = () => {
    //// Change Villager
  ////   1. read villagerData, meaning:
    ///       deconstruct villagerData from state
    ///       store its length
    const {villagerData} = this.state;
    const numVillagers = Object.keys(this.state.villagerData).length
    
    ////      this.setState({currentVillager: someRandomVillagerObj})
    // get a random object in the Object.values(villagerData) array
    const randomI = Math.floor(Math.random() * numVillagers)
    const randomVillager = Object.values(villagerData)[randomI]
    this.setState({currentVillager: randomVillager})
  }

  componentDidMount() {
    console.log('componentDidMount')
    fetch('https://acnhapi.com/v1/villagers')
      .then((response) => response.json())
      .then((villagers) => this.setState({villagerData: villagers}))
  }

  addVillager = () => {
    //// Add Villager to Village
  ////   1. read currentVillager
  ///       deconstruct currentVillager from state
    const {villagers, currentVillager} = this.state
  ////   2. change villagers, adding the currentVillager
    this.setState({villagers: [...villagers, currentVillager]})
  }

  clearVillage = () => {
    this.setState({villagers: []})
  }

  toggleVillageHiding = () => {
    // if (this.state.showVillage === true) {
    //   this.setState({showVillage: false})
    // } else {
    //   this.setState({showVillage: true})
    // }

    this.setState({showVillage: !this.state.showVillage})
  }

  // what do we need to do in the method for each of the following buttons:
  //// Change Villager
  ////   1. read villagerData
  ///       deconstruct villagerData from state
  ///       store its length
  ////   2. change currentVillager
  ////      this.setState({currentVillager: someRandomVillagerObj})
  //// Add Villager to Village
  ////   1. read currentVillager
  ///       deconstruct currentVillager from state
  ////   2. change villagers, adding the currentVillager
  ////      this.setState({villagers: [...villagers, currentVillager]})
  //// Clear Village
  ////  1. change the villagers array (emptying it)

  render() {
    console.log('render')
    const {currentVillager, villagers, showVillage} = this.state
    // For each villager, make a paragraph with the villager's name.
    const names = villagers.map((villager) => <p key={villager.id}>{villager.name['name-USen']}</p>)
    return (
      <div className="App">
        <h1>Animal Crossing Villagers</h1>
        <div>
          <button onClick={this.changeVillager}>Change villager</button>
          <button onClick={this.addVillager}>Add villager to village</button>
          <button onClick={this.clearVillage}>Clear Village</button>
          {/* Our big win was:  
                instead of having to do logic to go to a default value like "None selected"
              We were able to have a default starting value */}
              {/* alternately, if we were using `null` as our starting currentVillager value: */}
          {/* <div>Currently selected villager: {currentVillager
            ? currentVillager.name['name-USen']
            : 'None selected'}</div> */}
          <div>Currently selected villager: {currentVillager.name['name-USen']}</div>
          <div>Number of villagers in village: {villagers.length ? villagers.length : 'None yet!'}</div>
          <button onClick={this.toggleVillageHiding}>Show/Hide Village</button>
          {/* <div className="villager-grid">{showVillage && names}</div> */}
          <div className="villager-grid">{showVillage ? names : ''}</div>
        </div>
      </div>
    );
  }
}

export default App;
// deconstruct if you want to use just `villagers`!
// const villagers = this.state.villagers
// const {villagers} = this.state;
  
// how we:
// change our state
// this.setState({villagers: ['Colin', 'Benny']})
// read our state
// console.log(villagers)
// console.log(this.state.villagers)
