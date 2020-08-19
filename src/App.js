import React from 'react';
import './App.css';
import { HashRouter, Switch, Route} from 'react-router-dom'
import Home from './views/Home'
import About from './views/About'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state ={}
  }
  render(){
    return(
      <HashRouter>
        <Switch>
          <Route exact component={Home} path="/" />
          <Route component={About} path="/about" />
        </Switch>
      </HashRouter>
    )
  }
}

export default App;
