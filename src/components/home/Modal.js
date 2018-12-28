import React from "react";
import TotalPrice from "./TotalPrice";

const Modal = ({
  closeModal,
  modalState,
  items,
  kolVareNr,
  kolVareExtra,
  kolVareBeskrivelse,
  kolAntalPris,
  kolRabatPct,
  kolBruttoEfterRabat,
  kolBrutto,
  sheetName,
  updated
}) => {
  if (!modalState) {
    return null;
  }

  console.log("items for modal: " + items[0]);

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-card" style={{ width: "90%" }}>
        <header className="modal-card-head">
          <p className="modal-card-title">Enter amount bought</p>
          <button className="delete" onClick={closeModal} />
        </header>
        <section className="modal-card-body">
          {items ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Nr</th>
                  <th>Beskrivelse</th>
                  <th>Antal</th>
                  <th>Brutto</th>
                  <th>Rabat %</th>
                  <th>Netto</th>
                  <th>På lager</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => {
                  return [
                    <tr key={i}>
                      <td>{item[kolVareNr]}</td>
                      <td>{item[kolVareBeskrivelse]}</td>
                      <td>{item[kolAntalPris]}</td>
                      <td>{item[kolBrutto]}</td>
                      <td>{item[kolRabatPct]}</td>
                      <td>{item[kolBruttoEfterRabat]}</td>
                      <td>
                        <TotalPrice
                          efterRabat={item[kolBruttoEfterRabat]}
                          ekstra={item[kolVareExtra]}
                          vareNr={item[kolVareNr]}
                          beskrivelse={item[kolVareBeskrivelse]}
                          brutto={item[kolBrutto]}
                          sheetName={sheetName}
                          closeModal={closeModal}
                          updated={updated}
                        />
                      </td>
                    </tr>
                  ];
                })}
              </tbody>
            </table>
          ) : (
            <div>
              <p>loading..</p>
            </div>
          )}
        </section>
        <footer className="modal-card-foot">
          <p className="text-center">
            Scan like you have never scanned before{" "}
            <span role="img" aria-label="emoji">
              ✌
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
