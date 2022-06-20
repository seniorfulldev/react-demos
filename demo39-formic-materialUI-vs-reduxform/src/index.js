import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import reducer from './reducer'
import saga from './saga'

let composeEnhancers
if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
} else {
  composeEnhancers = compose
}

const sagaMiddleware = createSagaMiddleware()
const middlewares = applyMiddleware(sagaMiddleware)
const store = createStore(reducer, composeEnhancers(middlewares))
window.store = store
sagaMiddleware.run(saga)

ReactDOM.render(
  <Provider store={store}>
    <App dispatch={store.dispatch} />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
