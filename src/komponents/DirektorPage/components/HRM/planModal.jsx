import React from "react";
const PlanModal = ({ show, close, PlanList }) => {
  return (
    <div
      className="modal-wrapper"
      style={{
        transform: show ? "translateY(0vh)" : "translateY(-90vh)",
        opacity: show ? "1" : "0",
      }}
    >
      <div className="modal-header">
        <p>Rejaga biriktirilgan mahsulotlar</p>
        <span onClick={close} className="close-modal-btn">
          x
        </span>
      </div>
      <div className="modal-content">
        <div className="modal-body table-responsive">
          <table className="table table-striped table-hover text-center  mb-0 text-white">
            <thead>
              <tr>
                <td scope="col">Mahsulot nomi</td>
                <td scope="col">Kategoriya</td>
                <td scope="col">Mahsulot miqdori</td>
              </tr>
            </thead>
            <tbody>
              {PlanList.map((list) => {
                return (
                  <tr>
                    <td>{list.product.name}</td>
                    <td>{list.product.category.name}</td>
                    <td>{list.quantity}</td>
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
export default PlanModal;
