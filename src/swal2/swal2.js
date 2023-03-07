import Swal from "sweetalert2";

export const sweetAlertError = (err) => {
  return Swal.fire({
    icon: "error",
    title: "Oops...",
    text: err?.message,
  });
};
