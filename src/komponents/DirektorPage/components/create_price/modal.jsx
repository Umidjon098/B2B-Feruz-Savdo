import React from "react";

export const Modal = ({ show, close, requiredData }) => {
  let count = 0;
  return (
    <div
      className="modal-wrapper"
      style={{
        transform: show ? "translateY(0vh)" : "translateY(-100vh)",
        opacity: show ? "1" : "0",
      }}
    >
      <div className="modal-header">
        <p>Chegirmadagi mahsulotlar ro'yxati</p>
        <span onClick={close} className="close-modal-btn">
          x
        </span>
      </div>
      <div className="modal-content">
        <div className="modal-body table-responsive">
          <table className="table table-striped table-hover text-center  mb-0 text-white">
            <thead>
              <tr>
                <td scope="col"> T/R</td>
                <td scope="col">Do'kon kodi </td>
                <td scope="col">Ism </td>
                <td scope="col"> Do'kon turi</td>
                <td scope="col">Sotuv agenti </td>
                <td scope="col">Mashrut </td>
                <td scope="col">Hudud </td>
                <td scope="col">Direktor </td>
                <td scope="col"> Telefon raqami(direktor)</td>
                <td scope="col">Tug'ilgan sana </td>
                <td scope="col">Mas'ul agent </td>
                <td scope="col"> Telefon Raqam(ishchi)</td>
                <td scope="col"> Manzili</td>
                <td scope="col"> Target</td>
                <td scope="col"> Uzunlik</td>
                <td scope="col"> Kenglik</td>
                <td scope="col"> INN</td>
              </tr>
            </thead>
            <tbody>
              {requiredData.map((client) => {
                count++;
                return (
                  <tr key={client.id}>
                    <td>{count}</td>
                    <td>{client.market_code}</td>
                    <td>{client.name}</td>
                    <td>{client.market_type.name}</td>
                    <td>
                      {client.sale_agent.first_name +
                        " " +
                        client.sale_agent.last_name}
                    </td>
                    <td>{client.car.name}</td>
                    <td>{client.territory.name}</td>
                    <td>{client.director}</td>
                    <td>{client.director_phone_number}</td>
                    <td>{client.birthdate}</td>
                    <td>{client.responsible_agent}</td>
                    <td>{client.work_phone_number}</td>
                    <td>{client.address}</td>
                    <td>{client.target}</td>
                    <td>{client.longitude}</td>
                    <td>{client.latitude}</td>
                    <td>{client.INN}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* <div className="modal-footer">
                    <button onClick={close} className="btn-cancel">Close</button>
                </div> */}
      </div>
    </div>
  );
};
