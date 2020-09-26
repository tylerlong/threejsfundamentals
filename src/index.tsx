import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react-subx';
import {Progress} from 'antd';

import main from './main';
import store, {StoreType} from './store';

type PropsStore = {
  store: StoreType;
};

class App extends Component<PropsStore> {
  render() {
    const store = this.props.store;
    return store.loadPercent === 100 ? (
      <canvas id="c"></canvas>
    ) : (
      <Progress percent={store.loadPercent} />
    );
  }
  componentDidMount() {
    main();
  }
}

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<App store={store} />, container);
