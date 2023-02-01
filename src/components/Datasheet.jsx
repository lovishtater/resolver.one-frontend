import Modal from "./Modal";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { getAllTicket } from "../helper/ticketApis";

const getPriorityColor = {
  High: "bg-red-200",
  Intermediate: "bg-yellow-200",
  Low: "bg-green-200",
};

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

const Datasheet = ({ type }) => {
  const user = JSON.parse(localStorage.getItem("resolverUser")).user;
  const [modalOpen, setModalOpen] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [Alltickets, setAllTickets] = useState([]);
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
    console.log("loading tickets", loading);
  }, [loading]);

  useEffect(() => {
    getAllTickets();
  }, []);

  useEffect(() => {
    if (type === "all") {
      setFilteredTickets((prev) => ({ ...prev, tickets: Alltickets }));
    } else {
      setFilteredTickets((prev) => ({ ...prev, tickets: Alltickets.filter(ticket => ticket.assignedTo._id === user._id) }));
    }
  }, [type]);

  return (
    <div>
      <div className="sheet-container">
        {/* <Modal /> */}
        {modalOpen && (
          <Modal ticket={modalOpen} setOpenModal={setModalOpen} setAllTickets={setAllTickets} />
        )}
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
          {error && <div className="text-red-500">{error}</div>}
          {loading || filteredTickets.tickets.length === 0 ? (
            <div className="text-center">
              <h1 className="text-2xl">Loading...</h1>
            </div>
          ) : (
            <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
              <table className="min-w-full text-left">
                <thead className="cursor-pointer">
                  <tr>
                    {col.map((head) => (
                      <th
                        key={head.key}
                        onClick={() => sortTickets(head.key)}
                        className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
                      >
                        {head.label}
                        <i className="fa fa-fw fa-sort"></i>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {filteredTickets.tickets
                    .slice((pageCount - 1) * pageLimit, pageCount * pageLimit)
                    .map((row) => (
                      <tr key={Math.random()}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          {row.title}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-no-wrap border-b text-center text-blue-900 border-gray-500 ${getPriorityColor[row.priority]
                            } text-sm leading-5`}
                        >
                          {row.priority}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                          {row.createdBy.name}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                          <span className="relative inline-block px-3 py-1 font-semibold text-black leading-tight">
                            <span
                              aria-hidden
                              className={`absolute inset-0 opacity-50 ${getStatusColor[row.status]
                                } rounded-full`}
                            ></span>
                            <span className="relative text-xs">{row.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                          {row.assignedTo.name}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                          {moment(row.createdAt).format("DD-MM-YYYY, h:mm a")}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                          <button
                            className="px-5 py-2 border-blue-500 border text-white-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                            onClick={() => setModalOpen(row)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
                <div>
                  <p className="text-sm leading-5 text-blue-700">
                    Showing
                    <span className="font-medium">
                      {" "}
                      {pageCount * pageLimit - (pageLimit - 1)}{" "}
                    </span>{" "}
                    -
                    <span className="font-medium">
                      {" "}
                      {Math.min(
                        pageCount * pageLimit,
                        filteredTickets.tickets.length
                      )}{" "}
                    </span>
                    of
                    <span className="font-medium">
                      {" "}
                      {filteredTickets.tickets.length}{" "}
                    </span>
                    results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex shadow-sm">
                    <div>
                      <a
                        onClick={() =>
                          pageCount > 1 && setPageCount(pageCount - 1)
                        }
                        disabled={pageCount === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 aria-label='Previous' v-on:click.prevent='changePage(pagination.current_page - 1)'"
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
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
                        className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                        aria-label="Next"
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Datasheet;
