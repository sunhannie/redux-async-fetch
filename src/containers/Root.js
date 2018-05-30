import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { Router, IndexRoute, Route} from 'react-router'
import App from './App'
import About from './About'
import { BrowserRouter as Router, Route } from 'react-router-dom'


// 注意用法
class Root extends Component {
    // getConfirmation = (a) => {
    //     console.log('getConfirmation');
    // }
    
    render() {
        return (
        <Router>
            
            <div>
                <Link to="/about">If adding the sentence and open http://localhost:3000/b ,the page only show the section. b是因为index.js页面中加了BrowserRouter  basename="/b"。 http://localhost:3000/b/about 也是仅仅显示这一行。这样进一步学习了BrowserRouter的用法</Link>
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
 * 
 * 
 * http://localhost:3000/  会调用App
 * http://localhost:3000/about  会调用About
 * http://localhost:3000/b/about 和 http://localhost:3000/b会显示<Link to="/about"></Link>这里面的内容
 * 
 */