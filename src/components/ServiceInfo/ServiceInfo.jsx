import React, { useState, useEffect } from "react";
import ServiceInfoTable from "../ServiceInfoTable/ServiceInfoTable";
import { ServiceTableData } from "../../Data/Data";
import SpendingAndPayments from "../SpendingAndPayments/SpendingAndPayments";
import Cards from "../Cards/Cards";
import {
  UilCheckCircle,
  UilCreditCard,
  UilCalendar,
} from "@iconscout/react-unicons";
import SearchBar from "../SearchBar/SearchBar";

const tabs = ["Active", "Upcoming", "Expired"];

const generateCardsData = (subscriptions) => {
  const activeSubscriptions = subscriptions.filter(
    (sub) => sub.state === "Active",
  ).length;

  const monthlySpending = subscriptions.reduce((total, sub) => {
    if (sub.state === "Expired" || sub.expired === "true") return total;

    const amount =
      typeof sub.amount === "number"
        ? sub.amount
        : parseInt(sub.amount.replace(/[^\d]/g, ""), 10);

    const monthly = sub.billing === "Yearly" ? Math.round(amount / 12) : amount;

    return total + monthly;
  }, 0);

  const upcomingCount = subscriptions.filter(
    (sub) => sub.upcoming === "true",
  ).length;

  return [
    {
      title: "Active Subscription",
      value: `${activeSubscriptions}`,
      color: {
        backGround: "#E0B0FF",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      png: UilCheckCircle,
    },
    {
      title: "Monthly Spending",
      value: `₹${monthlySpending}`,
      color: {
        backGround: "#F66267",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      png: UilCreditCard,
    },
    {
      title: "Upcoming Renewal",
      value: `${upcomingCount}`,
      color: {
        backGround:
          "linear-gradient(rgb(248,212,154) -146.42%, rgb(255,202,113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #FDD59B",
      },
      png: UilCalendar,
    },
  ];
};

const ServiceInfo = () => {
  const [activeTab, setActiveTab] = useState("Active");
  const [subscriptions, setSubscriptions] = useState(ServiceTableData);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");
  const [filter, setFilter] = useState("Active");

  useEffect(() => {
    if (currentQuery) {
      onSearch(currentQuery, filter);
    }
  }, [filter]);

  const filteredData = subscriptions.filter((item) => {
    if (activeTab === "Upcoming") {
      return item.upcoming === "true";
    }
    if (activeTab === "Expired") {
      return item.state === "Expired";
    }
    return item.state === activeTab;
  });

  const handleDelete = (name) => {
    setPendingDelete(name);
    // setSubscriptions(subscriptions.filter((sub) => sub.name !== name));
  };

  return (
    <div>
      {showResults && (
        <div className="fixed justify-center h-[70%] items-center z-50 text-black flex top-0 left-0 w-full h-full shadow-lg backdrop-blur bg-black/40">
          <div className="bg-gray-100 p-6 rounded-lg w-2xl flex flex-col">
            <div className="flex flex-row justify-between w-full items-start">
              <div className="py-4">
                <h2 className="text-3xl font-bold">Search Results</h2>
                <span className="text-gray-500">
                  Details of your Subscription below.
                </span>
              </div>
              <button
                onClick={() => setShowResults(false)}
                className="text-gray-500 hover:text-gray-800 cursor-pointer"
              >
                ✖
              </button>
            </div>
            {filteredResults.length > 0 ? (
              <div>
                {filteredResults.map((item, index) => (
                  <div
                    key={index}
                    className="w-full gap-6 grid grid-cols-2 p-2 rounded-lg"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="block text-lg font-medium text-gray-700">
                        Service Name
                      </div>
                      <div className="w-full rounded bg-white text-lg border px-2 text-gray-900">
                        {item.name}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="block text-lg font-medium text-gray-700">
                        Plan
                      </div>
                      <div className="w-full rounded bg-white text-lg border px-2 text-gray-900">
                        {item.plan}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="block text-lg font-medium text-gray-700">
                        Billing
                      </div>
                      <div className="w-full rounded bg-white text-lg border px-2 text-gray-900">
                        {item.billing}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="block text-lg font-medium text-gray-700">
                        Category
                      </div>
                      <div className="w-full rounded bg-white text-lg border px-2 text-gray-900">
                        {item.category}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="block text-lg font-medium text-gray-700">
                        Next Payment
                      </div>
                      <div className="w-full rounded bg-white text-lg border px-2 text-gray-900">
                        {item.nextPayment}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="block text-lg font-medium text-gray-700">
                        Payment Method
                      </div>
                      <div className="w-full rounded bg-white text-lg border px-2 text-gray-900">
                        {item.paymentMethod +
                          " " +
                          "(" +
                          item.last4Digits +
                          ")"}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="block text-lg font-medium text-gray-700">
                        Amount
                      </div>
                      <div className="w-full rounded bg-white text-lg border px-2 text-gray-900">
                        {item.amount}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No results found.</p>
            )}
          </div>
        </div>
      )}
      <h1 className="font-bold text-5xl text-black py-4">
        Subscription Tracker
      </h1>
      <SearchBar
        onSearch={(query) => {
          const loweredQuery = query.toLowerCase();
          const results = subscriptions
            .filter((data) => data.name.toLowerCase().includes(loweredQuery))
            .filter((data) => {
              if (filter === "Upcoming") return data.upcoming === "true";
              if (filter === "Expired") return data.state === "Expired";
              return data.state === "Active";
            });

          setCurrentQuery(query);
          setFilteredResults(results);
          setShowResults(true);
        }}
      />
      <Cards CardsData={generateCardsData(subscriptions)} />
      <SpendingAndPayments subscriptions={subscriptions} />
      <div className="text-black pt-8 flex flex-row justify-between items-center w-full">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row bg-gray-100 shadow-inner rounded-lg shadow-lg overflow-hidden p-2">
            {tabs.map((tab) => (
              <span
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setFilter(tab);
                }}
                className={`cursor-pointer p-2 px-6 transition-all duration-200 rounded-lg ${
                  activeTab === tab
                    ? "bg-white text-[#7D5BA6] font-semibold"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>
      </div>
      {pendingDelete && (
        <div className="fixed top-0 left-0 w-full h-full backdrop-blue-sm bg-black/40 text-black flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4 max-w-md w-full justify-center items-center">
            <h1 className="text-xl font-semibold py-4">
              Are you sure you want to cancel this subscription?
            </h1>
            <div className="flex justify-between w-[80%] gap-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  setSubscriptions(
                    subscriptions.filter((sub) => sub.name !== pendingDelete),
                  );
                  setPendingDelete(null); // close modal
                }}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                onClick={() => setPendingDelete(null)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <ServiceInfoTable data={filteredData} onDelete={handleDelete} />
    </div>
  );
};

export default ServiceInfo;
