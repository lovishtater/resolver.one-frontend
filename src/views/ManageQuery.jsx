import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllUsers } from "../helper/authApis";
import { createTicket, updateTicket } from "../helper/ticketApis";

function QueryModal({ action }) {
  const updateQueryData = useLocation().state;
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("resolverUser")).user;
  const createQueryData = {
    title: "",
    description: "",
    status: "Open",
    priority: "Low",
    assignedTo: "Lovish",
    createdBy: user,
    comments: [],
  };
  
  const priorityType = ["Low", "Intermediate", "High"];
  const statusType = ["Open", "In-progress", "Resolved"];

  const [assignedTo, setAssignedTo] = useState([]);
  const [error, setError] = useState("");
  const [queryData, setQueryData] = useState(action === "create" ? createQueryData : updateQueryData);

  const onQuerySubmit = () => {
    setError("");
    if (queryData.title === "" || queryData.description === "" || queryData.priority === "" || queryData.status === "" || queryData.assignedTo === "") {
      setError("Please fill all the fields");
      return;
    }
    if (action === "create") {
      createTicket(queryData).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError("");
          navigate("/")
        }
      });
    } else {
      updateTicket(queryData).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError("");
          navigate("/")
        }
      });
    }
  };

  const onInputChange = (e) => {
    console.log(e.target.name, e.target);
    setQueryData({ ...queryData, [e.target.name]: e.target.value });
  };

  const onAssignedToChange = (e) => {
    const id = e.target.value;
    console.log(id);
    const user = assignedTo.find((user) => user._id === id);
    setQueryData({ ...queryData, assignedTo: user });
  };

  useEffect(() => {
    getAllUsers().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setAssignedTo(data.users);
      }
    });
  }, []);



  return (
    <div>
      <section class="max-w-4xl p-6 mx-auto shadow-md dark:bg-white-800 mt-20 border-2 border-blue-500 border-dashed rounded-md">
        <h1 class="text-xl font-bold text-white capitalize dark:text-pink-500">
          {action === "create" ? "Create Query" : "Update Query"}
        </h1>
        <div>
          <div className="mt-4">
            <label class="text-black dark:text-black-200" for="username">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={queryData.title}
              onChange={(e) => onInputChange(e)}
              className="text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-50 border-2 border-gray-300 border-dashed rounded-md"
              placeholder="Enter Query Title"
              required
            />
          </div>

          <div className="mt-4">
            <label class="text-black dark:text-black-200 " for="description">
              Description
            </label>
            <textarea
              id="textarea"
              type="textarea"
              name="description"
              value={queryData.description}
              onChange={(e) => onInputChange(e)}
              className="text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-50 border-2 border-gray-300 border-dashed rounded-md"
            ></textarea>
          </div>


          <div className="mt-4">
            <label class="text-black dark:text-black-200" for="priority">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={queryData.priority}
              onChange={(e) => onInputChange(e)}
              class="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-gray-300 rounded-md dark:bg-white-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
              {priorityType.map((priority) => (
                <option>{priority}</option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label class="text-black dark:text-black-200" for="status">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={queryData.status}
              onChange={(e) => onInputChange(e)}
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
              {statusType.map((status) => (
                <option>{status}</option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label class="text-black dark:text-black-200" for="assignTo">
              Assign To:
            </label>
            <select
              id="assignTo"
              name="assignedTo"
              value={queryData.assignedTo}
              onChange={(e) => onAssignedToChange(e)}
              class="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-gray-300 rounded-md dark:bg-white-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
              {assignedTo.map((assign) => (
                <option
                  value={assign._id}
                >{assign.name} {` - (`} {assign.team} {`)`} </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div class="mt-4 bg-red-100 rounded-lg py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full" role="alert">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
            </svg>
            <span>{error}</span>
          </div>
        )}



        <div class="flex justify-end mt-6">
          <button
            class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600 mr-4"
            onClick={() => navigate("/")}
          >
            Close
          </button>
          <button
            onClick={(e) => onQuerySubmit(e)}
            class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
            {action === "create" ? "Add Query" : "Update Query"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default QueryModal;
