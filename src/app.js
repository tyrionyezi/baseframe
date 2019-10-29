import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import "antd/dist/antd.css";
import LeftSider from "./components/layout/sider";
import TopHeader from "./components/layout/header";
const { Header, Content, Footer, Sider } = Layout;

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    collapsed: false
  };

  toggle = () => {
    console.log("hehehe");
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Layout style={{ height: "100%" }}>
        <LeftSider collapsed={this.state.collapsed} />
        <Layout>
          <TopHeader collapsed={this.state.collapsed} toggle={this.toggle} />

          <Content
            style={{
              margin: "15px 15px 0",
              height: "100%",
              overflow: "initial"
            }}
          ></Content>
        </Layout>
      </Layout>
    );
  }
}
