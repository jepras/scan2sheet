import React from "react";
import TotalPrice from "./TotalPrice";

const Modal = ({ closeModal, modalState, items }) => {
  if (!modalState) {
    return null;
  }
  console.log(items);
  console.log(items[0]);
  const data = ["lala"];

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Enter amount bought</p>
          <button className="delete" onClick={closeModal} />
        </header>
        <section className="modal-card-body">
          <table className="table">
            <thead>
              <tr>
                <th>vare</th>
                <th>brutto</th>
                <th>antalpris</th>
                <th>netto</th>
                <th>rabat %</th>
                <th>netto efter rabat</th>
                <th>antal købt og pris</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => {
                return [
                  <tr key={i}>
                    <td>{item[1]}</td>
                    <td>{item[5]}</td>
                    <td>{item[4]}</td>
                    <td>{item[6]}</td>
                    <td>{item[7]}</td>
                    <td>{item[8]}</td>
                    <td>
                      <TotalPrice efterRabat={item[8]} />
                    </td>
                  </tr>
                ];
              })}
            </tbody>
          </table>
        </section>
        <footer className="modal-card-foot">
          <button
            className="button button-primary button-shadow"
            /* onClick={submitModal(data)} */
          >
            Submit
          </button>
          <button className="button button-secondary" onClick={closeModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
