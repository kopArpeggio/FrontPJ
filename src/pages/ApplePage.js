import React, { useState } from "react";
import PDFFile from "../components/PDFFile";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { getCoordinatesFromGoogleMapURL } from "../utils/utils";
import { Button } from "react-bootstrap";
import GoogleMapReact from "google-map-react";
import axios from "axios";

export default function ApplePage() {
  const [latlong, setLatlong] = useState("");
  const map = (url) => {
    setLatlong(getCoordinatesFromGoogleMapURL(url));
    console.log(latlong);
  };

  const token = localStorage.getItem("token");
  console.log(token);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  async function getUser() {
    try {
      const response = await axios.post("http://localhost:3001/api/", {
        config,
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  getUser();

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

  const url = generateEmbedGoogleMapDirectionURL(
    nrru.latitude,
    nrru.longtitude,
    // Work Location
    14.670805,
    101.396312
  );

  return (
    <div>
      <PDFDownloadLink document={<PDFFile />} fileName="FORM">
        {({ loading }) =>
          loading ? <button> Loading Document ...</button> : "Download"
        }
      </PDFDownloadLink>
      <PDFFile />

      <Button
        className="btn-btnprimary"
        onClick={() =>
          map("https://www.google.co.th/maps/@18.3170581,99.3986862,17z?hl=th")
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

      <p>{latlong.longtitude}</p>
    </div>
  );
}
