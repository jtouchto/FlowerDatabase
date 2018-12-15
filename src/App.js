import React, { Component } from 'react';
import './App.css';
import { subscribeToTimer, getFlowers, getRecent, updateFlower, insertSighting} from './api.js';

class App extends Component {
  constructor(props) {
    super(props);
    subscribeToTimer((err, timestamp) => this.setState({
      timestamp
    }));
    getFlowers((err, flowers) => this.setState({flowers}));
    console.log(this.state.flowers);
    this.handleChangeGenus = this.handleChangeGenus.bind(this);
    this.handleChangeSpecies = this.handleChangeSpecies.bind(this);
    this.handleChangeComname = this.handleChangeComname.bind(this);
    this.handleChangeSighted = this.handleChangeSighted.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangePerson = this.handleChangePerson.bind(this);
  }

  state = {
    timestamp: 'no timestamp yet', flowers: ["no flowers", "ass"],detailedInfoFlower:"No flower selected", updateFlowerGenus: "", updateFlowerComname: "", updateFlowerSpecies: "",
    recent: [], updateGenus: '', updateSpecies: '', updateComname: '', inName: '', inPerson : '',inLocation : '', inSighted : ''
  };

  getInfo = (flower) => {
    getRecent(flower.COMNAME, (err, recent) => this.setState({recent}));
    this.setState({detailedInfoFlower:flower.GENUS});
    console.log(flower);
  }

  update = (flower) => {
    this.setState({updateFlowerGenus:flower.GENUS,updateFlowerSpecies:flower.SPECIES,updateFlowerComname:flower.COMNAME});
    console.log(flower);
  }

  updateDb = () => {
    if (this.state.updateGenus === "" || this.state.updateSpecies === "" || this.state.updateComname === "" )
    alert("none of the fields can be left blank");
    else {
      updateFlower({GENUS: this.state.updateFlowerGenus,SPECIES: this.state.updateFlowerSpecies, COMNAME: this.state.updateFlowerComname},{GENUS: this.state.updateGenus, SPECIES: this.state.updateSpecies, COMNAME: this.state.updateComname});
    }
  }

  insertDb = () => {
    if (this.state.inName === "" || this.state.inPerson === "" || this.state.inLocation === ""|| this.state.inSighted ==="" )
    alert("none of the fields can be left blank");
    else {
      insertSighting({Name: this.state.inName,Person: this.state.inPerson, Location: this.state.inLocation, Sighted: this.state.inSighted});
    }
  }

  handleChangeGenus(event) {
   this.setState({updateGenus: event.target.value});
 }

 handleChangeSpecies(event) {
   this.setState({updateSpecies: event.target.value});
 }

 handleChangeComname(event) {
   this.setState({updateComname: event.target.value});
 }

 handleChangeSighted(event) {
   this.setState({inSighted: event.target.value});
 }

 handleChangePerson(event) {
   this.setState({inPerson: event.target.value});
 }

 handleChangeName(event) {
   this.setState({inName: event.target.value});
 }

 handleChangeLocation(event) {
   this.setState({inLocation: event.target.value});
 }

  render() {
    var flowerList;
    if (this.state.flowers != null)
    flowerList = this.state.flowers.map((flower) =>
    <div className="itemCont">
      <div className="listItem" key = {flower.GENUS}  onClick={(e) => this.getInfo(flower, e)}>
        <div className="Genus">Genus:{flower.GENUS}</div>
        <div className="Species">Species:{flower.SPECIES}</div>
        <div className="Comname">Comname:{flower.COMNAME}</div>
      </div>
      <div className="updateButton" onClick={(e) => this.update(flower, e)}>
      Update
      </div>
    </div>
    );
    else {
    flowerList = <li>'no flowers'</li>
    }

    var detailedInfo;
    if(this.state.recent != null)
      detailedInfo = this.state.recent.map((sighting) =>
      <div className="itemCont">
        <div className="listItem">
          <div className="Genus">Date:{sighting.SIGHTED}</div>
          <div className="Species">Location:{sighting.LOCATION}</div>
          <div className="Comname">Person:{sighting.PERSON}</div>
        </div>
      </div>
    );
    else {
      detailedInfo = <div>No detailed info</div>
    }

    return (
      <div className="App">
        <div className="App-header">
        Welcome to the flower Database! It is curently: {this.state.timestamp}
        </div>
        <div className="container">
          <div className="list">
            {flowerList}
          </div>
          <div className = "infoContainer">
            <div className = "detailedInfoBox">
            <h3>Detailed Info for: {this.state.detailedInfoFlower}</h3>
              <div className="list">
                {detailedInfo}
              </div>
            </div>
            <div className = "updateBox">
              <h3>Update flower: {this.state.updateFlower}</h3>
              <div className = {this.state.updateFlowerGenus?"visible":"hidden"}>
                <div className="itemCont">
                    <div className="listItem">
                      <div className="Genus">Genus:{this.state.updateFlowerGenus}</div>
                      <div className="Species">Species:{this.state.updateFlowerSpecies}</div>
                      <div className="Comname">Comname:{this.state.updateFlowerComname}</div>
                    </div>
                    <div className="listItem">
                      <div className="Genus">Genus:
                         <input type="text" value={this.state.updateGenus} onChange = {this.handleChangeGenus}/>
                      </div>
                      <div className="Species">Species:
                        <input type="text" value={this.state.updateSpecies} onChange = {this.handleChangeSpecies}/>
                      </div>
                      <div className="Comname">Comname:
                        <input type="text" value={this.state.updateComname} onChange = {this.handleChangeComname}/>
                      </div>
                    </div>
                    <div className = "updateButton" onClick={() => this.updateDb()} >
                    Update
                    </div>
                </div>
                <div className = {this.state.updateFlowerGenus?"hidden":"visible"}>
                Select a flower to update!
                </div>
              </div>
            </div>
            <div className = "updateBox">
              <h3>Insert Sighting: </h3>
                <div className="listItem">
                  <div className="Genus">Name:
                     <input type="text" value={this.state.inName} onChange = {this.handleChangeName}/>
                  </div>
                  <div className="Species">Person:
                    <input type="text" value={this.state.inPerson} onChange = {this.handleChangePerson}/>
                  </div>
                  <div className="Comname">Location:
                    <input type="text" value={this.state.inLocation} onChange = {this.handleChangeLocation}/>
                  </div>
                  <div className="Comname">Sighted:
                    <input type="text" value={this.state.inSighted} onChange = {this.handleChangeSighted}/>
                  </div>
                </div>
                <div className = "updateButton" onClick={() => this.insertDb()} >
                  insert
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
