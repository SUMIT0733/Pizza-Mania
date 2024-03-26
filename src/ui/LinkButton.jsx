import { Link, useNavigate } from "react-router-dom"

function LinkButton({children, to}) {

    const navigate = useNavigate();
    
    // if (to === "-1")
    // return <button onClick={() => navigate(-1)}>&larr; Go back</button>

    return (
        <Link to={to} className="hover:text-blue-900 text-sm text-blue-500 hover:underline">
            {children}
        </Link>
    )
}

export default LinkButton
