import React from 'react';
import { ImgUpload } from '../components/ImgUpload';
export class Home extends React.Component {
    state = {
        img: ''
    }
    render() {
        return (
            <h1>电影首页</h1>
        )
    }
}