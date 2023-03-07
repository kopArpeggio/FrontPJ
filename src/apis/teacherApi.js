import axios from "axios";
import { sweetAlertError } from "../swal2/swal2";

const prefix = "teacher";

const GET_ALL_TEACHER_API = `${prefix}/get-all-teacher`;
const CREATE_TEACHER_API = `${prefix}/create`;
const UPDATE_TEACHER_BY_ID_API = `${prefix}/update-by-id`;
const DELETE_TEACHER_BY_ID_API = `${prefix}/delete-by-id`;

export const getAllTeacher = async () => {
  try {
    const { data, status } = await axios.get(`${GET_ALL_TEACHER_API}`);

    if (status === 200) {
      return data;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
  }
};

export const createTeacher = async (body) => {
  try {
    console.log(body);
    const { status } = await axios.post(`${CREATE_TEACHER_API}`, body);

    if (status === 201) {
      return true;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
  }
};

export const updateTeacherById = async (body) => {
  try {
    const { status } = await axios.put(
      `${UPDATE_TEACHER_BY_ID_API}/${body?.id}`,
      body
    );

    if (status === 200) {
      return true;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
  }
};

export const deleteTeacherById = async (id) => {
  try {
    const { status } = await axios.delete(`${DELETE_TEACHER_BY_ID_API}/${id}`);

    if (status === 200) {
      return true;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
  }
};
