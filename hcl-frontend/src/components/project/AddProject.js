import React, { useState, useEffect } from 'react';
import {connect} from "react-redux";
import { createProject } from '../../actions/projectActions';
import PropTypes  from 'prop-types';
import classnames from "classnames";

const AddProject = ({createProject, history, errors}) => {
    const INIT_DATA={
        projectName: "",
        projectIdentifier: "",
        description: "",
        startDate: "",
        endDate: "",
    }
    const [currErrors, setCurrErrors] = useState({})
    const [formData, setFormData] = useState(INIT_DATA);
    useEffect(() => {
        if(errors){
            setCurrErrors (errors)
        }
    }, [errors])

    const onChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })    
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const newProject = formData;
        console.log(newProject);

        createProject(newProject, history);
    }
    return (
        <div>
        
            <div className="project">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h5 className="display-4 text-center">Create Project form</h5>
                    <hr />
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className={classnames("form-control form-control-lg ",{
                                    "is-invalid":currErrors.projectName
                                })} 
                                placeholder="Project Name" 
                                name='projectName'  
                                value={formData.projectName}
                                onChange={onChange}
                            />
                            {currErrors.projectName && (
                                <div className="invalid-feedback">{currErrors.projectName}</div>
                            )}

                        </div>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className={classnames("form-control form-control-lg ",{
                                    "is-invalid":currErrors.projectIdentifier
                                })}
                                placeholder="Unique Project ID"
                                name="projectIdentifier"
                                value={formData.projectIdentifier}
                                onChange={onChange}
                            />
                            {currErrors.projectIdentifier && (
                                <div className="invalid-feedback">{currErrors.projectIdentifier}</div>
                            )}                        
                        </div>
                        
                        <div className="form-group">
                            <textarea 
                                className={classnames("form-control form-control-lg ",{
                                    "is-invalid":currErrors.description
                                })}
                                placeholder="Project Description"
                                name="description"
                                value={formData.description}
                                onChange={onChange}
                            ></textarea>
                            {currErrors.description && (
                                <div className="invalid-feedback">{currErrors.description}</div>
                            )}                        
                        </div>
                        <h6>Start Date</h6>
                        <div className="form-group">
                            <input 
                                type="date" 
                                className="form-control form-control-lg" 
                                name="startDate" 
                                value={formData.startDate}
                                onChange={onChange}
                            />
                        </div>
                        <h6>Estimated End Date</h6>
                        <div className="form-group">
                            <input 
                                type="date" 
                                className="form-control form-control-lg" 
                                name="endDate" 
                                value={formData.endDate}    
                                onChange={onChange}
                            />
                        </div>

                        <input type="submit" className="btn btn-primary btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
    </div>

        </div>
    )
}

AddProject.propTypes = {
    createProject : PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(
    mapStateToProps, 
    {createProject}
    )(AddProject);