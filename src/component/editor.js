import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { useParams } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser';
import MyUploadAdapter from './MyUploadAdaptor'
import '../css/editor.css'
import '../css/main.css'

import { Button } from 'reactstrap';
import axios from 'axios';

const custom_config = {
    extraPlugins: [MyCustomUploadAdapterPlugin]
}

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader)
    }
}


export const Editor = () => {

    let { contentId } = useParams(0)
    const [contents, setContents] = useState({})
    const [contentValue, setContentValue] = useState('')

    useEffect( async () => {
        await axios.get(`http://admin.kodmu.com:4000/admin/blogs?id=${contentId}`)
            .then(res => {
                console.log(res.data[0])
                setContents(res.data[0])
            })
    }, [])

    function edit() {

        let params = {
            id: contents.id,
            title: contents.title,
            img: contents.img,
            content_value: contentValue
        }

        console.log(params)

        let headers = {
            'Content-Type': 'application/json',
            'authorization': `${localStorage.getItem('token')}`
        }
        axios.post(`http://admin.kodmu.com:4000/admin/blogs/editBlog`, params, headers)
            .then(res => {
                console.log(res.data)
                window.location.href = `/WebList`;
            }).catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <div className="content-containner">
                <div className="card-header ">Content view</div>
                <div className="card-body">{ReactHtmlParser(contents.content_value)}</div>
                <div className="card-footer"></div>
            </div>

            <div className="content-containner margin-editor">
                <div className="card-header ">Content Editor</div>
                <div className="editor-tools">
                    <CKEditor
                        editor={InlineEditor}
                        data={contents.content_value}
                        onReady={editor => {
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setContentValue(data)
                        }}
                        config={custom_config}
                        onBlur={(event, editor) => {
                        }}
                        onFocus={(event, editor) => {
                        }}
                    />
                </div>
                <div className="card-footer">
                    <Button onClick={edit}>UPDATE</Button>
                </div>
            </div>
        </>
    )
}

export default Editor;