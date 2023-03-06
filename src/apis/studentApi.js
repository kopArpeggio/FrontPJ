import axios from "axios";

const prefix = "student";

const GET_ALL_STUDENT = `${prefix}/get-all-student`;
const UPDATE_USER_BY_ID = `${prefix}/update-by-id`;
const CREATE_STUDENT = `${prefix}/create`;
const DELETE_STUDENT = `${prefix}/delete-by-id`;

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
    console.log(error);
  }
};

export const createStudent = async (body) => {
  try {
    const { status } = await axios.post(CREATE_STUDENT, body);

    if (status === 201) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteStudent = async (id) => {
  try {
    const { status } = await axios.delete(`${DELETE_STUDENT}/${id}`);

    if (status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
