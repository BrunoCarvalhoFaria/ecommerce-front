import Swal from "sweetalert2";

export const confirmDialog = (
  title,
  text,
  onConfirm = () => {},
  onCancel = () => {},
  icon = "warning",
  cancelar = false,
  confirmButtonText = "Sim",
  cancelButtonText = "Não"
) => {
  Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    confirmButtonText: confirmButtonText,
    cancelButtonColor: "#d33",
    cancelButtonText: "Não",
    showDenyButton: cancelar,
    denyButtonColor: "#607d8b",
    denyButtonText: cancelButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
    if (result.isDismissed) {
      onCancel();
    }
  });
};
