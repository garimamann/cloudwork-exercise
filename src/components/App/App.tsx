import React, { PureComponent } from 'react';

import { WorkloadListContainer } from '../WorkloadList';
import { WorkloadFormContainer } from '../WorkloadForm';
import './App.css';


class App extends PureComponent {
  render() {
    return (
      <div className="app">
        <h1>CloudWork</h1>
        <hr />
        <h2>Workloads</h2>
        <div className="flex">
        <div className="item2">
          
          <WorkloadListContainer />
        </div>
        <div className="item1">
          <WorkloadFormContainer />
        </div>
       

        
        </div>
      </div>
    );
  }
}

export default App;
