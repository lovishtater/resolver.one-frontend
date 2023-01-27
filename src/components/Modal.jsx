import { React, useState } from "react";
import "./Modal.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { addComment } from "../helper/ticketApis";
const setPriorityColor = {
  High: "text-red-700",
  Intermediate: "text-yellow-700",
  Low: "text-green-700",
};

function Modal({ ticket, setOpenModal, setAllTickets }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("resolverUser")).user;
  const [comment, setComment] = useState("");
  const [data, setData] = useState(ticket);

  const onAddComment = () => {
    if (comment === "") {
      return;
    }
    const newComment = {
      comment: comment,
      _id: data._id,
      name: user.name,
      createdAt: Date.now(),
    };
    addComment(newComment).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData(data.ticket);
        setAllTickets((prev) => {
          const index = prev.findIndex(
            (ticket) => ticket._id === data.ticket._id
          );
          prev[index] = data.ticket;
          return [...prev];
        });
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
          <p className="text-base font-bold">
            Assigned To :{" "}
            <span className="font-normal">{data.assignedTo.name}</span>
          </p>
          <p className="text-base">
            <span className="font-bold">Description : </span> <br />
            {data.description}
          </p>
          <p className="mt-4 text-base font-bold">Comments : </p>
          <p className="text-base max-h-40 overflow-y-scroll mt-0">
            {data.comments.map((comment) => (
              <div>
                {/* <p>{comment}</p> */}
                <div class="flex space-x-2 ml-10 mt-2">
                  <div class="block">
                    <div class="bg-gray-100 w-100 rounded-xl px-2 pb-2 mb-1">
                      <div class="font-medium">
                        <small>{comment.name} </small>
                        <span className="text-xs font-normal italic text-red-700">{moment(comment.createdAt).format("DD/MM/YYYY - HH:mm")}</span>
                      </div>
                      <div class="text-xs">{comment.comment}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </p>
          <div class="flex ml-10">
            <div class="mb-3 w-96 text-base">
              <textarea
                class=" form-control block w-full mt-3 px-3 py-2 text-base font-normal text-gray-700 bg-gray-100 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="commentInput"
                rows="2"
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
          <button onClick={() => onAddComment()}>Comment</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
