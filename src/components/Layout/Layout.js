import classes from './Layout.css';
import React, { Fragment } from 'react';
import Toolbar from 'components/Navigation/Toolbar/Toolbar';
import SideDrawer from 'components/Navigation/SideDrawer/SideDrawer';

const layout = (props) => {

    return (
        <Fragment>
            <SideDrawer/>
            <Toolbar></Toolbar>
            <main className={classes.Content}>
            {props.children}
            </main>
        </Fragment>
    )
};


export default layout;
