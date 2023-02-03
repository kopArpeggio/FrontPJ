import React, { useEffect, useState } from "react";
import PDFFile from "../components/PDFFile";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { getCoordinatesFromGoogleMapURL } from "../utils/utils";
import { Button } from "react-bootstrap";
import GoogleMapReact from "google-map-react";
import axios from "axios";
import { setupAxios } from "../axios";
import NewNav from "../components/NewNav";
import TestNav from "../components/TestNav";
import Regform from "./User/Regform";
import BasepageAdmin from "./Admin/BasepageAdmin";
import { Route, Routes } from "react-router-dom";
import Admin from "./Admin/Admin";

export default function ApplePage() {
  const [latlong, setLatlong] = useState("");
  const [user, setUser] = useState([]);
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const map = (url) => {
    setLatlong(getCoordinatesFromGoogleMapURL(url));
    console.log(latlong);
  };
  const api = "http://localhost:3001/api/";
  var url;
  // axios.defaults.headers.Authorization = `Bearer ${token}`;
  async function getUser() {
    try {
      await axios.get(`${api}`).then(function (res) {
        if (res.data.data.student) {
          setUser(res.data.data.student);
          setAddress(res.data.data.student.Address);
          setRole(res.data.data.Role);
        }
        if (res.data.data.teacher) {
          setUser(res.data.data.teacher);
          setRole(res.data.data.Role);
        }
        if (res.data.data.workplace) {
          setUser(res.data.data.workplace);
          setRole(res.data.data.Role);
        }

        console.log(res.data.data);
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  const nrru = {
    latitude: 14.9846414,
    longtitude: 102.1126068,
  };

  const generateEmbedGoogleMapDirectionURL = (
    startLatitude,
    startLongitude,
    endLatitude,
    endLongitude
  ) =>
    `https://maps.google.com/maps?saddr=${startLatitude},${startLongitude}&daddr=${endLatitude},${endLongitude}&output=embed`;

  url = generateEmbedGoogleMapDirectionURL(
    nrru.latitude,
    nrru.longtitude,
    // Work Location
    address.latitude,
    address.longtitude
  );

  return (
    <div>
      <TestNav user={user} role={role} />
      {console.log(role)}
      {role === "student" ? <div> Sutdent</div> : <BasepageAdmin />}
      {/* <PDFDownloadLink document={<PDFFile />} fileName="FORM">
        {({ loading }) =>
          loading ? <button> Loading Document ...</button> : "Download"
        }
      </PDFDownloadLink>
      <PDFFile />

      <Button
        className="btn-btnprimary"
        onClick={() =>
          map(
            "https://www.google.com/maps/place/%E0%B8%97%E0%B8%AD%E0%B8%AA%E0%B8%81%E0%B8%B2%E0%B8%99%E0%B8%B2+%E0%B8%A7%E0%B8%B1%E0%B8%A5%E0%B9%80%E0%B8%A5%E0%B9%88%E0%B8%A2%E0%B9%8C/@14.5072439,101.5009532,17z/data=!3m1!4b1!4m8!3m7!1s0x311c308cbed32c05:0x3340341dc504eaf1!5m2!4m1!1i2!8m2!3d14.5072514!4d101.5031605"
          )
        }
      >
        Send
      </Button>

      <div>

        <iframe
          src={url}
          width="600"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
       */}

      <Regform user={user} />
    </div>
  );
}
