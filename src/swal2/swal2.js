import Swal from "sweetalert2";

export const sweetAlertError = (err) => {
  return Swal.fire({
    icon: "error",
    title: "Oops...",
    text: err?.message,
  });
};

export const sweetAlertSubmit = (event, title) => {
  event?.preventDefault();
  return Swal.fire({
    icon: "warning",
    title: title ? title : "บันทึกหรือไม่ ?",
    showCancelButton: true,
    cancelButtonText: "ยกเลิก",
    confirmButtonText: "ตกลง",
  });
};

export const sweetAlertSuccess = (title) => {
  // Swal.fire(title ? title : "สำเร็จ !", "", "success");
  return new Promise((resolve) => {
    Swal.fire({
      title: title ? title : "สำเร็จ !",
      text: title,
      icon: "success",
      button: "OK",
    }).then(() => {
      resolve(true);
    });
  });
};
