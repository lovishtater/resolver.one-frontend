import Modal from "./Modal";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { getAllTicket } from "../helper/ticketApis";

const getPriorityColor = {
  High: "bg-red-200",
  Intermediate: "bg-yellow-200",
  Low: "bg-green-200"
}

const getStatusColor = {
  Open: "bg-red-200",
  "In-progress": "bg-yellow-200",
  Resolved: "bg-green-200",
};

const col = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "priority",
    label: "Priority",
  },
  {
    key: "createdBy",
    label: "Created By",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "assignedTo",
    label: "Assigned To",
  },
  {
    key: "createdAt",
    label: "Created At",
  },
  {
    key: "details",
    label: "Details",
  },
];

const Datasheet = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const [Alltickets, setAllTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredTickets, setFilteredTickets] = useState({
    tickets: [],
    sort: "asc",
  });
  const [error, setError] = useState("");

  const getAllTickets = () => {
    setLoading(true);
    getAllTicket().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setAllTickets(data.tickets);
        setFilteredTickets((prev) => ({ ...prev, tickets: data.tickets }));
      }
    });
    setLoading(false);
  };

  const sortTickets = (key) => {
    let sortedTickets = [...Alltickets];
    sortedTickets.sort((a, b) => {
      let prev = a[key];
      let next = b[key];
      if (key === "createdBy") {
        prev = a[key].name;
        next = b[key].name;
      }
      if (prev < next) {
        return filteredTickets.sort === "asc" ? -1 : 1;
      } else if (prev > next) {
        return filteredTickets.sort === "asc" ? 1 : -1;
      } else {
        return 0;
      }
    });
    setFilteredTickets({
      tickets: sortedTickets,
      sort: filteredTickets.sort === "asc" ? "desc" : "asc",
    });
  };

  useEffect(() => {
    getAllTickets();
  }, []);

  return (
    <div>
      <div className="sheet-container">

            {/* <Modal /> */}
            {modalOpen && (
              <Modal mockTicket={modalOpen} setOpenModal={setModalOpen} />
            )}
            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
              <div class="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
                <div class="flex justify-between"></div>
              </div>
              <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
                <table class="min-w-full text-left">
                  <thead className="cursor-pointer">
                    <tr>
                      {col.map((head) => (
                        <th
                          key={head.key}
                          onClick={() => sortTickets(head.key)}
                          class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
                        >
                          {head.label}
                          <i class="fa fa-fw fa-sort"></i>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  {loading ? (
            <div >
            <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
                  <tbody class="bg-white">
                    {filteredTickets.tickets
                      .slice((pageCount - 1) * pageLimit, pageCount * pageLimit)
                      .map((row) => (
                        <tr key={Math.random()}>
                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="text-sm leading-5 text-blue-900">
                              {row.title}
                            </div>
                          </td>
                          <td
                            class={`px-6 py-4 whitespace-no-wrap border-b text-center text-blue-900 border-gray-500 ${getPriorityColor[row.priority]
                              } text-sm leading-5`}
                          >
                            {row.priority}
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                            {row.createdBy.name}
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                            <span class="relative inline-block px-3 py-1 font-semibold text-black leading-tight">
                              <span
                                aria-hidden
                                class={`absolute inset-0 opacity-50 ${getStatusColor[row.status]
                                  } rounded-full`}
                              ></span>
                              <span class="relative text-xs">{row.status}</span>
                            </span>
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                            {row.assignedTo}
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                            {moment(row.createdAt).format("DD-MM-YYYY, h:mm a")}
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                            <button
                              class="px-5 py-2 border-blue-500 border text-white-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                              onClick={() => setModalOpen(row)}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                    )}
                </table>
                <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
                  <div>
                    <p class="text-sm leading-5 text-blue-700">
                      Showing
                      <span class="font-medium">
                        {" "}
                        {pageCount * pageLimit - (pageLimit - 1)}{" "}
                      </span>{" "}
                      -
                      <span class="font-medium">
                        {" "}
                        {Math.min(pageCount * pageLimit, filteredTickets.tickets.length)}{" "}
                      </span>
                      of
                      <span class="font-medium">
                        {" "}
                        {filteredTickets.tickets.length}{" "}
                      </span>
                      results
                    </p>
                  </div>
                  <div>
                    <nav class="relative z-0 inline-flex shadow-sm">
                      <div>
                        <a
                          onClick={() =>
                            pageCount > 1 && setPageCount(pageCount - 1)
                          }
                          disabled={pageCount === 1}
                          class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 aria-label='Previous' v-on:click.prevent='changePage(pagination.current_page - 1)'"
                        >
                          <svg
                            class="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </a>
                      </div>
                      <div></div>
                      <div v-if="pagination.current_page < pagination.last_page">
                        <a
                          onClick={() =>
                            pageCount < filteredTickets.tickets.length / 5 &&
                            setPageCount(pageCount + 1)
                          }
                          disabled={
                            pageCount === filteredTickets.tickets.length / 5
                          }
                          class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                          aria-label="Next"
                        >
                          <svg
                            class="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </a>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
      
      </div>
    </div>
  );
};

export default Datasheet;
