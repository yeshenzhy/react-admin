import React from 'react';
import { Button } from 'antd';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.login = this.login.bind(this);
  }
  componentDidMount() {
    console.log('组件挂载完毕');
  }
  login() {
    localStorage.setItem('isLogin', '1');
    const id = 12; 
    const name = 'tom';
    this.props.history.push({ pathname: '/home', search: `id=${id}&name=${name}` });
  }
  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
  }
  handleSubmit(a, e) {
    alert(`提交的名字: ${this.state.value}${a}`);
    e.preventDefault();
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.login}>点我登录</Button>
      </div>
    );
  }
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit',
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }
  render() {
    const { temperature } = this.props;
    const { scale } = this.props;
    return (
      <fieldset>
        <legend>
Enter temperature in
          {' '}
          {scaleNames[scale]}
:
        </legend>
        <input
          value={temperature}
          onChange={this.handleChange}
        />
      </fieldset>
    );
  }
}
const PRODUCTS = [
  {
    category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football',
  },
  {
    category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball',
  },
  {
    category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball',
  },
  {
    category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch',
  },
  {
    category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5',
  },
  {
    category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7',
  },
];
class ProductCategoryRow extends React.Component {
  render() {
    const { category } = this.props;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const { product } = this.props;
    const name = product.stocked
      ? product.name
      : (
        <span style={{ color: 'red' }}>
          {product.name}
        </span>
      );

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const { filterText } = this.props;
    const { inStockOnly } = this.props;

    const rows = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category}
          />,
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name}
        />,
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }
  // 组件将要挂载
  componentWillMount() {
    console.log('组件将要挂载01');
  }
  // 组件挂载之前
  componentDidMount() {
    console.log('组件挂载完成03');
  }
  // 你在父组件里面改变props传值的时候触发的函数
  componentWillReceiveProps() {
    console.log('父子组件传值，父组件里面改变了props的值触发的方法');
  }
  // 是否要更新数据
  shouldComponentUpdate(nextProps, nextState) {
    console.log('01是否要更新数据');
    console.log(nextProps); // 父组件传给子组件的值，这里没有会显示空
    console.log(nextState); // 数据更新后的值
    return true; // 返回true，确认更新
  }
  // 将要更新数据的时候触发的
  componentWillUpdate() {
    console.log('02组件将要更新');
  }
  // 更新数据时候触发的生命周期函数
  componentDidUpdate() {
    console.log('04组件更新完成');
  }
  render() {
    console.log('数据渲染render02');
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.handleInStockChange}
          />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false,
    };
    
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }
  handleFilterTextChange(filterText) {
    this.setState({
      filterText,
    });
  }
  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly,
    });
  }
  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable
          products={PRODUCTS}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}

export default Login;
