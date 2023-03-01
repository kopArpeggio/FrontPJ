import axios from "axios";

const prefix = "work";

const UPDATE_USER_BY_ID = `${prefix}/update-by-id`;

export const updateWorkById = async (body) => {
  try {
    console.log(body);
    const { status } = await axios.put(
      `${UPDATE_USER_BY_ID}/${body?.work?.id}`,
      body
    );

    if (status === 200) {
      console.log("Yes it Update Work Succesful.");
    }
  } catch (error) {
    console.log(error);
  }
};
