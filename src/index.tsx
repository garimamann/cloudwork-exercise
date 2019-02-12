import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import moment from 'moment';

import { reducer, epics, Action, State } from './state';
import * as WorkloadActions from './state/workloads/actions';
import './index.css';
import App from './components/App';


// @ts-ignore: use Redux devtools if installed in browser
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware<Action, Action, State>();
const store = createStore(reducer, composeEnhancers(applyMiddleware(epicMiddleware)));
epicMiddleware.run(epics);

// demo actions
store.dispatch(WorkloadActions.submit({ complexity: 10 }));
store.dispatch(WorkloadActions.created({ id: 0, complexity: 10, completeDate: moment().add(10, 'second').toDate(), status: 'WORKING' }));


ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ), 
  document.getElementById('root'),
);
