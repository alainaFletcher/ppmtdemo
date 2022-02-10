import React from 'react';
import {Route, Redirect} from "react-router-dom";

const SecuredRoute = ({children, security, ...otherProps}) => {
  return(
    <Route {...otherProps}>
      {(security.validToken) ? 
      children : 
      (<Redirect to="/"/>) }
    </Route>
  );
};

export default SecuredRoute;