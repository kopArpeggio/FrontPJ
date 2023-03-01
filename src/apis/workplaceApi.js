import axios from "axios";

const prefix = "workplace";

const GET_ALL_WORK_PLACE_URL = "get-all-workplace";
const GET_WORK_PLACE_BY_ID_URL = `${prefix}/get-workplace-by-id`;

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
