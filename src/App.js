import React from 'react';
import { HashRouter, Switch, Route} from 'react-router-dom'
import Login from './views/login/index'
import Index from './views/index/index'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state ={}
  }
  render(){
    return(
      <div>
        <HashRouter>
          <Switch>
            <Route exact component={Login} path="/" />
            <Route exact component={Index} path="/index" />
          </Switch>
        </HashRouter>
      </div>
    )
  }
}

export default App;
