import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { createNewUser } from '../../actions/securityActions';
import PropTypes from "prop-types";
import classnames from 'classnames';

const Register = ({createNewUser, errors, history, security}) => {
    useEffect(()=>{
        if(security.validToken){
            history.push("/dashboard")
        }
    }, [])
    const initState = {
        username: "",
        fullName: "",
        password: "",
        confirmPassword: ""
    }

    const [formData, setFormData] = useState(initState);
    const [currErrors, setCurrErrors] = useState({});

    useEffect(() => {
        if(errors){
            setCurrErrors (errors)
        }
    }, [errors])

    const onSubmit = (e) => {
        e.preventDefault();
        createNewUser(formData, history);
    }

    const onChange = e => {
        const {name, value} = e.target;
        const updatedForm = {
            ...formData,
            [name]:value
        }
        setFormData(updatedForm);
    }

  return (
    <div className="register">
    <div className="container">
        <div className="row">
            <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your Account</p>
                <form action="create-profile.html" onSubmit={onSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className={classnames("form-control form-control-lg ",{
                                    "is-invalid":currErrors.fullName
                            })} 
                            placeholder="Name" 
                            name="fullName" 
                            value={formData.fullName}
                            onChange={onChange}
                        />
                        {currErrors.fullName && (
                                <div className="invalid-feedback">{currErrors.fullName}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            className={classnames("form-control form-control-lg ",{
                                    "is-invalid":currErrors.username
                            })}  
                            placeholder="Email Address" 
                            name="username" 
                            value={formData.username}
                            onChange={onChange}
                        />
                        {currErrors.username && (
                                <div className="invalid-feedback">{currErrors.username}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className={classnames("form-control form-control-lg ",{
                                    "is-invalid":currErrors.password
                            })} placeholder="Password" 
                            name="password"
                            value={formData.password}
                            onChange={onChange}
                        />
                        {currErrors.password && (
                                <div className="invalid-feedback">{currErrors.password}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className={classnames("form-control form-control-lg ",{
                                    "is-invalid":currErrors.confirmPassword
                            })} 
                            placeholder="Confirm Password"
                            name="confirmPassword" 
                            value={formData.confirmPassword}
                            onChange={onChange}
                        />
                        {currErrors.confirmPassword && (
                                <div className="invalid-feedback">{currErrors.confirmPassword}</div>
                        )}
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
            </div>
        </div>
    </div>
</div>
  );
};

Register.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(
    mapStateToProps, 
    {createNewUser}
)(Register);
