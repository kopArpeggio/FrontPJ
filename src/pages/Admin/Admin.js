import axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import AdminNav from "../../components/AdminNav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faRotate, faXmark } from '@fortawesome/free-solid-svg-icons'



export default function Admin() {

    const [user, setUser] = useState([]);
    const [q, SetQ] = useState("");

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:3001/test')
            setUser(response.data);
        } catch (error) {
            console.log(error);

        }

    };

    const check = <FontAwesomeIcon icon={faCheck} className="correct" />
    const wrong = <FontAwesomeIcon icon={faXmark} className="Wrong" />
    const checking = <FontAwesomeIcon icon={faRotate} className="Checking" />

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height

            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
            },
        },

    };

    const columns = [
        {
            name: "ชื่อ - นามสกุล",
            selector: row => row.username,
            sortable: true,
            center: true,

        },
        {
            name: "สาขาวิชา",
            selector: row => row.role,
            sortable: true,
            center: true,

        },

        {
            name: "แก้ไข",
            center: true,
            cell: row => <button className="btn btn-primary editbutton"
                onClick={() => alert(row.alpha2Code)}>Edit</button>,

        },
        {
            name: "สถานะ",
            center: true,
            cell: row => <div>
                {row.status_id == 2
                    ? check
                    : row.status_id == 1
                        ? wrong
                        : checking

                }

                {/* {role.role == 'Admin' 
            ? (<Admin />) 
            :  role.role =='User'
            ? (<User/>)
            : <User/>
            } */}
            </div>
        }
    ]


    useEffect(() => {
        getUser();
    }, [])

    function Searchtest(rows) {
        return rows.filter((row) =>
            row.username.toLowerCase().indexOf(q) > -1 ||
            row.role.toLowerCase().indexOf(q) > -1
        )
    }




    return (
        <div>
            <AdminNav />
            <Container className="tablecustom ">
                <DataTable
                    customStyles={customStyles}
                    theme="solarized"
                    title="จัดการนักศึกษา"
                    className=" "

                    columns={columns}
                    data={Searchtest(user)}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="80vh"
                    //selectableRows
                    selectableRowsHighlight
                    highlightOnHover

                    subHeader

                    subHeaderComponent={
                        <input
                            type="text"
                            placeholder="ค้นหานักศึกษา"
                            className="w-25 form-control "
                            value={q}
                            onChange={(e) => SetQ(e.target.value)}
                        />}

                    subHeaderAlign="left"

                />
            </Container>

        </div>
    )
}
