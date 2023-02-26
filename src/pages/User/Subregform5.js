import React, { useMemo } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Subregform5({ submitRef, formData }) {
  const MyButton = () => {
    <Button type="submit" ref={submitRef} style={{ display: "none" }}>
      confirm
    </Button>;
  };

  return (
    <div>
      <Card className="text-center">
        <Card.Header>
          <h3>โปรดตรวจสอบข้อมูลของท่าน</h3>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            ชื่อจริง : {formData.firstname} นามสกุล : {formData.lastname}
          </Card.Title>
          <Card.Title>
            น้ำหนัก : {formData.weight} ส่วนสูง : {formData.height}
          </Card.Title>
          <Card.Title>
            เบอร์โทรศัพท์ : {formData.phoneNum} E-mail : {formData.email}
          </Card.Title>
          <Card.Title>
            ชื่อ - สกุลบิดา : {formData.fathername} อาชีพ : {formData.fatherjob}
          </Card.Title>
          <Card.Title>
            ชื่อ - สกุลมารดา : {formData.mothername} E-อาชีพ :{" "}
            {formData.motherjob}
          </Card.Title>
        </Card.Body>
        <Card.Footer className="text-muted"></Card.Footer>
      </Card>
      <MyButton />
    </div>
  );
}
