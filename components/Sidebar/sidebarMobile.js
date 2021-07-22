import Link from "next/dist/client/link";
import { useState } from "react";
import styles from "../Styles/index.module.css";
import { Drawer } from "antd";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarMobile = ({ pid }) => {
  const [drawerToogle, setDrawerToogle] = useState(false);
  const showDrawer = () => {
    setDrawerToogle(true);
  };

  const onClose = () => {
    setDrawerToogle(false);
  };
  return (
    <div className={styles.sidebarMobile}>
      <button
        className="btn btn-outline-secondary mb-3 mt-2"
        onClick={showDrawer}
        style={{ backgroundColor: "rgb(34, 37, 41)", color: "white" }}
      >
        <FontAwesomeIcon style={{ color: "white" }} icon={faBars} />
      </button>
      <Drawer
        title={
            <img
              src="/images/toolcabinetlogotransparent.png"
              style={{ height: "50px", width: "50px" }}
            />
        }
        placement="left"
        closable={true}
        onClose={onClose}
        visible={drawerToogle}
        key={pid}
        bodyStyle={{ backgroundColor: "rgb(34, 37, 41)", color:"white" }}
        headerStyle={{ backgroundColor: "rgb(34, 37, 41)", border: "none" }}
        footerStyle={{ backgroundColor: "rgb(34, 37, 41)" }}
      >
        <ul style={{listStyleType:"none"}}>
          <li onClick={onClose}>
            <Link href="/profile/[pid]" as={`/profile/${pid}`}>
              <p className={`${styles.sidebarLink}`}>
                Dashboard
              </p>
            </Link>
          </li>
          <li onClick={onClose}>
            <Link
              href="/profile/[pid]/[dash]"
              as={`/profile/${pid}/pendingorders`}
            >
              <p href="#" className="nav-link px-0">
                Pending Orders
              </p>
            </Link>
          </li>
          <li onClick={onClose}>
            <Link
              href="/profile/[pid]/[dash]"
              as={`/profile/${pid}/acceptedorders`}
            >
              <p href="#" className="nav-link px-0">
                Accepted Orders
              </p>
            </Link>
          </li>
          <li onClick={onClose}>
            <Link
              href="/profile/[pid]/[dash]"
              as={`/profile/${pid}/declinedorders`}
            >
              <p href="#" className="nav-link px-0">
                Declined Orders
              </p>
            </Link>
          </li>
          <li onClick={onClose}>
            <Link href="/profile/[pid]/[dash]" as={`/profile/${pid}/post`}>
              <p className="nav-link px-0">
                Post Inventory
              </p>
            </Link>
          </li>
          <li onClick={onClose}>
            <Link href="/profile/[pid]/[dash]" as={`/profile/${pid}/mystores`}>
              <a className="nav-link px-0">
                <span className="d-none d-sm-inline" style={{color:"white"}}>Manage Stores</span>
              </a>
            </Link>
          </li>
        </ul>
      </Drawer>
    </div>
  );
};

export default SidebarMobile;
