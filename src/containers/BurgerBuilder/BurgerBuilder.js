import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from 'axios-orders';
import Spinner from 'components/UI/Spinner/Spinner';
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //
  //   }
  // }
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios.get('https://burger-builder-e47ff.firebaseio.com/ingredients.json')
      .then(res => {
        this.setState({
          ingredients: res.data,
        })
      })
      .catch(err => {
        this.setState({error: true});
      })
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(key => (
        ingredients[key]
      ))
      .reduce((sum, val) => sum + val, 1);
    this.setState({purchasable: sum > 0})
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = oldCount + 1;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount === 0) return;

    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = oldCount - 1;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients)
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  };

  purchaseContinueHandler = () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Alex Nelson',
        address: {
          street: 'Citadel',
          zipCode: '12321',
          country: 'England'
        },
        email: 'alexn1336@gmail.com'
      },
      deliveryMethod: 'fastest'
    };

    this.setState({loading: true});
    axios.post('/orders.json', order)
      .then(res => {
        console.log(res);
        this.setState({loading: false, purchasing: false});
      })
      .catch(err => {
        console.log(err);
        this.setState({loading: false, purchasing: false});
      })
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredient's cant be loaded </p> : <Spinner/>;

    if (this.state.ingredients) {
      orderSummary = <OrderSummary
        price={this.state.totalPrice}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        ingredients={this.state.ingredients} />

      burger = (
          <Fragment>


            <Burger ingredients={this.state.ingredients} />
            <BuildControls
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}/>
          </Fragment>
        );
    }
    if (this.state.loading) {
      orderSummary = <Spinner/>
    }

    return (
      <Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);