import React from 'react'
import {Link} from "react-router-dom"

function CreateProjectButton() {
    return (
        <>
        <Link to="/addProject" className="btn btn-lg btn-secondary">
            Create a Project
        </Link>
        </>
    )
}

export default CreateProjectButton;