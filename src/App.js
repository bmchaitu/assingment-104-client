import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from './components/pages/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/pages/Dashboard';
import {connect} from 'react-redux';
import { loadUser } from "./actions/userActions";

function SimpleContainer({user, loadUser}) {
  React.useEffect(()=>{
    const token = localStorage.getItem('auth-token');
    console.log(token);
    if(token)
      loadUser(token);
  },[]);
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/register" component={SignUp} />
      <Route exact path="/dashboard" component={user.loggedIn ? Dashboard : SignUp }/>
    </Switch>
  );
}

function mapStateToProps(state){
  return{
    user : state.user
  }
}
export default connect(mapStateToProps,{loadUser})(SimpleContainer);