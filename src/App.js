import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Gun from 'gun/gun'

//HACK: just to see if it'll work...
let counter = 0
const todoData = Gun().get('todos')

class App extends Component {
  constructor(){
   super()
   const initialItems = []
   this.state = {
     currentInput: '',
     items: initialItems
   }
   this.handleInput = this.handleInput.bind(this)
   this.handleClick = this.handleClick.bind(this)
   todoData.map((val, id) => {
     console.log('Mapping', val, id)
     this.setState({
       items: this.state.items.concat({name: val, id})
     })
   })
  }

  handleInput(evt) {
    const newVal = evt.target.value
    this.setState({currentInput: newVal})
  }

  handleClick() {
    const newItem = this.state.currentInput
    // gun.get('whatever').put({candy: 'llama'}, function(err){ console.log("did we make it here?", err) });
    todoData.path(counter).put(newItem)
    counter++
    
    this.setState({
      currentInput: ''
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <input type='text' onInput={this.handleInput} value={this.state.currentInput}/>
        <button onClick={this.handleClick}>Cleeek!</button>
        <ul>
          {this.state.items.map(item => <li key={item.id}>{item.id} {item.name}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
