import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/securityActions';
import PropTypes from "prop-types";
import classnames from 'classnames';

const Login = ({login, errors, security, history}) => {
    const initState = {
        username: "",
        password: ""
    }

    useEffect(()=>{
        if(security.validToken){
            history.push("/dashboard")
        }
    }, [])

    const [formData, setFormData] = useState(initState);
    const [currErrors, setCurrErrors] = useState({});

    useEffect(() => {
        if(errors){
            setCurrErrors (errors)
        }
    }, [errors])

    const onChange = e => {
        const {name, value} = e.target;
        const updatedForm = {
            ...formData,
            [name]:value
        }
        setFormData(updatedForm);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        login(formData);
    }

    useEffect(() => {
        if(security.validToken){
            history.push("/dashboard");
        }
    }, [security])

  return (
    <div className="login">
    <div className="container">
        <div className="row">
            <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <form onSubmit={onSubmit}>
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
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
            </div>
        </div>
    </div>
</div>
  );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(
    mapStateToProps, 
    {login}
)(Login);
