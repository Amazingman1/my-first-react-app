import React from 'react';
import { Switch } from 'react-router-dom'

import PrivateRouter from '@/components/privateRouter/index'
import pathList from './components'

class ContainerMain extends React.Component{
  constructor(props){
    super(props)
    this.state ={}
  }
  render(){
    return(
      <Switch>
        {
          pathList.map(p => {
            return <PrivateRouter exact key={p.path} path={p.path} component={p.component} />
          })
          
        }
    
      </Switch>
    )
  }
}

export default ContainerMain;
