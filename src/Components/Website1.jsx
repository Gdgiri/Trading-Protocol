import React, { useState, useEffect } from "react";
import axios from "axios";

const Website1 = () => {
  const [transactions, setTransactions] = useState([]);

  const handleTransaction = async (status) => {
    const newTransaction = { name: "BTC-USD", price: 2500, status };

    try {
      await axios.post("http://localhost:5000/api/transaction", newTransaction);
      fetchTransactions();
    } catch (error) {
      console.error("Error processing transaction:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/transactions"
      );
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl text-center max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6">BTC-USD Buy/Sell</h2>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
            onClick={() => handleTransaction("buy")}
          >
            Buy @ ₹2500
          </button>
          <button
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
            onClick={() => handleTransaction("sell")}
          >
            Sell @ ₹2500
          </button>
        </div>
        <h3 className="text-xl font-semibold mb-4">Last 3 Transactions:</h3>
        <ul className="space-y-3">
          {transactions.slice(0, 3).map((tx, index) => (
            <li
              key={index}
              className="bg-gray-700 p-4 rounded-lg shadow-md transform hover:scale-105 transition duration-300"
            >
              {tx.name} - ₹{tx.price} -{" "}
              <span
                className={
                  tx.status === "buy" ? "text-green-400" : "text-red-400"
                }
              >
                {tx.status.toUpperCase()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Website1;
