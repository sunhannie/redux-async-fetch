import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class App extends Component {
  static propTypes = {
    selectedSubreddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

//this.props为：{selectedSubreddit: "reactjs", posts: Array(0), isFetching: true, lastUpdated: undefined, dispatch: ƒ}
  componentDidMount() {
    
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

/*
this.props:开始获得2次
{selectedSubreddit: "reactjs", posts: Array(0), isFetching: true, lastUpdated: undefined, dispatch: ƒ}
{selectedSubreddit: "reactjs", posts: Array(0), isFetching: true, lastUpdated: undefined, dispatch: ƒ}

nextProps:开始获得2次
{selectedSubreddit: "reactjs", posts: Array(0), isFetching: true, lastUpdated: undefined, dispatch: ƒ}
{selectedSubreddit: "reactjs", posts: Array(26), isFetching: false, lastUpdated: 1527585247618, dispatch: ƒ}

通过更改props来确定是否允许
*/
  componentWillReceiveProps(nextProps) {
    
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = nextProps
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  }

  handleChange = nextSubreddit => {
    this.props.dispatch(selectSubreddit(nextSubreddit))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedSubreddit } = this.props
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  render() {
      console.log(this.props);  //{selectedSubreddit: "reactjs", posts: Array(0), isFetching: true, lastUpdated: undefined, testProp: undefined, …}
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props
    const isEmpty = posts.length === 0
    return (
      <div>
        <Picker value={selectedSubreddit}
                onChange={this.handleChange}
                options={[ 'reactjs', 'frontend' ]} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <button onClick={this.handleRefreshClick}>
              Refresh
            </button>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
            </div>
        }
      </div>
    )
  }
}
// 我添加testProp，不管我有没有赋值，初始获取得还是undefined，这是因为Redux store没有发生变化的原因吗？

const mapStateToProps = state => {
//   const {testProp} = {'test':'1'}; //或写数组['aa']
  const { selectedSubreddit, postsBySubreddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated

  }
}

export default connect(mapStateToProps)(App)
