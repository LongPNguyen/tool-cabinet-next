import Link from "next/dist/client/link";
import styles from "../Styles/index.module.css"

export default function Sidebar({ pid }) {
  return (
    <div className={`col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark ${styles.sidebar}`}>
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li>
            <Link href="/profile/[pid]" as={`/profile/${pid}`}>
              <a>
                <span className="d-none d-sm-inline" style={{color:"white"}}>Dashboard</span>
              </a>
            </Link>
          </li>
          <li>
            <Link
              href="/profile/[pid]/[dash]"
              as={`/profile/${pid}/pendingorders`}
            >
              <a href="#" className="nav-link px-0">
                {" "}
                <span className="d-none d-sm-inline" style={{color:"white"}}>Pending Orders</span>
              </a>
            </Link>
          </li>
          <li>
            <Link
              href="/profile/[pid]/[dash]"
              as={`/profile/${pid}/acceptedorders`}
            >
              <a href="#" className="nav-link px-0">
                {" "}
                <span className="d-none d-sm-inline" style={{color:"white"}}>Accepted Orders</span>
              </a>
            </Link>
          </li>
          <li>
            <Link
              href="/profile/[pid]/[dash]"
              as={`/profile/${pid}/declinedorders`}
            >
              <a href="#" className="nav-link px-0">
                {" "}
                <span className="d-none d-sm-inline" style={{color:"white"}}>Declined Orders</span>
              </a>
            </Link>
          </li>
          <li className="w-100">
            <Link href="/profile/[pid]/[dash]" as={`/profile/${pid}/post`}>
              <a className="nav-link px-0">
                <span className="d-none d-sm-inline" style={{color:"white"}}>Post Inventory</span>
              </a>
            </Link>
          </li>
          <li className="w-100">
            <Link href="/profile/[pid]/[dash]" as={`/profile/${pid}/mystores`}>
              <a className="nav-link px-0">
                <span className="d-none d-sm-inline" style={{color:"white"}}>Manage Stores</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
