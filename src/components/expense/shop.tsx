import coin from "../../assets/icons/coin.svg";
import cart from "../../assets/icons/cartActive.svg";
import Button from "../button/button";

export default function ShopItemInfo({
  expense,
  setShowModal,
  statusExpenseId,
}: {
  expense: any;
  setShowModal: any;
  statusExpenseId: number;
}) {
  return (
    <div className="border-purpleDark border-2 border-solid rounded-3xl w-40 h-44 flex items-center justify-evenly flex-col">
      <h2 className="text-subTitle2">{expense.title}</h2>
      <div className="flex items-center gap-1">
        <img src={coin} alt="coin icon" />{" "}
        <h2>
          {(Number(expense.value) / 100).toLocaleString("pt-BR", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h2>
      </div>
      <p className="text-textBody2 text-center">{expense.description}</p>
      <div className="flex items-center w-3/4 justify-evenly">
        {statusExpenseId === 1 ? (
          <Button
            text="Comprar"
            onClick={() =>
              setShowModal({ id: expense.id, value: expense.value })
            }
            type="button"
            color="purple"
            img={cart}
          />
        ) : (
          <h2 className="text-subTitle2 text-gold">Comprado</h2>
        )}
      </div>
    </div>
  );
}
