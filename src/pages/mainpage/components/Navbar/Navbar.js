import React from 'react';
import styles from './Navbar.scss';
import CSSMoudules from 'react-css-modules';
const NavBar = () => (
  <div styleName="nav-bar">
    <div styleName="logo">Life Is Short<i className="fa fa-bars" /></div>
    <div styleName="select-container">
      <div>首页</div>
      <div>文章</div>
      <div>实验</div>
    </div>
  </div>);
export default CSSMoudules(NavBar, styles);
