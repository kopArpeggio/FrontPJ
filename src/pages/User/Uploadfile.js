import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import { Form } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import TestNav from '../../components/TestNav';
import './../../upload.css'


export default function Uploadfile() {

    const [file, setfile] = useState("");
    const [fileName, setFileName] = useState("Upload Boundary File");
    const onChangefile = (value) => {
        setfile(value.target.files[0])

    }

    const Sendfile = () => {
        const data = new FormData();
        data.append("image", file);

        axios.post("http://localhost:3001/testupload", data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        // axios.post('http://localhost:3001/testupload', {
        //     files: file.name7
        // })
        //     .then(function (response) {
        //         console.log(response);
        //     })
    }


    return (
        <div>
            <Form  >
                <h3 className='mb-3'>
                    โปรดอัพโหลดเอกสารตามที่ระบุ
                </h3>
                <Form.Group className="mb-5 text box " style={{ width: "50%" }}>
                    <Form.Label as={Col} style={{ fontSize: "20px" }} className="mb-3">เอกสารที่ 1 </Form.Label>
                    <div className='flex'>
                        <Form.Control type="file" size="lg" accept='.jpg' className='' onChange={(e) => onChangefile(e)} />
                        <Button variant="primary" className='ms-3 ' onClick={Sendfile} >
                            Upload
                        </Button>
                    </div>
                </Form.Group>
                <Form.Group className="mb-5 text box " style={{ width: "50%" }}>
                    <Form.Label as={Col} style={{ fontSize: "20px" }} className="mb-3">เอกสารที่ 2 </Form.Label>
                    <div className='flex ' >
                        <Form.Control type="file" size="lg" accept='.jpg' id="inputGroupFile01" className='' onChange={(e) => onChangefile(e)} disabled />

                        <Button disabled variant="primary" className='ms-3 ' onClick={Sendfile} >
                            Upload
                        </Button>
                    </div>
                    
                </Form.Group>



            </Form>
        </div>
    )
}
