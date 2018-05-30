import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route} from 'react-router'
import App from './App'
import About from './About'

const routes = (
<Route component={App}>
    <Route path="groups" components={App}/>
    <Route path="users" components={About}>
    </Route>
</Route>
)
class Root extends Component {
    render() {
        return (
           <Route component={App}>
            <Route path="groups" components={App}/>
            <Route path="users" components={About}>
            </Route>
        </Route> 
        )
    }
}

export default Root