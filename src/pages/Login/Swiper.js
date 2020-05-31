import React from 'react';
import './demo.css';
import './style.css';

class Swiper extends React.Component {
  state = {
    timer: '',
    swiperList: [
      {
        id: 1,
        checked: false,
      },
      {
        id: 2,
        checked: true,
      },
      {
        id: 3,
        checked: false,
      },
      {
        id: 4,
        checked: false,
      },
      {
        id: 5,
        checked: false,
      },
      {
        id: 6,
        checked: false,
      },
    ],
  }
  componentDidMount() {
    this.state.timer && clearInterval(this.state.timer);
    this.state.timer = setInterval(() => {
      this.changeSwiper();
    }, 10000);
  }
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }
  changeSwiper() {
    const checkedIndex = this.state.swiperList.findIndex(item => { return item.checked; }) + 1;
    console.log(checkedIndex);
    const { swiperList } = this.state;
    swiperList.forEach(item => {
      item.checked = false;
    });
    if (checkedIndex === 6) {
      swiperList[0].checked = true;
    } else {
      swiperList[checkedIndex].checked = true;
    }
   
    this.setState(() => {
      return { swiperList };
    });
  }
  render() {
    return (
      <div className="container">
        {this.state.swiperList.map(item => {
          return <input type="radio" name="slides" key={item.id} id={`slide${item.id}`} checked={item.checked} />;
        })}
        <div className="slider">
          <div className="captions">
            <div className="c1">ルキア</div>
            <div className="c2">うずまき ナルト</div>
            <div className="c3">じょてい</div>
            <div className="c4">いのうえおりひめ</div>
            <div className="c5">キリト</div>
            <div className="c6">てんさざんげつ</div>
          </div>
          <div className="img img1">
            <div className="frag frag1"></div>
            <div className="frag frag2"></div>
            <div className="frag frag3"></div>
            <div className="frag frag4"></div>
            <div className="frag frag5"></div>
            <div className="frag frag6"></div>
          </div>
          <div className="img img2">
            <div className="frag frag1"></div>
            <div className="frag frag2"></div>
            <div className="frag frag3"></div>
            <div className="frag frag4"></div>
            <div className="frag frag5"></div>
            <div className="frag frag6"></div>
          </div>
          <div className="img img3">
            <div className="frag frag1"></div>
            <div className="frag frag2"></div>
            <div className="frag frag3"></div>
            <div className="frag frag4"></div>
            <div className="frag frag5"></div>
            <div className="frag frag6"></div>
          </div>
          <div className="img img4">
            <div className="frag frag1"></div>
            <div className="frag frag2"></div>
            <div className="frag frag3"></div>
            <div className="frag frag4"></div>
            <div className="frag frag5"></div>
            <div className="frag frag6"></div>
          </div>
          <div className="img img5">
            <div className="frag frag1"></div>
            <div className="frag frag2"></div>
            <div className="frag frag3"></div>
            <div className="frag frag4"></div>
            <div className="frag frag5"></div>
            <div className="frag frag6"></div>
          </div>
          <div className="img img6">
            <div className="frag frag1"></div>
            <div className="frag frag2"></div>
            <div className="frag frag3"></div>
            <div className="frag frag4"></div>
            <div className="frag frag5"></div>
            <div className="frag frag6"></div>
          </div>
        </div> 
        {/* <div className="side-controls">
          <label htmlFor="slide1"></label>
          <label htmlFor="slide2"></label>
          <label htmlFor="slide3"></label>
          <label htmlFor="slide4"></label>
          <label htmlFor="slide5"></label>
          <label htmlFor="slide6"></label>
        </div>
        <div className="controls">
          <label htmlFor="slide1"></label>
          <label htmlFor="slide2"></label>
          <label htmlFor="slide3"></label>
          <label htmlFor="slide4"></label>
          <label htmlFor="slide5"></label>
          <label htmlFor="slide6"></label>
        </div>
       */}
      </div>
    );
  }
}

export default Swiper;
