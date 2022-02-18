import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

const ProtectedRoute = (props) => {
    
    const {component:Component,...rest} = props
    var token = localStorage.getItem('token');
    // console.log('props.authenticated1',props,rest,token,Component)

    return (
        <Route
        {...rest}
            render = {() => {
                // console.log('props.authenticated2',props)
                if(token){
                    return <Component {...props} />
                }else{
                    return <Redirect to={
                        {
                        pathname:"/",
                        from: props.location
                    }
                 } />
                }
            }

            }
        />
    )

}

export default ProtectedRoute;

// const mapStateToProps = state => {
//     return {
//       // authenticated: state.auth.token !== null,
//       authenticated: state.auth.token
//     };
//   };

// export default connect(
//       mapStateToProps
//     )(ProtectedRoute)