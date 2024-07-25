import { useEffect, useState } from "react";
import building from "../../assets/building.svg";
import changeCompany from "../../assets/icons/update.svg";
import iconPeople from "../../assets/icons/peopleGold.svg";
import iconCoin from "../../assets/icons/coin.svg";
import { getItem, setItem } from "../../utils/storage";
import AxiosInstance from "../../connection";
import { useNavigate } from "react-router-dom";
import CompanyPerson from "./company.person";
import { PulseLoader } from "react-spinners";

export default function CompanyInfo({
  companyFunctions,
  setCompanyFunctions,
  loading,
  setLoading,
}: {
  companyFunctions?: any;
  setCompanyFunctions?: any;
  loading?: any;
  setLoading?: any;
}) {
  const navigate = useNavigate();
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    background: "",
    cnpj: "",
    description: "",
    logo: "",
    slogan: "",
    salary: 0,
  });
  const [photo, setPhoto] = useState<string | null>("");
  const [name, setName] = useState<string | null>("");
  const [_, setExpenses] = useState<any[]>([]);

  const getCompanyInfo = async () => {
    const {
      data: { company },
    } = await AxiosInstance.axiosPrivate.get(
      `/companyInfo/employee/${await getItem("company")}`,
      {
        headers: {
          Authorization: `Bearer ${await getItem("token")}`,
        },
      }
    );

    company.companyEmployees.filter(async (e: any) => {
      if (e.employeeId === Number(await getItem("id"))) {
        return await setItem("salary", e.salary);
      }
    });

    const { data } = await AxiosInstance.axiosPrivate.get(
      `/userInfo/employee`,
      { headers: { Authorization: `Bearer ${await getItem("token")}` } }
    );
    const allTasks = data.employee.tasks.filter(
      (task: any) => task.task.companyTasks[0].companyId === company.id
    );

    const allExpensesFilter = data.employee.expenses.filter(
      (expenseFilter: any) => {
        const expenseFiltered: any = [];

        if (expenseFilter.expense.companyExpenses.length <= 0) {
          return expenseFiltered.push(expenseFilter);
        } else if (
          Number(expenseFilter.expense.companyExpenses[0].companyId) ===
          Number(company.id)
        ) {
          return expenseFiltered.push(expenseFilter);
        }
        setExpenses(expenseFiltered);
      }
    );

    await AxiosInstance.axiosPrivate.post(
      `/takeTask/employee/employeeTasks/${await getItem("company")}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${await getItem("token")}`,
        },
      }
    );

    setPhoto(await getItem("photo"));
    setName(await getItem("name"));

    await setCompanyInfo({
      name: company.name,
      background: company.background,
      cnpj: company.cnpj,
      description: company.description,
      logo: company.logo,
      slogan: company.slogan,
      salary: company.salary,
    });

    await setCompanyFunctions({
      ceos: company.ceos,
      employees: company.companyEmployees,
      tasks: allTasks,
      expenses: allExpensesFilter,
      loans: company.loans,
      notify: company.notify,
    });
    setLoading(true);
    await setItem("companyInfo", JSON.stringify(companyInfo));
  };

  useEffect(() => {
    getCompanyInfo();
  }, [name]);
  return (
    <>
      {companyInfo && (
        <div className="w-full h-full flex flex-col items-center justify-center">
          {!loading ? (
            <>
              <PulseLoader color="#240046" />
              <h2>Carregando</h2>
            </>
          ) : (
            <>
              <div
                className={`w-full min-h-[30%] max-h-[30%] bg-purple flex items-center justify-center relative`}
              >
                <header
                  className={`flex justify-between pt-5 px-2 absolute top-0 left-0 w-full z-[1]`}
                >
                  <div className="flex items-center bg-purple min-w-[8rem] max-w-[12rem] h-10 rounded-3xl px-2 gap-2 shadow-2xl shadow-whiteBg">
                    <img
                      className="rounded-[100%] bg-white border-2 border-solid border-white w-8 h-8"
                      src={photo || ""}
                      alt={`photo ${getItem("name")}`}
                    />
                    <h2 className="text-gold truncate text-ellipsis">
                      {name?.split(" ")[0]}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-[100%] p-2 bg-purple shadow-2xl shadow-whiteBg flex items-center justify-center">
                      <img
                        src={changeCompany}
                        alt="icon change company"
                        onClick={() => {
                          navigate("/home");
                        }}
                      />
                    </div>
                  </div>
                </header>
                <img
                  className="absolute top-0 h-full w-full"
                  src={companyInfo.background || building}
                  alt={`background ${companyInfo.name}`}
                />
                <img
                  className="absolute -bottom-5 left-5 h-24 w-24 bg-white rounded-[100%] border-8 border-purple"
                  src={companyInfo.logo || building}
                  alt={`logo ${companyInfo.name}`}
                />
              </div>
              <div className="w-full max-h-[70%] h-full p-6 flex flex-col justify-evenly gap-3 overflow-y-scroll">
                <div className="bg-purple w-full h-40 rounded-md text-gold text-subTitle py-4 px-2 flex flex-col">
                  <div className="flex justify-between items-center w-full">
                    <h2 className="text-gold text-subTitle w-10/12">
                      {companyInfo.name}
                    </h2>
                    <div className="flex items-center gap-2 ">
                      <h2>
                        {companyFunctions.ceos.length +
                          companyFunctions.employees.length}
                      </h2>
                      <img
                        className="h-full"
                        src={iconPeople}
                        alt="icon people"
                      />
                    </div>
                  </div>
                  <h2 className="text-textBodyLink2">"{companyInfo.slogan}"</h2>
                  <p className="text-textBody text-white truncate whitespace-break-spaces h-full">
                    {companyInfo.description}
                  </p>
                </div>
                <div className="bg-purple w-full h-16 rounded-md text-white text-title flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <h2 className="text-white text-textBodyLink">
                      Salario máximo desta empresa
                    </h2>
                    <div className="flex items-center">
                      <img src={iconCoin} alt="coin" />
                      <h2>
                        {(companyInfo.salary / 100).toLocaleString("pt-BR", {
                          style: "decimal",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="flex gap-6 max-w-screen overflow-x-scroll scrollbar-thin scrollbar-thumb-purple">
                  {companyFunctions.ceos.length > 0 &&
                    companyFunctions.ceos.map(({ ceo }: { ceo: any }) => {
                      return (
                        <div key={ceo.id}>
                          <CompanyPerson id={ceo.id} person={ceo} type="ceo" />
                        </div>
                      );
                    })}
                  {companyFunctions.employees.length > 0 &&
                    companyFunctions.employees.map(
                      ({ employee }: { employee: any }) => {
                        return (
                          <div key={employee.id}>
                            <CompanyPerson id={employee.id} person={employee} />
                          </div>
                        );
                      }
                    )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
