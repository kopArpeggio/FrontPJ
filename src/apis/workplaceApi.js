import axios from "axios";

const prefix = "workplace";

const GET_ALL_WORK_PLACE_URL = "get-all-workplace";

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
