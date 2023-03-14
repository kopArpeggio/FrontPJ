import axios from "axios";
import { sweetAlertError } from "../swal2/swal2";

const prefix = "student";

const GET_ALL_STUDENT = `${prefix}/get-all-student`;
const UPDATE_USER_BY_ID = `${prefix}/update-by-id`;
const CREATE_STUDENT = `${prefix}/create`;
const DELETE_STUDENT = `${prefix}/delete-by-id`;
const GET_ALL_STUDENT_BY_STATUS = `${prefix}/get-all-student-by-status`;
const GET_ALL_STUDENT_BY_BRANCH = `${prefix}/get-all-student-by-branch`;
const GET_ALL_YEAR_STUDENT = `${prefix}/get-student-year`;

export const getAllStudent = async () => {
  try {
    const { data, status } = await axios.get(GET_ALL_STUDENT);

    if (status === 200) {
      return data;
    }

    return undefined;
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
  }
};

export const getAllYearStudent = async () => {
  try {
    const { data, status } = await axios.get(GET_ALL_YEAR_STUDENT);

    if (status === 200) {
      return data;
    }

    return undefined;
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
  }
};

export const getAllStudentByBranch = async () => {
  try {
    const { data, status } = await axios.get(GET_ALL_STUDENT_BY_BRANCH);

    if (status === 200) {
      return data;
    }

    return undefined;
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
  }
};

export const getAllStudentByStatus = async (queryParams) => {
  try {
    console.log(queryParams);
    const { data, status } = await axios.get(GET_ALL_STUDENT_BY_STATUS, {
      params: queryParams,
    });

    if (status === 200) {
      return data;
    }

    return undefined;
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
  }
};

export const updateStudentById = async (body) => {
  try {
    const { data, status } = await axios.put(
      `${UPDATE_USER_BY_ID}/${body?.stu?.id}`,
      body
    );

    if (status === 200) {
      return data;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
  }
};

export const createStudent = async (body) => {
  try {
    const { status } = await axios.post(CREATE_STUDENT, body);

    if (status === 201) {
      return true;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
  }
};

export const deleteStudent = async (id) => {
  try {
    const { status } = await axios.delete(`${DELETE_STUDENT}/${id}`);

    if (status === 200) {
      return true;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
  }
};
