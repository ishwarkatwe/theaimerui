import { toast } from "sonner";

function showToast(message: string) {
  toast(message, {
    duration: 4000,
    position: "bottom-right",
    className: "bg-gray-800 text-white",
    style: { borderRadius: "8px", padding: "12px 16px", fontSize: "14px" },
  });
}

export { showToast };
