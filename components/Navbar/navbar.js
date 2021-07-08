import Link from 'next/link';
import SignUp from '../auth/signup';
import { useRouter } from 'next/router'

export default function NavBar() {
  const router = useRouter()
  const { pid } = router.query
  return (
    <>
<nav className={`navbar navbar-expand-lg ${pid ? 'bg-dark' : ''}`}>
  <div className="container-fluid">
    <Link className="navbar-brand" href="/"><img src={pid ? "/images/toolcabinetlogotransparent.png" : "/images/toolcabinetlogo.jpg" } width="50px" height="50px" style={{cursor:'pointer'}}/></Link>
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