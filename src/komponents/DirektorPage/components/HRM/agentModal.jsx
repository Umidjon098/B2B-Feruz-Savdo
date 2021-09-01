import React from "react";

const AgentModal = ({ show, close, AgentPlanList }) => {
  return (
    <div
      className="modal-wrapper"
      style={{
        transform: show ? "translateY(0vh)" : "translateY(-90vh)",
        opacity: show ? "1" : "0",
      }}
    >
      <div className="modal-header">
        <p>Agentga biriktirilgan rejalar</p>
        <span onClick={close} className="close-modal-btn">
          x
        </span>
      </div>
      <div className="modal-content">
        <div className="modal-body table-responsive">
          <table className="table table-striped table-hover text-center  mb-0 text-white">
            <thead>
              <tr>
                <td scope="col">Reja nomi</td>
                <td scope="col">Tugash sanasi</td>
                <td scope="col">Bajarilgan foizi</td>
              </tr>
            </thead>
            <tbody>
              {AgentPlanList.map((list) => {
                return (
                  <tr>
                    <td>{list.name}</td>
                    <td>{list.deadline}</td>
                    <td>{list.percent}</td>
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

export default AgentModal;
