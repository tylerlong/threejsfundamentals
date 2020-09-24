import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import main from './main';

class App extends React.Component {
  render() {
    return (
      <>
        <canvas id="c"></canvas>
        <div id="info"></div>
      </>
    );
  }
  componentDidMount() {
    main();
  }
}

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<App />, container);
