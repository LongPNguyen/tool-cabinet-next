import NavBar from "../Navbar/navbar";
import React from "react";
import Head from "next/head";
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
        backgroundColor: "#f7b42c",
        backgroundImage: "linear-gradient(315deg,#414141 74%,  #f7b75e 0%)"

      }}
    >
      <FooterNav />
    </Footer>
  </Layout>
);

export default LayoutTemplate;
