import { Link } from "react-router-dom";

export default function Home() {
    return (<>
    <h1>Welcome to the Languages Exchanges Organiser</h1>
    <p>Where you can organiser your own language exchanges and control who attends</p>
    <Link to="/login">Login</Link>
    <Link to="/signup">Sign Up</Link>
    </>)
}