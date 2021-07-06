import Link from 'next/link';
import Head from 'next/head';
import SignUp from '../auth/signup';

export default function NavBar() {
  return (
    <>
<nav className="navbar navbar-expand-lg">
  <div className="container-fluid">
    <a className="navbar-brand" href="#"><img src="/images/toolcabinetlogo.jpg" width="100px" height="100px"/></a>
    <div className="d-flex align-items-end flex-column">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
            <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item">
            <SignUp/>
            </li>
        </ul>
        </div>
    </div>
  </div>
</nav>
    </>
  )
}