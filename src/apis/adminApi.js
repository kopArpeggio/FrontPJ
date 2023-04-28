import axios from "axios";
import { sweetAlertError } from "../swal2/swal2";

const prefix = "admin";

const UPDATE_ADMIN_PASSWORD_BY_ID = `${prefix}/update-admin-password-by-id`;

export const updateAdminPassword = async (body) => {
  console.log(body);
  try {
    const { status } = await axios.put(
      `${UPDATE_ADMIN_PASSWORD_BY_ID}/${body?.id}`,
      body
    );

    if (status === 200) {
      return true;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    sweetAlertError(err);
  }
};
