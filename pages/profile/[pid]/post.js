import React, { useState, useEffect} from "react"
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const props = {
  name: 'images',
  multiple: true,
  action: 'http://localhost:3000/api/tools',
  onChange(info) {
    const { status } = info.file;
    console.log(info)
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};


const Post = () => {
    const [postData, setPostData] = useState({title: '', description: '', pricePerDay: Number , depositPrice: Number , damagePrice: Number, tags: '', images:Array, ownerId:'', ownerName:''})
    return (
        <div className="container">
            <div className="row">
                <div className="col-4 d-flex justify-content-start">
                    <form>
                        <div className="mb-3">
                        <Dragger {...props} style={{marginBottom:'2em'}}>
                            <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                            </p>
                        </Dragger>
                        {/* <img href={}/> */}
                        </div>
                        <div className="mb-3">
                            <label for="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" aria-describedby="title"/>
                        </div>
                        <div className="mb-3">
                            <label for="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" aria-describedby="description"/>
                        </div>
                        <div className="mb-3">
                            <label for="ppd" className="form-label">Price/Day</label>
                            <input type="number" className="form-control" id="ppd" aria-describedby="ppd"/>
                        </div>
                        <div className="mb-3">
                            <label for="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" aria-describedby="title"/>
                        </div>
                    </form>
                </div>
                <div className="col-8 d-flex justify-content-center">
                    tools here
                </div>
            </div>
        </div>
    )
  }
  
export default Post