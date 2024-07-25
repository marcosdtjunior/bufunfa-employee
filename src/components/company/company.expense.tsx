import imgExpense from "../../assets/icons/money.svg";
import imgexpense2 from "../../assets/icons/cart.svg";
import { HeaderCompany } from "../header/header";
import { useEffect, useState } from "react";
import ExpenseInfo from "../expense/expense";
import ShopItemInfo from "../expense/shop";
import ModalPay from "../modal/modal.pay";

export default function ExpenseCompany({
  type,
  expenses,
}: {
  type?: string;
  expenses?: any;
}) {
  const [showModal, setShowModal] = useState(false);
  const [expensesFiltered, setExpensesFiltered] = useState([]);

  useEffect(() => {
    if (expenses.length === 0) {
      return setExpensesFiltered([]);
    }
    if (type === "required") {
      setExpensesFiltered(
        expenses.filter((expense: any) => expense.expense.type === "fixo")
      );
      return;
    } else {
      setExpensesFiltered(
        expenses.filter((expense: any) => expense.expense.type === "compra")
      );
    }
  }, []);

  return (
    <div className="w-full h-5/6">
      <HeaderCompany
        img={type === "required" ? imgExpense : imgexpense2}
        text={type === "required" ? "Gastos obrigatórios" : "Lista de compras"}
      />
      <div className="w-full max-h-[85%] overflow-y-scroll scrollbar-thin scrollbar-thumb-purpleDark p-4">
        <div className={`flex flex-wrap justify-center w-full gap-4`}>
          {type === "required"
            ? expensesFiltered.length
              ? expensesFiltered.map(
                  ({ expense, statusExpenseId }: any, key: number) => {
                    return (
                      <div key={key} className="w-full">
                        <ExpenseInfo
                          id={expense.id}
                          title={expense.title}
                          description={expense.description}
                          date={expense.date}
                          value={expense.value}
                          classname={key % 2 === 0 ? "" : "bg-[#E9E9EA]"}
                          setShowModal={setShowModal}
                          statusExpenseId={statusExpenseId}
                        />
                      </div>
                    );
                  }
                )
              : ""
            : expensesFiltered.map(
                ({ expense, statusExpenseId }: any, key: number) => {
                  return (
                    <div key={key}>
                      <ShopItemInfo
                        expense={expense}
                        setShowModal={setShowModal}
                        statusExpenseId={statusExpenseId}
                      />
                    </div>
                  );
                }
              )}
        </div>
      </div>
      {showModal && (
        <ModalPay type={type} setShowModal={setShowModal} id={showModal} />
      )}
    </div>
  );
}
