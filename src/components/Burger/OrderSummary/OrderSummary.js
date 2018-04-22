import React, { Fragment } from 'react';
import Button from 'components/UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map((key) => {
      return <li key={key}><b>{key}:</b> {props.ingredients[key]}</li>
  });
  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <Button clicked={props.purchaseCanceled} btnType={'Danger'}>CANCEL</Button>
      <Button clicked={props.purchaseContinued} btnType={'Success'}>CONTINUE</Button>
    </Fragment>
  )
};

export default orderSummary;