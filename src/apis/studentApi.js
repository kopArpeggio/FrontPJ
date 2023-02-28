import axios from "axios";

const prefix = "student";

const GET_ALL_STUDENT = `${prefix}/get-all-student`;
const UPDATE_USER_BY_ID = `${prefix}/update-by-id`;

export const updateStudentById = async (body) => {
  try {
    console.log(body);
    const { status } = await axios.put(
      `${UPDATE_USER_BY_ID}/${body?.stu?.id}`,
      body
    );

    if (status === 200) {
      console.log("Yes it Update");
    }
  } catch (error) {
    console.log(error);
  }
};

