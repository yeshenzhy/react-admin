import React, { Component } from 'react';

import Know from './know';

class Syntax extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  render() {
    const list = ['a', 'b', 'c', 'zhy', 'xhz', 'lyx'];

    const dom = list.map((item, index) => (<li data={list} key={index}>{item}</li>)) || '';

    console.log(this.props);
    return (

      <div>

        <Know>

          <div>

            我是button

            {' '}

          </div>

        </Know>

        <ul>{dom}</ul>

      </div>

    );
  }
}

export default Syntax;

