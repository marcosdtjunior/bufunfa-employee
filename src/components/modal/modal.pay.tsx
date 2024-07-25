import { getItem } from "../../utils/storage";
import Button from "../button/button";
import AxiosInstance from "../../connection";
import { toastfy } from "../../hooks/toasfy";

export default function ModalPay({
  type,
  setShowModal,
  id,
}: {
  type?: string;
  setShowModal: any;
  id: any;
}) {
  async function handlePayExpense() {
    try {
      if (
        type === "required" &&
        Number(id.value) > Number(await getItem("salary"))
      ) {
        throw new Error("Você não tem saldo suficiente!!");
      }
      await AxiosInstance.axiosPrivate.put(
        `/employeePayExpense/employee/${id.id}/${await getItem("id")}`,
        { statusExpenseId: 2 },
        {
          headers: {
            Authorization: `Bearer ${await getItem("token")}`,
          },
        }
      );
      toastfy(
        "success",
        "Comprado! Solicite ao CEO seu produto/serviço.",
        "text-green",
        4000
      );
      setTimeout(() => {
        setShowModal(false);
        window.location.reload();
      }, 4000);
    } catch (error: any) {
      toastfy("error", error.message, "text-red", 3000);
    }
  }
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
      <div className="bg-purple w-11/12 h-2/6 rounded-2xl relative flex flex-col justify-evenly px-6 text-white">
        <h2
          onClick={() => setShowModal(false)}
          className="bg-gold rounded-[100%] absolute top-4 right-4 w-4 h-4 font-bold flex items-center justify-center text-purple"
        >
          x
        </h2>
        <h2 className="text-subTitle">Você tem certeza?</h2>
        <h2 className="text-subTitle2">
          {type === "required"
            ? "Certeza que deseja pagar este gasto obrigatório?"
            : "Certeza que deseja comprar este produto/serviço?"}
        </h2>
        <div>
          <Button
            text="Pagar"
            onClick={() => handlePayExpense()}
            type="button"
            color="gold"
          />
        </div>
      </div>
    </div>
  );
}
