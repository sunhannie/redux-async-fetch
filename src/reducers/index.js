/**
 * 先写好这些代码，最后用一个固定值来渲染页面
 */
import { combineReducers } from 'redux'
import {
  SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'

// action.type:REQUEST_POSTS
const selectedSubreddit = (state = 'reactjs', action) => {
    // console.log('action.type:REQUEST_POSTS'+action.type);
    switch (action.type){
        case SELECT_SUBREDDIT:   
            return action.subreddit
        default:
            return state
    }
}

// 新的state，根据需要自己添加属性
const posts = (state = {
    isFetching:false,
    didInvalidate:false,
    items:[]
},action) => {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
            return{
                ...state,
                didInvalidate:true
            }
        case REQUEST_POSTS:
            return{
                ...state,
                isFetching:true,
                didInvalidate:false
            }
        case RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}

const postsBySubreddit = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action)
      }
    default:
      return state
  }
}
// 结合起来，返回一对象
const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit
})

export default rootReducer