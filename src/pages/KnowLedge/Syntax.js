import React, { Component } from 'react';
import Know from './know';
import { connect } from 'react-redux';
import { addCount } from '../../redux/actions/countAction'
class Syntax extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        name: '',
        age: 18 + Math.ceil(Math.random() * 10)
      }
    }
  }
  handleNumber() {
    console.log(this.state.info, "zzz")
    this.props.addCount({age: 18 + Math.ceil(Math.random() * 10)})
  }
  render() {
    const list = ["a","b","c"];
    const dom = list.map((item, index) => (<li data={list} key={index}>{item}</li>)) || '';
    console.log(this.props)
    return (
      <div>
        <Know >
          <div onClick={this.handleNumber.bind(this)}>我是button {this.props._userInfo.age}</div>
        </Know>
        <ul>{dom}</ul>
      </div>

    );
  }
}
const mapStateToProps = state => {
  return {
    _userInfo: state.userInfo
  }
}
const mapDispatchToProps = dispatch => ({
  addCount: data => {
    dispatch(addCount(data));
  }
})
export default connect(mapStateToProps,mapDispatchToProps)(Syntax);

