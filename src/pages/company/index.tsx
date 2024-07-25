import { useState } from "react";
import { MenuBar } from "../../components/menuBar/menuBar.tsx";
import CompanyInfo from "../../components/company/company.info.tsx";
import EmployeesShow from "../../components/employees/employees.show.tsx";
import CompanyTasks from "../../components/company/company.tasks.tsx";
import ExpenseCompany from "../../components/company/company.expense.tsx";
export default function Company() {
  const [selected, setSelected] = useState("home");
  const [companyFunctions, setCompanyFunctions] = useState({
    ceos: [],
    employees: [],
    tasks: [],
    expenses: [],
    loans: [],
    notify: [],
  });
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full h-[90%] bg-gradient-to-t from-purple from-1% via-white via-10% to-white to-90% flex flex-col justify-between relative border-none">
      {selected === "home" && (
        <CompanyInfo
          companyFunctions={companyFunctions}
          setCompanyFunctions={setCompanyFunctions}
          setLoading={setLoading}
          loading={loading}
        />
      )}
      {selected === "people" && <EmployeesShow />}
      {selected === "tasks" && <CompanyTasks tasks={companyFunctions.tasks} />}
      {selected === "money" && (
        <ExpenseCompany type="required" expenses={companyFunctions.expenses} />
      )}
      {selected === "cart" && (
        <ExpenseCompany type="shop" expenses={companyFunctions.expenses} />
      )}
      <MenuBar
        selected={selected}
        setSelected={setSelected}
        loading={loading}
      />
    </div>
  );
}
