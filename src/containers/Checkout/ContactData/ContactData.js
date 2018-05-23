import React, {Component} from 'react';
import Button from 'components/UI/Button/Button';
import classes from './ContactData.css';
import axios from 'axios-orders';
import Spinner from 'components/UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients);


    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
        this.setState({loading: false});
        this.props.history.push('/')
      })
      .catch(err => {
        console.log(err);
        this.setState({loading: false});
      })
  };

  render() {
    let form = (
      <form action="">
        <input type="text" name="name" placeholder={"Your Name"}/>
        <input type="email" name="email" placeholder={"Your Email"}/>
        <input type="text" name="street" placeholder={"Street"}/>
        <input type="text" name="postal" placeholder={"Postal Code"}/>
        <Button btnType={"Success"} clicked={this.orderHandler}>Order</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner/>
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}


export default withRouter(ContactData);