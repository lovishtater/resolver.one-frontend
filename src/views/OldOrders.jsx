import React, { useEffect, useCallback, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { getOrders, getGrades, getGradeGroups } from "../helper/orderApis";

const OldOrder = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = React.useState([]);
  const col = ["id", "name", "grade", "gradeGroup", "status"];
  const [cachedGrades, setCachedGrades] = React.useState({});
  const [cachedGradeGroups, setCachedGradeGroups] = React.useState({});
  const counter = useRef(0);

  counter.current += 1;
  console.log("total render is " + counter.current) 

  const ordersAPI = () => {
    getOrders().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const gradesAPI = () => {
    getGrades().then((data) => {
        if (data.error) {
            console.log(data.error);
        } else {
            setCachedGrades(data);
        }
    });
};
    const gradeGroupsAPI = () => {
        getGradeGroups().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCachedGradeGroups(data);
            }
        });
    };

  useEffect(() => {
    ordersAPI();
    gradesAPI();
    gradeGroupsAPI();  
  }, []);

  return (
    <div>
      <h1 className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">
        Orders
      </h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => navigate("/orders")}
      >
        new Orders
      </button>
      <table className="table">
        <thead className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
          <tr key="header" className="table-primary">
            {col.map((head) => (
              <th
                className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
                key={head}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-light table-striped table-hover">
          {orders.map((order) => {
            const grade = cachedGrades[order.gradeId];
            return (
              <tr key={order._id} className="table-primary">
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {order._id}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {order.orderNumber}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {grade?.displayName}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {cachedGradeGroups[grade?.gradeGroupId]?.name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {order.orderStatus}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OldOrder;
