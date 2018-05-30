import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { Router, IndexRoute, Route} from 'react-router'
import App from './App'
import About from './About'
import { BrowserRouter as Router, Route } from 'react-router-dom'



class Root extends Component {
    render() {
        return (
         /*<Router>
            <Route path="/" component={App}>
                <Route path="about" component={About} />
            </Route>
        </Router>*/
        <Router>
            <div>
                <Route exact path="/" component={App}/>
                <Route path="/about" component={About}/>
            </div>
        </Router>
        )
    }
}

export default Root

/**
 * index.js:2178 Warning: Failed prop type: The prop `history` is marked as required in `Router`, but its value is `undefined`.
 * 
 * browserHistory不是V4中的东西，所以您可以删除它。
 */