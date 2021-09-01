import React, { Component } from "react";
import axios from "axios";
import PageMap from "../page-road-map/page-map";

class SubmitProducts extends Component {
  state = {
    returnedProduct: [],
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

  render() {
    const { returnedProduct } = this.state;
    let count = 0;
    return (
      <>
        <div className="page-header">
          <PageMap page_name={"Тасдиқланган Маҳсулотлар"} />
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
                </tr>
              </thead>
              {returnedProduct.map((data) => {
                count++;
                if (data.is_approved === "director") {
                  return (
                    <tbody key={data.id}>
                      <tr>
                        <td>{count}</td>
                        <td>{data.client.name}</td>
                        <td>{data.client.address}</td>
                        <td>{data.client.work_phone_number}</td>
                        <td>
                          {data.agent.first_name + " " + data.agent.last_name}
                        </td>
                        <td>{data.agent.phone_number}</td>
                        <td>{data.sell_order.given_quantity}</td>
                        <td>{data.returned_quantity}</td>
                        <td>{data.status}</td>
                        <td>{data.is_approved}</td>
                        <td>{data.created_date.slice(0, 10)}</td>
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

export default SubmitProducts;
