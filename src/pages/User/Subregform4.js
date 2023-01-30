import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import axios from 'axios'

function Subregform4({ setcompanyadd, companyadd, jobData, setjobData }) {
    const [company, setcompany] = useState([]);


    const getAddress = async () => {
        try {
            const response = await axios.get('http://localhost:3001/getcompany')
            setcompany(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAddress();

    }, [])

    const onChangedistrict = (value) => {

        setcompanyadd({
            ...companyadd, company: company[value.value].name,
            distri: company[value.value].district,
            amphoe: company[value.value].amphoe,
            province: company[value.value].province,
            subadd: company[value.value].subadd
        })
    }



    const options = [];
    for (var i = 0; i < company.length; i++) {

        var obj = {};
        obj['value'] = i;
        obj['label'] = company[i].name + ' >> ' + company[i].province + ' >> ' + company[i].amphoe + " >> " + company[i].district;
        options.push(obj);
    }

    return (
        <div>
            <Row className="mb-3 mt-5 ">
                <Form.Group as={Col} sm='6' >
                    <Form.Label>ชื่อหัวหน้าหน่วยงาน</Form.Label>
                    <Form.Control placeholder="" value={companyadd.bossname}
                        onChange={(event) =>
                            setcompanyadd({ ...companyadd, bossname: event.target.value })
                        }
                    />
                </Form.Group>
                <Form.Group as={Col} sm='4' >
                    <Form.Label>ตำแหน่ง</Form.Label>
                    <Form.Control placeholder="" value={companyadd.position}
                        onChange={(event) =>
                            setcompanyadd({ ...companyadd, position: event.target.value })
                        }
                    />
                </Form.Group>
                <Form.Group as={Col} sm='2' >
                    <Form.Label>แผนก/ฝ่าย</Form.Label>
                    <Form.Control placeholder="" value={companyadd.department}
                        onChange={(event) =>
                            setcompanyadd({ ...companyadd, department: event.target.value })
                        }
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3 mt-5 ">
                <Form.Group as={Col} sm='8' >
                    <Form.Label>ค้นหาหน่วยงาน</Form.Label>
                    <Select options={options} value={options.value} onChange={(e) => onChangedistrict(e)} />
                </Form.Group>
            </Row>
            <Row className="mb-3 mt-5 ">
                <Form.Group as={Col} sm='8' >
                    <Form.Label>ชื่อหน่วยงาน</Form.Label>
                    <Form.Control placeholder="" value={companyadd.company} disabled />
                </Form.Group>
                <Form.Group as={Col} sm='4' >
                    <Form.Label>บ้านเลขที่</Form.Label>
                    <Form.Control placeholder="" value={companyadd.subadd} disabled />
                </Form.Group>

            </Row>

            <Row className="mb-3 mt-5 ">
                <Row className=" ">
                </Row>
                <Form.Group as={Col} sm='3' >
                    <Form.Label>ตำบล</Form.Label>
                    <Form.Control type="text" disabled value={companyadd.distri} />
                </Form.Group>
                <Form.Group as={Col} sm='3' >
                    <Form.Label>อำเภอ</Form.Label>
                    <Form.Control type="text" disabled value={companyadd.amphoe} />
                </Form.Group>
                <Form.Group as={Col} sm='3' >
                    <Form.Label>จังหวัด</Form.Label>
                    <Form.Control type="text" disabled value={companyadd.province} />
                </Form.Group>

            </Row>
        </div>
    )
}

export default Subregform4