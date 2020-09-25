import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import main from './main';

class App extends React.Component {
  render() {
    return (
      <>
        <canvas id="c"></canvas>
        <div id="loading">
          <div>
            <div>...loading...</div>
            <div className="progress">
              <div id="progressbar"></div>
            </div>
          </div>
        </div>
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
