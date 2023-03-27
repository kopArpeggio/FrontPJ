import axios from "axios";
import { sweetAlertError } from "../swal2/swal2";

const prefix = "upload";

const UPLOAD_IMAGE_FILE_URL = `${prefix}/upload-file`;
const UPLOAD_CSV_FILE_STUDENT_TO_DATABASE = `${prefix}/upload-csv-student`;
const UPLOAD_XLSX_FILE_STUDENT_TO_DATABASE = `${prefix}/upload-xlsx-lab`;

export const uploadImageFile = async (file, signal) => {
  try {
    const form = new FormData();
    form.append("image", file);

    const { data, status } = await axios.post(
      UPLOAD_IMAGE_FILE_URL,

      form,
      {
        signal,
      },
      {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${file._boundary}`,
        },
      }
    );

    if (status === 200) {
      return data?.data;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
    return undefined;
  }
};

export const uploadCsvStudentFile = async (file, signal) => {
  try {
    const form = new FormData();
    form.append("CSV", file);

    const { data, status } = await axios.post(
      UPLOAD_CSV_FILE_STUDENT_TO_DATABASE,

      form,
      {
        signal,
      },
      {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${file._boundary}`,
        },
      }
    );

    if (status === 200) {
      return data?.data;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
    return undefined;
  }
};

export const uploadXlsxStudentFile = async (file, signal) => {
  try {
    const form = new FormData();
    form.append("CSV", file);

    const { status } = await axios.post(
      UPLOAD_XLSX_FILE_STUDENT_TO_DATABASE,

      form,
      {
        signal,
      },
      {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${file._boundary}`,
        },
      }
    );

    if (status === 200) {
      return status;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
    return undefined;
  }
};
