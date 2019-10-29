import React, { Component } from "react";
import { Layout, Icon } from "antd";
import "antd/dist/antd.css";
const { Header } = Layout;
import "./header.less";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <Header className="headBox">
        <Icon
          className="trigger"
          type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
          onClick={this.props.toggle}
        />
      </Header>
    );
  }
}
