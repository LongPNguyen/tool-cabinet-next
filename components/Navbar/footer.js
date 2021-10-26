import Link from "next/link";

export default function FooterNav() {
  return (
    <nav>
      <div className="container">
        <div className="row">
          <div
            className="col-12 py-3"
          >
            <div className="row pb-3">
              <div className="col" style={{ borderBottom: "5px solid orange" }} align="center">
                <Link className="navbar-brand" href="/">
                  <h2 style={{color: 'white'}}>
                    Tool <img src="/images/tclogo.png" width="50px" style={{ cursor: "pointer"}} align="start" className="mb-3"/> Cabinet
                  </h2>
                </Link>
              </div>
            </div>
            <div className="row" align="center">
              <div className="col" style={{borderBottom:"1px dashed #f7b42c "}}>
                <h4 style={{color: 'white'}}>SOCIAL</h4>
                <a href="https://www.facebook.com/thetoolcabinet">
                  <p><img style={{ color: "white", width: "2em", height: "auto", marginBottom:'5px' }} src="/images/f_logo_RGB-Blue_100.png"/> <span style={{color:"white"}}>Follow us on Facebook</span></p>
                </a>
                <a href="https://www.instagram.com/toolcabinet">
                  <p><img style={{ color: "white", width: "2em", height: "auto", marginBottom:'5px' }} src="/images/Instagram_Glyph_Gradient_RGB.png"/> <span style={{color:"white"}}>Follow us on Instagram</span></p>
                </a>
                <a href="mailto:support@toolcabinet.co" className="btn btn-secondary btn-xl" style={{marginBottom:'20px'}}>Contact Us</a>
              </div>
              {/* <div className="col-lg-4 col-md-12" style={{borderBottom:"1px dashed #f7b42c "}}>
                <h4 style={{color: 'white'}}>EXPLORE</h4>
                <a href="https://www.facebook.com/thetoolcabinet">
                  <p><img style={{ color: "white", width: "2em", height: "auto", marginBottom:'5px' }} src="/images/f_logo_RGB-Blue_100.png"/> <span style={{color:"white"}}>Follow us on Facebook</span></p>
                </a>
                <a href="https://www.instagram.com/toolcabinet">
                  <p><img style={{ color: "white", width: "2em", height: "auto", marginBottom:'5px' }} src="/images/Instagram_Glyph_Gradient_RGB.png"/> <span style={{color:"white"}}>Follow us on Facebook</span></p>
                </a>
                <a href="mailto:support@toolcabinet.co" className="btn btn-secondary btn-xl" style={{marginBottom:'20px'}}>Contact Us</a>
              </div>
              <div className="col-lg-4 col-md-12" style={{borderBottom:"1px dashed #f7b42c "}}>
                <h4 style={{color: 'white'}}>SOCIAL</h4>
                <a href="https://www.facebook.com/thetoolcabinet">
                  <p><img style={{ color: "white", width: "2em", height: "auto", marginBottom:'5px' }} src="/images/f_logo_RGB-Blue_100.png"/> <span style={{color:"white"}}>Follow us on Facebook</span></p>
                </a>
                <a href="https://www.instagram.com/toolcabinet">
                  <p><img style={{ color: "white", width: "2em", height: "auto", marginBottom:'5px' }} src="/images/Instagram_Glyph_Gradient_RGB.png"/> <span style={{color:"white"}}>Follow us on Facebook</span></p>
                </a>
                <a href="mailto:support@toolcabinet.co" className="btn btn-secondary btn-xl" style={{marginBottom:'20px'}}>Contact Us</a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
