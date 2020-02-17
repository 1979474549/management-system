import React from 'react';
import { Upload, Icon, message, Modal } from 'antd';
import { UploadFile, RcCustomRequestOptions } from 'antd/lib/upload/interface';

export interface IProps {
    value?: string
    onChange?: (newPoster: string) => void
}
export interface IState {
    showModal: boolean
}

export class ImgUpload extends React.Component<IProps, IState> {
    state: IState = {
        showModal: false
    }
    private getFileList(): UploadFile<any>[] {
        if (this.props.value) {
            return [
                {
                    uid: this.props.value,
                    name: this.props.value,
                    url: this.props.value
                }
            ]
        }
        return [];
    }
    async handleUpload(params: RcCustomRequestOptions) {
        const formDate = new FormData();
        formDate.append(params.filename, params.file);
        const request = new Request(params.action, {
            method: "post",
            body: formDate
        })
        const resp = await fetch(request).then(resp => resp.json());
        if (resp.code !== 1) {
            message.error('文件错误')
        } else {
            if (this.props.onChange) {

                this.props.onChange(resp.data)
            }
        }
    }
    render() {
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div>
                <Upload
                    action="/upload"
                    listType="picture-card"
                    fileList={this.getFileList()}
                    method="post"
                    name="myfile"
                    accept=".jpg,.png,.gif"
                    customRequest={(e) => {
                        this.handleUpload(e);
                    }}
                    onPreview={() => {
                        this.setState({
                            showModal: true
                        })
                    }}
                    onRemove={() => {
                        if (this.props.onChange) this.props.onChange('');
                    }}
                >
                    {this.props.value ? null : uploadButton}
                </Upload>
                <Modal footer={null} visible={this.state.showModal} onCancel={() => {
                    this.setState({
                        showModal: false
                    })
                }}>
                    <img alt="" style={{ width: '100%' }} src={this.props.value} />
                </Modal>
            </div>
        )
    }
}