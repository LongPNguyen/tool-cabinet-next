import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/client";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [session] = useSession();
  const router = useRouter();
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("/api/users/accountStatus", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setData(data.data);
        // Throw error with status code in case Fetch API req failed
        if (!res.ok) {
          throw new Error(res.status);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [session]);

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        router.pathname !== "/" && router.pathname !== "/tools/[id]"
          ? "bg-dark"
          : ""
      }`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          <img
            src={
              router.pathname !== "/" && router.pathname !== "/tools/[id]"
                ? "/images/toolcabinetlogotransparent.png"
                : "/images/toolcabinetlogo.jpg"
            }
            width="50px"
            height="50px"
            style={{ cursor: "pointer" }}
          />
        </Link>
        <div className="d-flex align-items-end flex-column">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="true"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <FontAwesomeIcon
                style={
                  router.pathname !== "/" && router.pathname !== "/tools/[id]"
                    ? { color: "white" }
                    : { color: "black" }
                }
                icon={faBars}
              />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                {!session && (
                  <Link href="/signin/chooseAccount">
                    <a className="btn btn-primary" href="">
                      Sign Up
                    </a>
                  </Link>
                )}
              </li>
              &nbsp;
              <li className="nav-item">
                {!session && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => signIn()}
                  >
                    Sign In
                  </button>
                )}
              </li>
              <li>
                {session && (
                  <div>
                    <div className="dropdown">
                      <button
                        className="btn btn-primary dropdown-toggle"
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          style={{
                            width: "25px",
                            height: "25px",
                            marginRight: ".5em",
                            borderRadius: "50%",
                            backgroundColor: "white",
                          }}
                          src={
                            session.user.image ||
                            "https://img.icons8.com/plumpy/48/000000/test-account.png"
                          }
                        />
                        {session.user.name
                          ? `Hello, ${session.user.name}`
                          : "Hello!"}{" "}
                        <i className="fas fa-chevron-down"></i>
                      </button>

                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuLink"
                        style={{ marginRight: "5em" }}
                      >
                        {data ? (
                          <li>
                            <Link
                              href="/profile/[pid]"
                              as={`/profile/${session.user.name}`}
                            >
                              <a className="dropdown-item">Profile</a>
                            </Link>
                          </li>
                        ) : (
                          <li>
                            <Link
                              href="/profile/user/[pid]"
                              as={`/profile/user/${session.user.name}`}
                            >
                              <a className="dropdown-item">Profile</a>
                            </Link>
                          </li>
                        )}
                        <li>
                          <a
                            className="dropdown-item"
                            href="/"
                            onClick={() => signOut()}
                          >
                            Log out
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
