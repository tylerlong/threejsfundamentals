import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import main from './main';

class App extends React.Component {
  render() {
    return <canvas id="c"></canvas>;
  }
  componentDidMount() {
    main();
  }
}

ReactDOM.render(<App />, document.getElementsByTagName('body')[0]);
