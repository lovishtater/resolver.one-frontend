import { React, useState } from "react";
import "./Modal.css";

function Modal({ mockTicket, setOpenModal }) {
  const [data, setData] = useState(mockTicket);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h1>{data.title}</h1>
        </div>
        <div className="body">
          <p>{data.description}</p>
          <div class="flex justify-center">
            <div class="mb-3 xl:w-96">
              <textarea
                class="
        form-control
        block
        w-full
        px-5
        py-5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Your message"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Close
          </button>
          <button>Resolve</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
