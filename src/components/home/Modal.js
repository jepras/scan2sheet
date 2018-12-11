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
                <th>Vare</th>
                <th>Brutto</th>
                <th>Antalpris</th>
                <th>Rabat %</th>
                <th>Netto efter rabat</th>
                <th>Antal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => {
                return [
                  <tr key={i}>
                    <td>{item[1]}</td>
                    <td>{item[5]}</td>
                    <td>{item[4]}</td>
                    <td>{item[7]}</td>
                    <td>{item[8]}</td>
                    <td>
                      <TotalPrice
                        efterRabat={item[8]}
                        vareNr={item[0]}
                        beskrivelse={item[1]}
                        brutto={item[5]}
                        closeModal={closeModal}
                      />
                    </td>
                  </tr>
                ];
              })}
            </tbody>
          </table>
        </section>
        <footer className="modal-card-foot">
          <p className="text-center">
            remember to love your little brother <span role="img">✌</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
