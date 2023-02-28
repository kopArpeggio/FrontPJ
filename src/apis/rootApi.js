import axios from "axios";

// const prefix = "branch";
const GET_DATA = ` `;

const LOGIN_URL = `login`;
// const CREATE_BRANCH_URL = `${prefix}/create`;
// const UPDATE_BRANCH_BY_ID_URL = `${prefix}/update-by-id`;
// const DELETE_BRANCH_BY_ID_URL = `${prefix}/delete-by-id`;

/**
 * @func signIn
 * @desc Login get token
 * @author kop_ter
 * @param {AbortSignal} signal - AbortController Signal
 * @returns {object} login Data
 */
export const signIn = async (body) => {
  try {
    const { status, data } = await axios.post(LOGIN_URL, body);
    if (status === 200) {
      return data;
    }
    return undefined;
  } catch (error) {
    error.statusCode = 400;
    if (error) throw error;
    return undefined;
  }
};
/** End @func signIn */

/**
 * @func getData
 * @desc get user data
 * @author kop_ter
 * @param {AbortSignal} signal - AbortController Signal
 * @returns {object} user Data
 */
export const getData = async () => {
  try {
    const { status, data } = await axios.get(GET_DATA);
    if (status === 200) {
      return data;
    }
    return undefined;
  } catch (error) {
    error.statusCode = 400;
    if (error) throw error;
    return undefined;
  }
};
/** End @func getData */
