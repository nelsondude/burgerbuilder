import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { withRouter } from 'react-router-dom';


const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((key) => {
      return [...Array(props.ingredients[key])].map((_, i) => (
        <BurgerIngredient key={key + i} type={key}/>
      ))
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients</p>
  }

  const style = [classes.Burger, ''].reduce((sum, el) => sum + ' ' + el, '');
  return (
    <div className={style}>
      <BurgerIngredient type={'bread-top'}/>
      {transformedIngredients}
      <BurgerIngredient type={'bread-bottom'}/>
    </div>
  );
};

export default withRouter(burger);