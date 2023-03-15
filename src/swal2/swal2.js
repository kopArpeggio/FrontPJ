import Swal from "sweetalert2";

export const sweetAlertError = (err) => {
  return Swal.fire({
    icon: "error",
    title: "Oops...",
    text: err?.message,
  });
};

export const sweetAlertSubmit = (event) => {
  event.preventDefault();
  return Swal.fire({
    icon: "warning",
    title: "บันทึกหรือไม่ ?",
    showCancelButton: true,
    confirmButtonText: "Save",
  });
};
