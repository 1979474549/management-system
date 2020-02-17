import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Home } from './Home';
import { AddMovie } from './AddMovie';
import { EditMovie } from './EditMovie';
import  MovieList from './MovieList';

import { Layout, Menu } from 'antd';
const { Header, Sider, Content } = Layout;
export class _Layout extends React.Component {
    render() {
        
        return (
            <div className="container">
                <Layout>
                    <Header>
                        <NavLink to="/">猫眼电影管理系统</NavLink>
                    </Header>
                    <Layout>
                        <Sider>
                            <Menu
                                mode="inline"
                                theme="dark"
                            >
                                <Menu.Item key="1">
                                    <NavLink to="/movie">电影列表</NavLink>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <NavLink to="/movie/add">添加电影</NavLink>
                                </Menu.Item>
                                
                            </Menu>

                        </Sider>
                        <Content className="layout-content">
                            <Route path="/" component={Home} exact={true}></Route>
                            <Route path="/movie/add" component={AddMovie}></Route>
                            <Route path="/movie/edit/:id" component={EditMovie}></Route>
                            <Route path="/movie" component={MovieList} exact={true}></Route>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}