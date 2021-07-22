import NavBar from "../Navbar/navbar";
import React from "react";
import Head from "next/dist/next-server/lib/head";
import FooterNav from "../Navbar/footer";
import { Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

const LayoutTemplate = (props) => (
  <Layout style={{ backgroundColor: "white" }}>
    <NavBar />
    <Head>
      <title>Tool Cabinet</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      // bootstrap CDN
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
        crossOrigin="anonymous"
      />
    </Head>
    <Content style={{ minHeight: "calc(100vh - 40px)" }}>
      {props.children}
    </Content>
    <Footer
      style={{
        minHeight: "25vh",
        backgroundImage: "url(/images/footerbanner.png)",
      }}
    >
      <FooterNav />
    </Footer>
  </Layout>
);

export default LayoutTemplate;
