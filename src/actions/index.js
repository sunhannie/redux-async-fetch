export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export const selectSubreddit = subreddit => ({
    type:SELECT_SUBREDDIT,
    subreddit
})

export const invalidateSubreddit = subreddit => ({
    type:INVALIDATE_SUBREDDIT,
    subreddit
})

export const requestPosts = subreddit => ({
  type: REQUEST_POSTS,
  subreddit
})

export const receivePosts = (subreddit,json) => ({
    type:RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
})

/**
 * 初始subreddit为reactjs
 * json从哪里来的？ 
 */
const fetchPosts = subreddit => dispatch => {
    console.log(subreddit);
    dispatch(requestPosts(subreddit))  //第一次（没抓到数据）
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(subreddit, json))) //第二次（抓到数据）
}

const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPosts(subreddit))   
  }
}

/**
 * 我的理解：actions中的文件，应该从UI中开始，然后设计state
 * 应该想从抓取到的数据，怎么传到UI
 * 
 */