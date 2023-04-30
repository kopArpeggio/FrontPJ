import axios from "axios";
import { sweetAlertError } from "../swal2/swal2";

const prefix = "evaluate";

const UPDATE_EVALUATE_BY_ID = `${prefix}/update-evaluate-by-id`;

export const updateEvaluateById = async (body) => {
    try {
        console.log(body)
        const { status } = await axios.put(`${UPDATE_EVALUATE_BY_ID}/${body?.evaluateId}`, body);

        if (status === 200) {
            return true;
        }

        return undefined;
    } catch (error) {
        const err = error?.response?.data?.error;

        sweetAlertError(err);
    }
};

