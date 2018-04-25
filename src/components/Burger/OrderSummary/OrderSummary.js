import React, { Fragment, Component } from 'react';
import Button from 'components/UI/Button/Button';

class OrderSummary extends Component {
  componentWillUpdate() {
    console.log('summary updating ...');
  }


  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map((key) => {
        return <li key={key}><b>{key}:</b> {this.props.ingredients[key]}</li>
    });
    return (
      <Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p>
          <strong>
            Total Price: {this.props.price.toFixed(2)}
          </strong>
          </p>
        <Button clicked={this.props.purchaseCanceled} btnType={'Danger'}>CANCEL</Button>
        <Button clicked={this.props.purchaseContinued} btnType={'Success'}>CONTINUE</Button>
      </Fragment>
    )
  }
}

export default OrderSummary;