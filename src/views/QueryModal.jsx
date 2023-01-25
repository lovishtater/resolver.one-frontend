import React from "react";
import "./Modal.css";
import { useNavigate } from "react-router-dom";

function QueryModal() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };

  return (
    <div>
      <section class="max-w-4xl p-6 mx-auto bg-red-400 rounded-md shadow-md dark:bg-white-800 mt-20">
        <h1 class="text-xl font-bold text-white capitalize dark:text-white">
          Register Query
        </h1>
        <form>
          <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 ">
            <div>
              <label class="text-black dark:text-black-200" for="username">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-50 border-2 border-gray-300 border-dashed rounded-md"
                placeholder="Enter Query Title"
                required
              />
            </div>

            <div>
              <label class="text-black dark:text-black-200" for="priority">
                Priority
              </label>
              <select class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label class="text-black dark:text-black-200" for="assignTo">
                Assign To:
              </label>
              <select class="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-gray-300 rounded-md dark:bg-white-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                <option>User 1</option>
                <option>User 2</option>
                <option>User 3</option>
                <option>User 4</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-black">
                Attachments
              </label>
              <div class="mt-1 flex justify-center px-3 pt-2 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <svg
                    class="mx-auto h-12 w-12 text-white"
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
            </div>
          </div>

          <div>
            <label class="text-black dark:text-black-200 " for="description">
              Description
            </label>
            <textarea
              id="textarea"
              type="textarea"
              class="block w-full px-28 py-9 mt-2 text-gray-700 bg-white border dark:bg-white dark:text-black focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring border-gray-300 border-dashed rounded-md"
            ></textarea>
          </div>

          <div class="flex justify-end mt-6">
            <button
              class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600 mr-4"
              onClick={routeChange}
            >
              Close
            </button>
            <button class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default QueryModal;
