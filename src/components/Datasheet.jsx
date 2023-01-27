import Modal from "./Modal";
import React, { useState, useEffect } from "react";
import moment from "moment";
import {getAllTicket} from "../helper/ticketApis";

const getPriorityColor = {
High:"bg-red-200",
Intermediate:"bg-yellow-200",
Low:"bg-green-200"
}

const getStatusColor = {
  Open:"bg-red-200",
  "In-progress":"bg-yellow-200",
  Resolved:"bg-green-200"
}

const Datasheet = () => {
  const col = [
    {
      key : "title",
      label : "Title",
    },
    {
      key : "priority",
      label : "Priority",
    },
    {
      key : "createdBy",
      label : "Created By",
    },
    {
      key : "status",
      label : "Status",
    },
    {
      key : "assignedTo",
      label : "Assigned To",
    },
    {
      key : "createdAt",
      label : "Created At",
    },
    {
      key : "details",
      label : "Details",
    },
  ]
  const [modalOpen, setModalOpen] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const [Alltickets, setAllTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState({
    tickets: [],
    sort: "asc"
  });
  const [error, setError] = useState("");

  const getAllTickets = () => {
    getAllTicket().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setAllTickets(data.tickets);
        setFilteredTickets(prev => ({...prev, tickets:data.tickets}));
      }
    });
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
      sort: filteredTickets.sort === "asc" ? "desc" : "asc"
    });
  };



  useEffect(() => {
    getAllTickets();
  }, []);

  return (
    <div>
      <div className="sheet-container">
        {modalOpen && (
          <Modal mockTicket={modalOpen} setOpenModal={setModalOpen} />
        )}
        {/* <Modal /> */}
        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
          <div class="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
            <div class="flex justify-between"></div>
          </div>
          <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
            <table class="min-w-full">
              <thead>
                <tr>
                  {col.map((head) => (
                    <th 
                    key={head.key}
                    onClick={() => sortTickets(head.key)}
                    class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                      {head.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody class="bg-white">
                {filteredTickets.tickets.slice((pageCount - 1) * pageLimit, pageCount * pageLimit).map((row) => (
                    <tr
                    key={Math.random()}
                    >
                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                        <div class="text-sm leading-5 text-blue-900">
                          {row.title}
                        </div>
                      </td>
                      <td
                        class={`px-6 py-4 whitespace-no-wrap border-b text-center text-blue-900 border-gray-500 ${getPriorityColor[row.priority]} text-sm leading-5`}
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
                            class={`absolute inset-0 opacity-50 ${getStatusColor[row.status]} rounded-full`}
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
            </table>
            <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
              <div>
                <p class="text-sm leading-5 text-blue-700">
                  Showing
                  <span class="font-medium"> {(pageCount * pageLimit) - (pageLimit - 1)} </span> - 
                  <span class="font-medium">
                    {" "}
                    {pageCount * pageLimit ? pageCount * pageLimit : filteredTickets.tickets.length}{" "}
                  </span>
                  of
                  <span class="font-medium"> {filteredTickets.tickets.length} </span>
                  results
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex shadow-sm">
                  <div>
                    <a
                      onClick={() => pageCount>1 && setPageCount(pageCount - 1)}
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
                      onClick={() => pageCount< filteredTickets.tickets.length/5 && setPageCount(pageCount + 1)}
                      disabled={pageCount === filteredTickets.tickets.length / 5}
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
