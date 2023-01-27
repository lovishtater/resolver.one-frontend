import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTicket } from "../helper/ticketApis";

function QueryModal() {
  const user = JSON.parse(localStorage.getItem("resolverUser")).user;
  console.log(user);
  const priorityType = ["Low", "Medium", "High"];
  const statusType = ["Open", "In-progress", "Resolved"];
  const assignedTo = ["Shakti", "Lovish", "Saurabh", "Sarthak"];
  const [queryData, setQueryData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    assignedTo: "",
    createdBy: user,
    comments: [],
  });

  const onInputChange = (e) => {
    setQueryData({ ...queryData, [e.target.name]: e.target.value });
  };

  let navigate = useNavigate();

  return (
    <div>
      <section class="max-w-4xl p-6 mx-auto shadow-md dark:bg-white-800 mt-20 border-2 border-blue-500 border-dashed rounded-md">
        <h1 class="text-xl font-bold text-white capitalize dark:text-pink-500">
          Register Query
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
            onChange={(e) => onInputChange(e)}
            class="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-gray-300 rounded-md dark:bg-white-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
              {assignedTo.map((assign) => (
                <option>{assign}</option>
              ))}
            </select>
          </div>

          
          {/* <div>
              <label class="block text-sm font-medium text-black">
                Attachments
              </label>
              <div class="mt-1 flex justify-center px-3 pt-2 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <svg
                    class="mx-auto h-12 w-12 text-grey-300"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label
                      for="file-upload"
                      class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span class="">Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        class="sr-only"
                      />
                    </label>
                  </div>
                  <p class="text-xs text-gray-700">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div> */}
        </div>

        <div class="flex justify-end mt-6">
          <button
            class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600 mr-4"
            onClick={() => navigate("/")}
          >
            Close
          </button>
          <button class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
            Submit
          </button>
        </div>
      </section>
    </div>
  );
}

export default QueryModal;
