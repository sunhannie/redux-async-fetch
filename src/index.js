import { BrowserRouter} from 'react-router-dom'   //放在顶处

import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'
import About from './containers/About'
import Root from './containers/Root'

import { Router} from 'react-router'

// import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
// import createHistory from 'history/createBrowserHistory'
// const history = createHistory()

// import { BrowserRouter } from 'react-router-dom'


const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)
// const store = createStore(
//   combineReducers({
//     ...reducer,
//     router: routerReducer
//   }),
//   applyMiddleware(...middleware)
// )

// 不加BrowserRouter标签也能正常运行，应该去了解正在原理

// getConfirmation没有起作用，这是为什么？
const getConfirmation = (message, callback) => {
    const allowTransition = window.confirm('message')
    callback(allowTransition)
    alert('getConfirmation');
}

render(
  <Provider store={store}>
    <BrowserRouter  basename="/b"   getUserConfirmation={getConfirmation}>  
      <Root/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

/**
 * <App />
 * 报错：React.Children.only expected to receive a single React element child.
 * 
 *    <ConnectedRouter history={history}>
      <div>
        <Router exact path="/" component={App}/>
        <Router path="/about" component={About}/>
      </div>
    </ConnectedRouter>

    <BrowserRouter  basename="/1">
      <App/>
    </BrowserRouter>


    假如不用BrowserRouter但是在其他地方用了link，报错：You should not use <Link> outside a <Router>

    报错：You should not use <Route> or withRouter() outside a <Router>
 */


