
import React from 'react';
import { IMovieState } from '../redux/reducers/MovieReducer';
import { Table, Switch, Button, Icon, Popconfirm, Input } from 'antd';
import { RouteComponentProps } from 'react-router';
import { IMovie, switchType } from '../services/commonType';
import defaultpic from '../pic/4.png';
import { NavLink } from 'react-router-dom';
import { PaginationConfig } from 'antd/lib/table';
export interface IMovieTable {
    onLoad: () => void
    handleChange: (id: string, type: switchType, nextState: boolean) => void
    handleDelete: (id: string) => Promise<void>
    pageChange: (nextPage: number) => void
    keyChange: (key: string) => void
    handleSearch: (key: string) => void
}
interface IMovieProps extends RouteComponentProps {
    movie: IMovieState
}

export default class MovieTable extends React.Component<IMovieProps & IMovieTable> {
    switchChange(id: string, type: switchType, nextState: boolean) {
        if (this.props.handleChange) {
            this.props.handleChange(id, type, nextState);
        }
    }
    getFilterDropdown() {
        return (
            <div style={{ padding: 8 }}>
                <Input
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                    value={this.props.movie.condition.key}
                    onChange={(e) => {
                        this.props.keyChange(e.target.value);
                    }}
                    onPressEnter={ () => {
                        this.props.handleSearch(this.props.movie.condition.key)
                    }}
                />
                <Button
                    type="primary"
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                    onClick={ () => {
                        this.props.handleSearch(this.props.movie.condition.key)
                    } }
                >
                    搜索
                </Button>
                <Button size="small" style={{ width: 90 }}
                    onClick={ () => {
                        this.props.keyChange('');
                        this.props.handleSearch('');
                    } }
                >
                    重置
                </Button>
            </div>
        )
    }
    private getColumns() {
        return [
            {
                title: '电影封面',
                dataIndex: 'poster',
                render: (poster: string, record: IMovie) => {
                    if (record.poster) {
                        return <img className="default-pic" src={poster} />
                    } else {
                        return <img className="default-pic" src={defaultpic} />
                    }
                }
            },
            {
                title: '电影名', dataIndex: 'name',
                filterDropdown: this.getFilterDropdown(),
                filterIcon: () => {
                    return <Icon type="search" />
                }
            },
            {
                title: '电影类型',
                dataIndex: 'types',
                render: (text: string[]) => {
                    return text.join('，')
                }
            },
            {
                title: '上映地区',
                dataIndex: 'areas',
                render: (text: string[]) => {
                    return text.join('，')
                }
            },
            {
                title: '电影时长',
                dataIndex: 'timeLong',
                render: (time: string) => {
                    return time + '分钟'
                }
            },
            {
                title: '热映',
                dataIndex: 'isHot',
                render: (isHot: boolean, record: IMovie) => {
                    return <Switch checked={isHot} defaultChecked={isHot} onChange={() => {
                        this.switchChange(record._id!, switchType.isHot, !isHot);
                    }} />
                }
            },
            {
                title: '经典',
                dataIndex: 'isClassic',
                render: (isClassic: boolean, record: IMovie) => {
                    return <Switch checked={isClassic} defaultChecked={isClassic} onChange={() => {
                        this.switchChange(record._id!, switchType.isClassic, !isClassic);
                    }} />
                }
            },
            {
                title: '即将上映',
                dataIndex: 'isComming',
                render: (isComming: boolean, record: IMovie) => {
                    return <Switch checked={isComming} defaultChecked={isComming} onChange={() => {
                        this.switchChange(record._id!, switchType.isComming, !isComming);
                    }} />
                }
            },
            {
                title: '操作',
                dataIndex: '_id',
                render: (id: string) => {
                    return (
                        <div>
                            <NavLink to={"/movie/edit/" + id}>
                                <Button type="primary" icon="edit" size="small" className="handle-button">编辑</Button>
                            </NavLink>
                            <Popconfirm title="确定删除？" okText="确认" cancelText="取消" onConfirm={() => {
                                this.props.handleDelete(id);
                            }}>
                                <Button type="primary" icon="rest" size="small" className="handle-button" >删除</Button>
                            </Popconfirm>,

                        </div>
                    )
                }
            }
        ]
    }
    getPagination(): false | PaginationConfig {
        if (this.props.movie.total === 0) {
            return false;
        }
        return {
            current: this.props.movie.condition.page,
            total: this.props.movie.total,
            pageSize: this.props.movie.condition.limit
        }
    }
    render() {

        return (
            <Table
                
                rowKey={'_id'}
                dataSource={this.props.movie.data}
                columns={this.getColumns()}
                pagination={this.getPagination()}
                onChange={(e) => {
                    this.props.pageChange(e.current!);
                }}
            />
        )
    }
    componentDidMount() {

        if (this.props.onLoad) {
            this.props.onLoad();
        }
    }
}

