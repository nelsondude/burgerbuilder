import React, { Fragment, Component } from 'react';
import Modal from 'components/UI/Modal/Modal';

//use axios instance to show modal rror
const withErrorHandler = (WrappedComponent, axios) => {

  return class extends Component {
    state = {
      error: null,
    };

    componentWillMount() {
      // called before child components are rendered
      // if componentdidmount, then it will not work
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(res => res, err => {
        this.setState({error: err});
      });
    }

    componentWillUnmount() {
      console.log('Un Mount');
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null})
    };

    render() {
      return (
        <Fragment>
          <Modal
            modalClosed={this.errorConfirmedHandler}
            show={this.state.error}>{this.state.error ? this.state.error.message : null}</Modal>
          <WrappedComponent {...this.props}/>
        </Fragment>
      );
    }
  }
};


export default withErrorHandler;