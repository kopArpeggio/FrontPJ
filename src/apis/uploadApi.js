import axios from "axios";
import { sweetAlertError } from "../swal2/swal2";

const prefix = "upload";

const UPLOAD_IMAGE_FILE_URL = `${prefix}/upload-file`;
const UPLOAD_CSV_FILE_STUDENT_TO_DATABASE = `${prefix}/upload-csv-student`;
const UPLOAD_XLSX_FILE_STUDENT_TO_DATABASE = `${prefix}/upload-xlsx-lab`;
const UPLOAD_XLSX_FILE_TEACHER_TO_DATABASE = `${prefix}/upload-xlsx-teachers`;


const UPLOAD_PDF_DOCUMENT_FILE_URL = `${prefix}/uploads-document-file`;

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
    console.log(error);
    const err = error?.response?.data?.error;

    sweetAlertError(err);
    return undefined;
  }
};

export const uploadStudentDocumentFile = async (file, signal) => {
  try {
    const form = new FormData();
    form.append("fcn1", file?.fcn1);
    form.append("fcn2", file?.fcn2);
    form.append("pdfName4", file?.file4);

    const { data, status } = await axios.post(
      UPLOAD_PDF_DOCUMENT_FILE_URL,

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
      return data;
    }
  } catch (error) {
    console.log(error);
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
    console.log(error);
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

export const uploadXlsxTeacherFile = async (file, signal) => {
  try {
    const form = new FormData();
    form.append("CSV", file);

    const { status } = await axios.post(
      UPLOAD_XLSX_FILE_TEACHER_TO_DATABASE,

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
