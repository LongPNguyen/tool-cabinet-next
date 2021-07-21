import NavBar from '../Navbar/navbar';
import React from 'react';
import Head from 'next/dist/next-server/lib/head';

const Layout = (props) => (
      <div className="Layout">
        <NavBar />
        <Head>
            <title>Tool Cabinet</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            //  bootstrap CDN
            <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
            crossOrigin="anonymous" 
            />
        </Head>
         <div className="Content" style={{height:"100vh"}}>
          {props.children}
         </div>
      </div>
)

export default Layout;