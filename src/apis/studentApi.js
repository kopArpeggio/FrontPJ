import axios from "axios";

const prefix = "student";

const GET_ALL_STUDENT = `${prefix}/get-all-student`;
const UPDATE_USER_BY_ID = `${prefix}/update-by-id`;
const CREATE_STUDENT = `${prefix}/create`;

export const updateStudentById = async (body) => {
  try {
    console.log(body);
    const { status } = await axios.put(
      `${UPDATE_USER_BY_ID}/${body?.stu?.id}`,
      body
    );

    if (status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createStudent = async (body) => {
  try {
    console.log(body);
    const { status } = await axios.post(CREATE_STUDENT, body);

    if (status === 201) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
