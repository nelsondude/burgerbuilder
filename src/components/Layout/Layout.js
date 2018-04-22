import classes from './Layout.css';
import React, { Fragment } from 'react';
const layout = (props) => {

    const classes = ['custom', 'orange'].reduce((sum, el) => {return sum + ' ' + el}, '');

    return (
        <Fragment>
            <div>
                Toolbar, Sidedraw, Backgroup
            </div>
            <main className={classes.Content}>
            {props.children}
            </main>
        </Fragment>
    )
};


export default layout;
