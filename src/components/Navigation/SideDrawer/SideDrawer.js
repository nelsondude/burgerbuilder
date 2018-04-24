import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';

const sideDrawer = (props) => {
//  css classes here

  return (
    <div className={classes.SideDrawer}>
      <Logo/>
      <nav>
        <NavigationItems></NavigationItems>
      </nav>
    </div>
  );
};

export default sideDrawer;