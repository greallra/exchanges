import { Link } from "react-router-dom";

export default function Footer() {
    return ( <div>
        <span style={{marginRight: '10px'}}>Don't have an account?</span>
        <Link to="/signup">Sign Up</Link>
        </div> )
}