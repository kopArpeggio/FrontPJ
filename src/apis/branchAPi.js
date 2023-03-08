import axios from "axios";
import { sweetAlertError } from "../swal2/swal2";

const prefix = "branch";

const GET_ALL_BRANCH_URL = `${prefix}/get-all-branch`;
const GET_ALL_BRANCH_BY_STATUS_URL = `${prefix}/get-all-branch-by-status`;
const CREATE_BRANCH_URL = `${prefix}/create`;
const UPDATE_BRANCH_BY_ID_URL = `${prefix}/update-by-id`;
const DELETE_BRANCH_BY_ID_URL = `${prefix}/delete-by-id`;

export const getAllBranch = async () => {
  try {
    const { data, status } = await axios.get(GET_ALL_BRANCH_URL);

    if (status === 200) {
      return data;
    }

    return undefined;
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
  }
};

export const getAllBranchByStatus = async (req, res, next) => {
  try {
    const { data, status } = await axios.get(GET_ALL_BRANCH_BY_STATUS_URL);

    if (status === 200) {
      return data;
    }

    return undefined;
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
  }
};

export const createBranch = async (body) => {
  try {
    const { status } = await axios.post(CREATE_BRANCH_URL, body);

    if (status === 200) {
      return true;
    }

    return undefined;
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
  }
};

export const updateBranchById = async (body) => {
  try {
    console.log(body?.id);
    const { status } = await axios.put(
      `${UPDATE_BRANCH_BY_ID_URL}/${body?.id}`,
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

export const deleteBranchById = async (id) => {
  try {
    const { status } = await axios.delete(`${DELETE_BRANCH_BY_ID_URL}/${id}`);

    if (status === 200) {
      return true;
    }

    return undefined;
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
  }
};
