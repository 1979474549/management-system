

import React from 'react';
import { Form, Input, Button, Checkbox, InputNumber, message } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { IMovie } from '../services/commonType';
import { ImgUpload } from './ImgUpload';
import { withRouter, RouteComponentProps } from 'react-router';

interface IAddMovieProps extends RouteComponentProps{
    form: WrappedFormUtils
    onSubmit: (movie: IMovie) => Promise<string>
    movie?: Partial<IMovie>
}
const formItemLayout = {
    labelCol: {
        span: 4
    }, 
    wrapperCol: {
        span: 19,
        offset: 1
    },
};
const TypesOptions = [
    { label: '搞笑', value: '搞笑' },
    { label: '武侠', value: '武侠' },
    { label: '科幻', value: '科幻' },
    { label: '战争', value: '战争' },
    { label: '爱情', value: '爱情' },
    { label: '剧情', value: '剧情' },
    { label: '人性', value: '人性' },
    { label: '动漫', value: '动漫' },
    { label: '奇幻', value: '奇幻' },
];
const AreasOptions = [
    { label: '中国大陆', value: '中国大陆' },
    { label: '中国台湾', value: '中国台湾' },
    { label: '中国香港', value: '中国香港' },
    { label: '美国', value: '美国' },
    { label: '日本', value: '日本' },
    { label: '印度', value: '印度' },
    { label: '韩国', value: '韩国' },
];
const { TextArea } = Input;
class AddMovieForm extends React.Component<IAddMovieProps> {
    handleSubmit(e: any) {
        e.preventDefault();
        this.props.form.validateFields(async errors => {
            if(!errors) {
                const movie = this.props.form.getFieldsValue();
                const result = await this.props.onSubmit(movie as IMovie);
                if(result) {
                    message.error(result)
                } else{
                    message.success('添加成功', 1, () => {
                        this.props.history.push('/movie')
                    })
                }
            }

        })
        
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form {...formItemLayout} style={{ width: '400px' }} onSubmit={this.handleSubmit.bind(this)}>
                <Form.Item label="电影名称">
                    {getFieldDecorator<IMovie>('name', {
                        rules: [
                            {
                                required: true,
                                message: '电影名称不得为空',
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="电影封面">
                    {getFieldDecorator<IMovie>('poster')
                        (
                        <ImgUpload />
                        )
                    }
                </Form.Item>
                <Form.Item label="电影类型">
                    {getFieldDecorator<IMovie>('types', {
                        rules: [
                            {
                                required: true,
                                message: '电影类型至少选一个',
                            }
                        ]
                    })(
                        <Checkbox.Group options={TypesOptions}>
                        </Checkbox.Group>
                    )}
                </Form.Item>
                <Form.Item label="上映地区">
                    {getFieldDecorator<IMovie>('areas', {
                        rules: [
                            {
                                required: true,
                                message: '上映地区至少选一个',
                            }
                        ]
                    })(
                        <Checkbox.Group options={AreasOptions}>
                        </Checkbox.Group>
                    )}
                </Form.Item>
                <Form.Item label="电影时长">
                    {getFieldDecorator<IMovie>('timeLong', {
                        rules: [
                            {
                                required: true,
                                message: '电影时长不得为空',
                            }
                        ]
                    })(<InputNumber min={1} max={1000} />)}
                </Form.Item>
                <Form.Item label="描述">
                    {getFieldDecorator<IMovie>('description', {
                        rules: [
                            {
                                required: true,
                                message: '描述不得为空',
                            }
                        ]
                    })(<TextArea rows={4} />)}
                </Form.Item>
                <Button type="primary" htmlType="submit" > 提交 </Button>
            </Form>
        )
    }

}
type IDefaultValue = {
    [P in Exclude<keyof IMovie, '_id'>]: any
}
const getDefaultValue = (movie: any): IDefaultValue => {
    let obj: any = {};
    for(const key in movie) {
        obj[key] = Form.createFormField({
            value: movie[key]
        })
    }
    return obj;
}

export default withRouter(Form.create<IAddMovieProps>({
    mapPropsToFields: props => {
        if(props.movie) {
            return getDefaultValue(props.movie)
        }
    }
})(AddMovieForm));