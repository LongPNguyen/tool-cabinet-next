import Link from "next/link";

export default function FooterNav() {
  return (
    <nav>
      <div className="container">
        <div className="row">
          <div
            className="col-12 py-3"
            style={{ borderBottom: "5px solid orange" }}
          >
            <div className="row">
              <div className="col-lg-3 pt-3">
                <Link className="navbar-brand" href="/">
                  <img
                    src="/images/toolcabinetlogo.png"
                    width="100px"
                    style={{ cursor: "pointer" }}
                    align="start"
                  />
                </Link>
              </div>
              <div className="col d-flex align-items-end justify-content-end px-5">
                <a href="https://www.facebook.com/thetoolcabinet">
                  <img
                    style={{ color: "white", width: "2em", height: "auto" }}
                    src="/images/facebook.png"
                  />
                </a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a href="https://www.instagram.com/toolcabinet">
                  <img
                    style={{ color: "white", width: "2em", height: "auto" }}
                    src="/images/instagram.png"
                  />
                </a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a href="mailto:support@toolcabinet.co" className="btn btn-secondary btn-xl">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
