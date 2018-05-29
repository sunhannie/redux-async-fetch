# redux-async-fetch
It is a example to use async way to fetch data by react-redux


## react-scripts总结
- public中有index.html就能启动项目，默认是3000
- src中必须有index.js文件，不能换成其他文件名
- src/index.js中
```
    import registerServiceWorker from './registerServiceWorker';
    ReactDOM.render(<App />, document.getElementById('root'));
    registerServiceWorker();

    如果不用registerServiceWorker也能启动，应该是内部开了发了启动服务器功能
```