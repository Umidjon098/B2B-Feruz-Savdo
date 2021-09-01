import React, { Component } from "react";
import axios from "axios";
import PageMap from "../page-road-map/page-map";

class SubmitReturnedProduct extends Component {
  state = {
    returnedProduct: [],
    btn_type: "Тасдиқлаш",
    update: false,
    id: "",
    creditial: "",
  };
  componentDidMount() {
    this.getReturnedProduct();
  }
  getReturnedProduct = async () => {
    const url = "/api/order/returned-product/";
    await axios(url).then((res) => {
      this.setState({ returnedProduct: res.data });
    });
  };
  onSubmit = (e) => {
    const url = `/api/order/approve-returned-product/${e}/`;
    axios.patch(url, { is_approved: "director" }).then((response) => {
      if (response.data != null) {
        this.setState({
          returnedProduct: this.state.returnedProduct.filter(
            (data) => data.id != e
          ),
        });
      }
    });
  };

  render() {
    const { returnedProduct } = this.state;
    let count = 0;
    return (
      <>
        <div className="page-header">
          <PageMap page_name={"Қайтган Маҳсулотларни Тасдиқлаш"} />
        </div>
        <div className="register-box _expense">
          <div className="register-table-box table-responsive">
            <table className="table table-striped table-hover text-center  mb-0">
              <thead>
                <tr>
                  <td scope="col">Т/Р</td>
                  <td scope="col">Мижоз</td>
                  <td scope="col">Манзил</td>
                  <td scope="col">Телефон Рақам</td>
                  <td scope="col">Агент</td>
                  <td scope="col">Телефон Рақам</td>
                  <td scope="col">Сотиш</td>
                  <td scope="col">Қайтган Миқдор</td>
                  <td scope="col">Ҳолати</td>
                  <td scope="col">Tасдиқланган</td>
                  <td scope="col">Қайтарилган кун</td>
                  <td scope="col">Тасдиқлаш</td>
                </tr>
              </thead>
              {returnedProduct.map((data) => {
                count++;
                if (data.is_approved !== "director") {
                  return (
                    <tbody key={data.id}>
                      <tr>
                        <td>{count}</td>
                        <td>{data.client === null ? "-" : data.client.name}</td>
                        <td>
                          {data.client === null ? "-" : data.client.address}
                        </td>
                        <td>
                          {data.client === null
                            ? "-"
                            : data.client.work_phone_number}
                        </td>
                        <td>
                          {data.agent.first_name + " " + data.agent.last_name}
                        </td>
                        <td>{data.agent.phone_number}</td>
                        <td>
                          {data.sell_order === null
                            ? "-"
                            : data.sell_order.given_quantity}
                        </td>
                        <td>{data.returned_quantity}</td>
                        <td>
                          {data.status === "client_valid"
                            ? "Мижоз қайтарган яроқли"
                            : data.status === "client_invalid"
                            ? "Мижоз қайтарган яроқсиз"
                            : "Сотилмаган"}
                        </td>
                        <td
                          className={
                            data.is_approved === "agent"
                              ? "text-warning"
                              : "text-success"
                          }
                        >
                          {data.is_approved === "agent" ? "Агент" : "Омборчи"}
                        </td>
                        <td>{data.created_date.slice(0, 10)}</td>
                        <td className="d-flex justify-content-center">
                          <i
                            className="far fa-check-circle"
                            onClick={() => this.onSubmit(data.id)}
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  );
                }
              })}
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default SubmitReturnedProduct;
