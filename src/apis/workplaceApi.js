import axios from "axios";

const prefix = "workplace";

const GET_ALL_WORK_PLACE_URL = "get-all-workplace";
const GET_ALL_WORK_PLACE_URL_WITH_STATUS = "get-all-workplace-with-status";
const GET_WORK_PLACE_BY_ID_URL = `${prefix}/get-workplace-by-id`;
const CREATE_WORK_PLACE = `${prefix}/create`;
const UPDATE_WORK_PLACE_BY_ID_URL = `${prefix}/update-by-id`;
const DELETE_WORK_PLACE_BY_ID_URL = `${prefix}/delete-by-id`;

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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);

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
    console.log(error);

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
    console.log(error);

    return undefined;
  }
};
