import axios from "axios";
import { sweetAlertError } from "../swal2/swal2";

const prefix = "faculty";

const GET_ALL_FACULTY_API = `${prefix}/get-all-faculty`;
const GET_ALL_FACULTY_BY_STATUS_API = `${prefix}/get-all-faculty-by-status`;
const CREATE_FACULTY_API = `${prefix}/create`;
const UPDATE_FACULTY_BY_ID_API = `${prefix}/update-by-id`;
const DEELTE_FACULTY_BY_ID_API = `${prefix}/delete-by-id`;

export const getAllFaculty = async () => {
  try {
    const { data, status } = await axios.get(GET_ALL_FACULTY_API);

    if (status === 200) {
      return data;
    }

    return undefined;
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
  }
};

export const getAllFacultyByStatus = async () => {
  try {
    const { data, status } = await axios.get(GET_ALL_FACULTY_BY_STATUS_API);

    if (status === 200) {
      return data;
    }

    return undefined;
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
  }
};

export const createFaculty = async (body) => {
  try {
    const { status } = await axios.post(CREATE_FACULTY_API, body);

    if (status === 200) {
      return true;
    }
    return undefined;
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
  }
};

export const updateFacultyById = async (body) => {
  try {
    const { status } = await axios.put(
      `${UPDATE_FACULTY_BY_ID_API}/${body?.id}`,
      body
    );

    if (status === 200) {
      return true;
    }

    return undefined;
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
  }
};

export const deleteFacultyById = async (id) => {
  try {
    const { status } = await axios.delete(`${DEELTE_FACULTY_BY_ID_API}/${id}`);

    if (status === 200) {
      return true;
    }

    return undefined;
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
  }
};
