import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export async function confirmDelete(itemName: string): Promise<boolean> {
  const result = await Swal.fire({
    title: `Excluir "${itemName}"?`,
    text: "Essa acao nao pode ser desfeita.",
    icon: "warning",
    iconColor: "#f87171",
    showCancelButton: true,
    confirmButtonText: "Excluir",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
    focusCancel: true,
    buttonsStyling: false,
    customClass: {
      popup: "bar-swal-popup",
      title: "bar-swal-title",
      htmlContainer: "bar-swal-text",
      confirmButton: "bar-swal-confirm",
      cancelButton: "bar-swal-cancel",
    },
  });

  return result.isConfirmed;
}
