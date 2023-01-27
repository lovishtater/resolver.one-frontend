import { React, useState } from "react";
import "./Modal.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { addComment } from "../helper/ticketApis";


function Modal({ mockTicket, setOpenModal }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("resolverUser")).user;
  const [data, setData] = useState(mockTicket);
  const [comment, setComment] = useState("");
  const setPriorityColor = {
    High: "text-red-700",
    Intermediate: "text-yellow-700",
    Low: "text-green-700",
  };

  const onAddComment = () => {
    const newComment = {
      comment: comment,
      _id: user._id,
      name: user.name,
    };
    addComment(newComment).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData(data);
        setComment("");
      }
    });
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer h-none">
        <div className="title mb-3">
          <h1
            className="text-xl font-bold text-blue-700 rounded
          "
          >
            {data.title}
          </h1>
        </div>
        <div className="body text-left">
          <p className="text-base font-bold">
            Created at :{" "}
            <span className="font-normal">
              {moment(data.createdAt).format("DD-MM-YYYY, h:mm a")}
            </span>
          </p>
          <p className="text-base font-bold">
            Last modified at :{" "}
            <span className="font-normal">
              {moment(data.updatedAt).format("DD-MM-YYYY, h:mm a")}
            </span>
          </p>
          <p className="text-base font-bold">
            Priority :{" "}
            <span className={`font-bold ${setPriorityColor[data.priority]}`}>
              {data.priority}
            </span>
          </p>
          <p className="text-base font-bold">
            Created By :{" "}
            <span className="font-normal">{data.createdBy.name}</span>
          </p>
          <p className="text-base">
            Description : <br />
            {data.description}
          </p>
          <div class="flex justify-center">
            <div class="mb-3 xl:w-96">
              <textarea
                class=" form-control block w-full mt-3 px-5 py-5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                rows="3"
                placeholder="Your Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
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
            onClick={() => {
              navigate("/updateQuery", { state: data });
            }}
            id="updateBtn"
          >
            Update
          </button>
          <button
          onClick={() => onAddComment()}
          >Comment</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
