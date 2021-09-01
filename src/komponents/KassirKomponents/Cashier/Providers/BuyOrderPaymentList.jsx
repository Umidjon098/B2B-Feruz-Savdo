import { useEffect, useState } from "react";
import axios from "../../../../baseUrl";
import Loading from "../Loading/index";
import { observer } from "mobx-react";
import { confirmAlert } from "react-confirm-alert";
import { globalState } from "./../../../../globalState";
import FilterByDepartment from "../DepartmentBudget/filterByDepartment";
import FilterByTime from "../DepartmentBudget/filterByTime";

const _BuyOrderPayment = () => {
  const [loading, setLoading] = useState(true);
  const [paymentsList, setPaymentsList] = useState([]);
  
  const fetchPaymentList = async () => {
    setLoading(true);
    try {
      await axios
        .get("/order/buy-order-payment/", {
          params: {
            term: globalState.search,
          },
        })
        .then((response) => {
          setPaymentsList(response.data.payments);
          setLoading(false);
          renderTable();
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const showDeleteButton = (e) => {
    confirmAlert({
      message: "Ўчириш учун тасдиқланг",
      buttons: [
        {
          label: "Ўчириш",
          onClick: () => onPaymentDelete(e),
        },
        {
          label: "Қайтиш",
          onClick: () => console.log(""),
        }
      ]
    })
  }

  const onPaymentDelete = (e) => {
    const url = "/order/buy-order-detail/";
    axios.delete(url + e).then((response) => {
      if (response.data != null) {
        alert("Малумот ўчирилди");
        fetchPaymentList();
        renderTable();
      }
    })
  }

  useEffect(() => {
    fetchPaymentList();
  }, [globalState.search]);

  function renderTable() {
    if (loading || paymentsList.length === 0) {
      return (
        <main>
          <Loading />
        </main>
      );
    } else {
      return (
        <div>
          <div className="page-header">
              <div className="road-map-box">
                <h4>Пул тўлаган мижозлар рўйхати</h4>
              </div>
              <FilterByDepartment />
              <FilterByTime />
          </div>
          <div style={{ width: "100%", overflow: "scroll" }}>
            <div className="sellPayment-table">
              <div className="table-responsive">
                <table className="table table-striped table-hover text-center  mb-0">
                  <thead>
                    <tr>
                      <td scope="col">T/Р</td>
                      <td scope="col">Таминотчи номи</td>
                      <td scope="col">Манзил </td>
                      <td scope="col">Масул шахс</td>
                      <td scope="col">Телефон рақами 1</td>
                      <td scope="col">Телефон рақами 2</td>
                      <td scope="col">Тўлов тури</td>
                      <td scope="col">Тўлов суммаси</td>
                      <td scope="col">Тўланган сана</td>
                      <td scope="col">Жараён</td>
                    </tr>
                  </thead>
                  <tbody key={100}>
                    {paymentsList.map(
                      ({
                        payment_type,
                        payment,
                        created_date,
                        provider: { address },
                        provider: { phone_number1 },
                        provider: { phone_number2 },
                        provider: { responsible_agent },
                        provider: { name: providerName },
                        id,
                      }, index) => {
                        
                        if (payment_type === "credit_card")
                          payment_type = "Пластикдан тўлов";
                        if (payment_type === "cash") 
                          payment_type = "Нақт пул";
                        if (payment_type === "money_transfer")
                          payment_type = "Пул ўтказма";

                        return (
                          <>
                            <tr key={id}>
                              <th scope="row">{index + 1}</th>
                              <td>{providerName}</td>
                              <td>{address}</td>
                              <td>{responsible_agent}</td>
                              <td>{phone_number1}</td>
                              <td>{phone_number2}</td>
                              <td>{payment_type}</td>
                              <td>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'Som' }).format(payment)}</td>
                              <td>{created_date.slice(0, 10) + " " + created_date.slice(11, 16)}</td>
                              <td style={{ display: "flex", flexDirection: "row" }}>
                                <p
                                  style={{ fontSize: "20px", cursor: "pointer" }}
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Ўчириш"
                                    onClick={() => showDeleteButton(id)} >
                                  <i className="fas fa-trash-alt"></i>
                                </p>
                              </td>
                            </tr>
                          </>
                        )})}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  return <div>{renderTable()}</div>;
};

export default observer(_BuyOrderPayment);
