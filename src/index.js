import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Store from './store/Store'
import {observer, Provider} from 'mobx-react';
import {EditableTable} from './components/Table'
import {Table2} from './components/TablePage1'
import Demo from './components/TablePage1'

import {BrowserRouter} from "react-router-dom";

@observer
class App extends Component {
  render() {
    const {store}=this.props;
    return (
      <div className="App">
        <h1>PageTable №1</h1>
        <Table2 store={store}></Table2>
        <h1>PageTable №2</h1>
        <Demo store={store}/>
        <EditableTable store={store}></EditableTable>
      </div>
      
    );
  }
}

var store = new Store();

ReactDOM.render(
    <Provider>
    <BrowserRouter>
      <App store={store}/>
    </BrowserRouter>
  </Provider>,
    document.getElementById("root"));
