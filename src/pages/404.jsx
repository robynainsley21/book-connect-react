import { Link } from "react-router-dom"

const ErrorPage = () => {

    return(
       
        <div className="errorPage">
            <p>Oops! There seems to be an error. Go back <Link to="/">home</Link>.</p>
        </div>
    )
}

export default ErrorPage;