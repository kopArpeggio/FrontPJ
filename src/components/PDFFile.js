import React from 'react';
import { Page, Text, Image, Document, StyleSheet, Font } from "@react-pdf/renderer";
import Sarabun from "../font/Sarabun-Regular.ttf";

const Br = () => "\n";
Font.register({ family: 'Sarabun', src: Sarabun, format: "truetype" });
const styles = StyleSheet.create({
    page: {
        fontFamily: 'Sarabun',
        fontSize: "12"
    },
    font: {
    },
    boldExample: {
        fontWeight: "bold",

    },
    center: {
        fontWeight: "bold",
        textAlign: 'center'
    }
});

const PDFFile = () => {
    return (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.center}>

                    ใบสมัครโครงการสหกิจศึกษา <Br /> <br></br>
                    มหาวิทยาลัยราชภัฏนครราชสีมา <Br /> <br></br>


                </Text>
                <Text>
                        ส่วนที่ 1 ข้อมูลนักศึกษา <Br />
                    
                    1. นาย/นางสาว ชื่อ สกุล.........................................................................

                </Text>
            </Page>
        </Document>
    )
};
export default PDFFile