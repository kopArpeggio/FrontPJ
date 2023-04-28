import axios from "axios";
import { sweetAlertError } from "../swal2/swal2";

const prefix = "workplace";

const GET_ALL_WORK_PLACE_URL = "get-all-workplace";
const GET_ALL_WORK_PLACE_URL_WITH_STATUS = "get-all-workplace-with-status";
const GET_STUDENT_IN_THAT_WORK_PLACE = `${prefix}/get-workplace-with-student-by-id`;
const GET_WORK_PLACE_BY_ID_URL = `${prefix}/get-workplace-by-id`;
const CREATE_WORK_PLACE = `${prefix}/create`;
const UPDATE_WORK_PLACE_BY_ID_URL = `${prefix}/update-by-id`;
const DELETE_WORK_PLACE_BY_ID_URL = `${prefix}/delete-by-id`;
const CREATE_WORKPLACE_BY_STUDENT = `${prefix}/create-by-student`;
const GET_ALL_WORKPLACE_BY_APPROVE = `${prefix}/get-all-workplace-by-approve`;

export const getStudentInThatWorkplace = async (id) => {
  try {
    const { data, status } = await axios.get(
      `${GET_STUDENT_IN_THAT_WORK_PLACE}/${id}`
    );

    if (status === 200) {
      return data;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
    return undefined;
  }
};

export const getAllWorkplace = async () => {
  try {
    const { data, status } = await axios.get(
      `${prefix}/${GET_ALL_WORK_PLACE_URL}`
    );

    if (status === 200) {
      return data;
    }

    return undefined;
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
    return undefined;
  }
};

export const getAllWorkplaceWithStatus = async () => {
  try {
    const { data, status } = await axios.get(
      `${prefix}/${GET_ALL_WORK_PLACE_URL_WITH_STATUS}`
    );

    if (status === 200) {
      return data;
    }

    return undefined;
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
    return undefined;
  }
};

export const getWorkplaceById = async (id) => {
  try {
    const { data, status } = await axios.get(
      `${GET_WORK_PLACE_BY_ID_URL}/${id}`
    );

    if (status === 200) {
      return data;
    }

    return undefined;
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
    return undefined;
  }
};

export const createWorkplace = async (body) => {
  try {
    const { data, status } = await axios.post(`${CREATE_WORK_PLACE}`, body);

    if (status === 200) {
      return data;
    }

    return undefined;
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
    return undefined;
  }
};

export const updateWorkplaceById = async (body) => {
  try {
    const { status } = await axios.put(
      `${UPDATE_WORK_PLACE_BY_ID_URL}/${body?.id}`,
      body
    );

    if (status === 200) {
      return true;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
    return undefined;
  }
};

export const getAllWorkplaceByApprove = async () => {
  try {
    const { status, data } = await axios.get(GET_ALL_WORKPLACE_BY_APPROVE);

    if (status === 200) {
      return data;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
    return undefined;
  }
};

export const deleteWorkplaceById = async (id) => {
  try {
    const { status } = await axios.delete(
      `${DELETE_WORK_PLACE_BY_ID_URL}/${id}`
    );

    if (status === 200) {
      return true;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
    return undefined;
  }
};

export const createWorkplaceByStudent = async (body) => {
  try {
    const { status, data } = await axios.post(
      CREATE_WORKPLACE_BY_STUDENT,
      body
    );

    if (status === 200) {
      return data;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
    return undefined;
  }
};
