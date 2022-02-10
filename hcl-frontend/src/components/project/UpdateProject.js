import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { getProject, createProject } from '../../actions/projectActions';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from 'classnames';

const UpdateProject = ({getProject, createProject, project, history, errors}) => {
    const {id} = useParams();

    const [currProject, setCurrProject] = useState({})
    const [currErrors, setCurrErrors] = useState({})

    useEffect(() => {
        getProject(id, history);
    }, [])

    useEffect(() => {
        setCurrProject(project)
    }, [project])

    useEffect(() => {
        if(errors){
            setCurrErrors(errors)
        }
    }, [errors])

    useEffect(() => {
        if(errors){
            setCurrErrors (errors)
        }
    }, [errors])

    const onChange = (e) => {
        const {name, value} = e.target;
        setCurrProject({
            ...currProject,
            [name]: value
        })    
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const newProject = currProject;

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
                                value={currProject.projectName}
                                onChange={onChange}
                            />
                            {currErrors.projectName && (
                                <div className="invalid-feedback">{currErrors.projectName}</div>
                            )}

                        </div>
                      
                        <div className="form-group">
                            <textarea 
                                className={classnames("form-control form-control-lg ",{
                                    "is-invalid":currErrors.description
                                })}
                                placeholder="Project Description"
                                name="description"
                                value={currProject.description}
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
                                value={currProject.startDate}
                                onChange={onChange}
                            />
                        </div>
                        <h6>Estimated End Date</h6>
                        <div className="form-group">
                            <input 
                                type="date" 
                                className="form-control form-control-lg" 
                                name="endDate" 
                                value={currProject.endDate}    
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

UpdateProject.propTypes = {
    getProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    project:state.project.project,
    errors:state.errors
})

export default connect(mapStateToProps, {getProject, createProject}) (UpdateProject)