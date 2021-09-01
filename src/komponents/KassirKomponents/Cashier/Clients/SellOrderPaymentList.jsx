import { useEffect, useState } from "react";
import axios from "../../../../baseUrl";
import Loading from "../Loading/index";
import { observer } from "mobx-react";
import { confirmAlert } from "react-confirm-alert";
import { globalState } from "./../../../../globalState";
import FilterByDepartment from "../DepartmentBudget/filterByDepartment";
import FilterByTime from "../DepartmentBudget/filterByTime";

const SellOrderPayment = () => {
  const [loading, setLoading] = useState(true);
  const [paymentsList, setPaymentsList] = useState([]);

  const fetchPaymentList = async () => {
    setLoading(true);
    try {
      await axios
        .get("/order/sell-order-payment/", {
          params: {
            term: globalState.search,
          },
        })
        .then((response) => {
          setPaymentsList(response.data.payments.filter((res) => res.approved !== false));
          setLoading(false);
          renderTable();
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const showDeleteButton = (e) => {
    confirmAlert({
      message: "Ўчириш учун тасдиқланг",
      buttons: [
        {
          label: "Ўчириш",
          onClick: () => onOrderDelete(e),
        },
        {
          label: "Қайтиш",
          onClick: () => console.log(""),
        }
      ]
    })
  };

  const onOrderDelete = (e) => {
    const url = "/order/sell-order-payment-detail/";
    axios.delete(url + e).then((response) => {
      if (response.data != null) {
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
              <h3>Пул тўлаган мижозлар рўйхати</h3>
            </div>
            <FilterByDepartment />
            <FilterByTime />
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-hover text-center  mb-0">
              <thead>
                <tr>
                  <td scope="col">T/Р</td>
                  <td scope="col">Клиент номи</td>
                  <td scope="col">Манзил</td>
                  <td scope="col">Масул шахс</td>
                  <td scope="col">Ишчи телефон рақами</td>
                  <td scope="col">Директор телефон рақами</td>
                  <td scope="col">Агенти исм фамилияси</td>
                  <td scope="col">Тўлов тури</td>
                  <td scope="col">Тўлов суммаси</td>
                  <td scope="col">Тўланган сана</td>
                  <td scope="col">тасдиқланг</td>
                  <td scope="col">Жараён</td>
                </tr>
              </thead>
              <tbody>
                { paymentsList.map(
                  ({
                    id,
                    payment_type,
                    payment,
                    created_date,
                    approved,
                    client:  {name: clientName },
                    client:  {address },
                    client:  {responsible_agent },
                    client:  {work_phone_number },
                    client:  {director_phone_number },
                    client:  {sale_agent: {first_name}},
                    client:  {sale_agent: {last_name}},
                    client:  {sale_agent: {phone_number}},
                  }, index) => {
                    if (payment_type === "credit_card")    payment_type = "Пластикдан тўлов"
                    if (payment_type === "cash")           payment_type = "Нақт пул"
                    if (payment_type === "money_transfer") payment_type = "Пул ўтказма"
                    return (
                      <>
                        <tr key={id}>
                          <th scope="row">{index + 1}</th>
                          <td>{clientName}</td>
                          <td>{address}</td>
                          <td>{responsible_agent}</td>
                          <td>{work_phone_number}</td>
                          <td>{director_phone_number}</td>
                          <td>{first_name} {" "} {last_name}</td>
                          <td>{phone_number}</td>
                          <td>{payment_type}</td>
                          <td>{payment}</td>
                          <td>{approved ? <span className="delivered">Тасдиқланган</span>:
                              <span className="ordered">Тасдиқланмаган</span> }</td>
                          <td>{created_date.slice(0, 10)}{" "}{created_date.slice(11, 16)}</td>
                          <td style={{ display: "flex", flexDirection: "row" }}>
                            <p style={{ fontSize: "20px", cursor: "pointer" }}
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="O'chirish"
                              onClick={() => showDeleteButton(id)}>
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
      );
  }
}
  return <div>{renderTable()}</div>;
};

export default observer(SellOrderPayment);
