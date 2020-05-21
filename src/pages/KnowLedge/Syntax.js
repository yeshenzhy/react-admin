import React, { Component } from 'react';
import { connect } from 'react-redux';
import Know from './know';

class Syntax extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      info: {
        name: '',
        age: 18 + Math.ceil(Math.random() * 10),
      },
    };
  }
  handleNumber() {
    console.log(this.state.info, 'zzz');
    this.props.addCount({ age: ++this.props.userInfo.age });
  }
  render() {
    const list = ['a', 'b', 'c'];
    const dom = list.map((item, index) => (<li data={list} key={index}>{item}</li>)) || '';
    console.log(this.props);
    return (
      <div>
        <Know>
          <div onClick={this.handleNumber.bind(this)}>
            我是button
            {' '}
            {this.props.userInfo.age}
          </div>
        </Know>
        <ul>{dom}</ul>
      </div>

    );
  }
}

