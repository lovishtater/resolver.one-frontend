import { React, useState } from "react";
import "./Modal.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Modal({ mockTicket, setOpenModal }) {
  const navigate = useNavigate();
  const [data, setData] = useState(mockTicket);

  return (
    <div className="modalBackground">
      <div className="modalContainer h-none">
        <div className="title mb-3">
          <h1 className="text-xl font-bold text-blue-700 rounded
          ">{data.title}</h1>
        </div>
        <div className="body text-left">
          <p className="text-base font-bold">
            Date :{" "}
            <span className="font-normal">
              {moment(data.createdAt).format("DD-MM-YYYY, h:mm a")}
            </span>
          </p>
          <p className="text-base font-bold">
            Priority : <span className="font-normal">{data.priority}</span>
          </p>
          <p className="text-base font-bold">
            Created By :{" "}
            <span className="font-normal">{data.createdBy.name}</span>
          </p>
          <p className="text-base">
            Description : <br />
            {data.description}</p>
          <div class="flex justify-center">
            <div class="mb-3 xl:w-96">
              <textarea
                class=" form-control block w-full mt-3 px-5 py-5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
          <button 
          onClick={() => {navigate("/updateQuery", {state: data})}}
          id="updateBtn">
            Update
          </button>
          <button>Comment</button>
          <button id="resolveBtn">Resolve</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
