import React, {Component, Fragment} from 'react'
import './home.scss'
import { Button } from 'antd'

class Home extends Component{
  constructor(porps){
    super(porps)
    this.state={}
  }
  render(){
    return (
      <Fragment>
        home
        <Button type="primary">按 钮</Button>
      </Fragment>
    )
  }
}
export default Home