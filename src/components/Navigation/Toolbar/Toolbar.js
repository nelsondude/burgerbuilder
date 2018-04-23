import React from 'react';
import classes from './Toolbar.css';
import Logo from 'components/Navigation/Logo/Logo';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div>MENU</div>
    <Logo />
    <nav>
      {/*<ul>...</ul>s*/}
    </nav>
  </header>
);


export default toolbar;