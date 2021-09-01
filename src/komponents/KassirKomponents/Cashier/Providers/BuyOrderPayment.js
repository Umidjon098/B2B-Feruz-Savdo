import React, { useState } from "react";
import FilterByDepartment from "../DepartmentBudget/filterByDepartment";
import FilterByTime from "../DepartmentBudget/filterByTime";

const BuyOrders = ({ providers, paymentOrderAction }) => {
  // const [localBuyOrders, setLocalBuyOrders] = useState(providers);
  const [windowDisplay, setWindowDisplay] = useState("none");
  const [buyOrderPayment, setBuyOrderPayment] = useState({
    
    payment_type: "",
    payment: "",
  });
  const [clientNameFullInfo, setClientNameFullInfo] = useState({
    sellOrderId: "",
    clientFName: "",
    clientDebt: "",
  });

  // const filterByDebtClients = (debt) => {
  //   let elements = providers;

  //   if (debt === "debt")
  //     elements = elements.filter((element) => element.debt > 0);
  //   if (debt === "notDebt")
  //     elements = elements.filter((element) => element.debt == 0);

  //   setLocalBuyOrders(elements);
  //   renderTable();
  // };

  // const filterByTypeProduct = (type) => {
  //   let elements = providers;

  //   if (type === "notvip")
  //     elements = elements.filter(
  //       (element) => element.product_type === "limited"
  //     );
  //   if (type === "notvip")
  //     elements = elements.filter(
  //       (element) => element.product_type === "unlimited"
  //     );

  //   setLocalBuyOrders(elements);
  //   renderTable();
  // };

  const handleChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    // if (name ==  "payment"){
        // value =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'som' }).format(value)
    // }
    // console.log(name, value)
    setBuyOrderPayment({ ...buyOrderPayment, [name]: value });
  };

  const showOrderPaymentDiv = (sellOrderId, clientName, debt) => {
    setBuyOrderPayment(() => {
      return {
        payment_type: "",
        payment: "",
      };
    });
    
    let formatValue = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'som' }).format(debt);

    setClientNameFullInfo(() => {
      return {
        clientFName: clientName,
        sellOrderId: sellOrderId,
        clientDebt: formatValue,
      };
    });
    
    setWindowDisplay("flex");
    renderTable();
  };

  const paymentOrderActionLocal = () => {
    paymentOrderAction(buyOrderPayment, clientNameFullInfo);
    renderTable();
  };

  function renderTable() {
    return (
      <div className="form-style">
        <div className="page-header">
          <div className="road-map-box">
            <h4>Пул тўлаган мижозлар рўйхати</h4>
          </div>
          <FilterByDepartment />
          <FilterByTime />
        </div>
        {/* <div className="row" style={{ display: "flex", flexDirection: "row", padding: "20px"}} >
          <div className="col-md-6">
            <div style={{ textAlign: "center" }}>
              <label htmlFor="debts">Qarzdorlik</label>
            </div>
            <select
              className="form-control"
              style={{ borderRadius: "100px" }}
              onChange={(e) => filterByDebtClients(e.target.value)}
              id="debts"
            >
              <option value="allOrders">Barchasi</option>
              <option value="notDebt">Qarzdor bo'lmaganlar</option>
              <option value="debt">Qarzdorlar</option>
            </select>
          </div>
          <div className="col-md-6">
            <div style={{ textAlign: "center" }}>
              <label htmlFor="debts">Maxsulot turi</label>
            </div>
            <select
              className="form-control"
              style={{ borderRadius: "100px" }}
              onChange={(e) => filterByTypeProduct(e.target.value)}
              id=""
            >
              <option value="allOrders">Barchasi</option>
              <option value="notvip">Vip emas</option>
              <option value="vip">Vip</option>
            </select>
          </div>
        </div> */}
        <div className="oynacha" style={{ display: `${windowDisplay}` }}>
          <div className="card" style={{ display: "block" }}>
            <div className="card-header">
              <h4 style={{ textAlign: "center", color:"black" }}>
                Тўлов ойнаси <br/>
              </h4>
              <h6 style={{ textAlign: "center", color:"black" }}>
                <span style={{ fontWeight: "bolder", color:"black" }}>
                  {clientNameFullInfo.clientFName} {" "}
                </span>
                <span style={{ color: "red" }}>
                  {clientNameFullInfo.clientDebt}{" "}{" "}
                </span>
                  қарз
              </h6>
            </div>
            <div className="card-body">
              <form className="form">
                <div className="form-group">
                  <label htmlFor="payment" style={{color:"black"}}>Тўлов тури</label>
                  <select
                    className="form-control"
                    name="payment_type"
                    onChange={handleChange}
                    style={{width:'90%'}}
                  >
                    <option value="none"></option>
                    <option value="cash">Нақт пул</option>
                    <option value="credit_card">Пластик карта</option>
                    <option value="money_transfer">Пул ўтказма</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="payment" style={{color:"black"}}>Пул миқдори</label>
                  <input
                    className="form-control"
                    type="text"
                    name="payment"
                    value={buyOrderPayment.payment}
                    onChange={handleChange}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <button 
                className="btn btn-success" style={{ marginRight: "15px" }} 
                onClick={() => paymentOrderActionLocal()}>
                Тўлов қилиш
              </button>
              <button 
                className="btn btn-danger" 
                onClick={() => { setWindowDisplay("none") }}>
                Ёпиш
              </button>
            </div>
          </div>
        </div>

        <div style={{ width: "100%", overflow: "scroll" }}>
          <div className="table-responsive">
            <table className="table table-striped table-hover text-center  mb-0">
              <thead>
                <tr>
                  <td scope="col">T/Р</td>
                  <td scope="col">Таминотчи номи</td>
                  <td scope="col">Манзили</td>
                  <td scope="col">Директор </td>
                  <td scope="col">Масул шахс</td>
                  <td scope="col">Телефон рақами 1</td>
                  <td scope="col">Телефон рақами 2</td>
                  <td scope="col">Банк коди</td>
                  <td scope="col">Банк</td>
                  <td scope="col">Aккоунт номери</td>
                  <td scope="col">ИНН</td>
                  <td scope="col">Қарз</td>
                  <td scope="col">Сотиб олинган вақт</td>
                  <td scope="col">Тўлов қилиш</td>
                </tr>
              </thead>
              <tbody>
                {providers.map(
                  ({
                    debt,
                    updated_date,
                    provider: { name: providerName },
                    provider: { address },
                    provider: { id },
                    provider: { phone_number1 },
                    provider: { phone_number2 },
                    provider: { INN },
                    provider: { bank_code },
                    provider: { bank },
                    provider: { account_number },
                    provider: { director },
                    provider: { responsible_agent },
                  }, index) => {
                    return (
                      <tr key={id}>
                        <th scope="row">{index + 1}</th>
                        <td>{providerName}</td>
                        <td>{address}</td>
                        <td>{director}</td>
                        <td>{responsible_agent}</td>
                        <td>
                          {phone_number1 ? phone_number1 : "Nomer kiritilmagan"}
                        </td>
                        <td>
                          {phone_number2 ? phone_number2 : "Nomer kiritilmagan"}
                        </td>
                        <td>{bank_code}</td>
                        <td>{bank}</td>
                        <td>{account_number}</td>
                        <td>{INN}</td>
                        <td>
                          <span 
                            className="debt">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'som' }).format(debt)}
                          </span>
                        </td>
                        {/* <td>
                          {deadline
                            ? deadline.slice(0, 10)
                            : "Muhlat belgilanmagan"}
                        </td> */}
                        <td>
                          {updated_date.slice(0, 10)}{" "}
                          {updated_date.slice(11, 16)}
                        </td>
                        <td>
                          <button 
                            className="btn btn-info" 
                            onClick={() => showOrderPaymentDiv(id, providerName, debt)}>
                            Тўлов
                          </button>
                        </td>
                      </tr>
                    )}
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return <>{renderTable()}</>;
};

export default BuyOrders;
