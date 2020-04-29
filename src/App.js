import React, { Component, useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import './App.scss';

import Navbar from './components/navbar/navbar.component'
import Homepage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component'

import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils'
import {setCurrentUser} from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selector';
import {selectCollectionForPreview} from './redux/shop/shop.selectors'

class App extends Component {

  unsubscribeFromAuth = null;

  componentDidMount = () => {

    const {setCurrentUser, collectionsArray} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // calling 'snapshot' allows us to see if the document exists, and receive ID
        // attaching the .data() method returns a full JSON object with the documents data

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            })
        })}
      // user will be set to null
      setCurrentUser(userAuth);
      addCollectionAndDocuments('collections', collectionsArray);
    })
  }

  // Must unmount to avoid any memory leaks in subscription
  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
          <Navbar/>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route path = '/shop' component = {ShopPage} />
            <Route exact path = '/checkout' component = {CheckoutPage} />
            <Route exact path = '/login' render = {() => this.props.currentUser ? 
                (<Redirect to = '/' />) : 
                (<SignInAndSignUpPage />)} />
          </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionForPreview
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

// connect takes in mapStateToProps and mapDispatchToProps as parameters
// pass null when you dont need to mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(App);
