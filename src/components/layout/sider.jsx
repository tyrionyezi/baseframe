import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
const { Sider } = Layout;
const { SubMenu } = Menu;
import "./sider.less";
export default class BaseContianer extends Component {
  constructor(props) {
    super(props);
  }

  // 递归菜单
  renderMenu = (arr = [], level) => {
    console.log(level, "ggggg");
    return arr.map((item, index) => {
      //   console.log(level, "ggggg");
      if (item.children) {
        return (
          <SubMenu
            key={`${level}${index + 1}`}
            title={
              <span>
                <Icon type="user" />
                <span className="nav-text">{item.title}</span>
              </span>
            }
          >
            {this.renderMenu(item.children, `${level}${index + 1}-`)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={`${level}${index + 1}-${index + 1}`}>
            <Icon type="user" />
            <span className="nav-text">{item.title}</span>
          </Menu.Item>
        );
      }
    });
  };

  render() {
    let data = [
      {
        icon: "",
        title: "订单管理",
        path: "",
        children: [
          {
            icon: "",
            title: "手机订单",
            path: ""
          },
          {
            icon: "",
            title: "电器订单",
            path: ""
          }
        ]
      },
      {
        icon: "",
        title: "菜单管理",
        path: "",
        children: [
          {
            icon: "",
            title: "菜单权限",
            path: ""
          },
          {
            icon: "",
            title: "菜单数据",
            path: "",
            children: [
              {
                icon: "",
                title: "手机订单",
                path: ""
              },
              {
                icon: "",
                title: "电器订单",
                path: ""
              }
            ]
          }
        ]
      }
    ];
    return (
      <Sider
        className="siderBox"
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
      >
        <div className="logo">
          <Icon type="github" />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
          {this.renderMenu(data, "")}
        </Menu>
      </Sider>
    );
  }
}
