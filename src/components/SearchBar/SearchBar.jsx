import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [serviceNameError, setServiceNameError] = useState(false);
  const [plan, setPlan] = useState("");
  const [planError, setPlanError] = useState(false);
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState(false);
  const [cardOrUPI, setCardOrUPI] = useState("");
  const [cardOrUPIError, setCardOrUPIError] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [startDateError, setStartDateError] = useState(false);
  const [addSubscription, setAddSubscription] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Active");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query, filter);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWasSubmitted(true);

    let hasError = false;

    if (!serviceName.trim()) {
      setServiceNameError(true);
      hasError = true;
    } else {
      setServiceNameError(false);
    }

    if (!plan.trim()) {
      setPlanError(true);
      hasError = true;
    } else {
      setPlanError(false);
    }

    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      setPriceError(true);
      hasError = true;
    } else {
      setPriceError(false);
    }

    if (!cardOrUPI.trim() || cardOrUPI.length !== 4 || isNaN(cardOrUPI)) {
      setCardOrUPIError(true);
      hasError = true;
    } else {
      setCardOrUPIError(false);
    }

    if (!startDate.trim()) {
      setStartDateError(true);
      hasError = true;
    } else {
      setStartDateError(false);
    }

    if (!hasError) {
      console.log("Form submitted successfully:", {
        serviceName,
        plan,
        price,
        cardOrUPI,
        startDate,
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 text-gray-700 py-4">
      {/* Search */}
      <div className="w-full lg:w-[66.5%] bg-white rounded-[0.5rem] h-[2rem] flex items-center py-6 px-4 gap-4 shadow-lg">
        <svg
          fill="#000000"
          height="15px"
          width="15px"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488.4 488.4"
        >
          <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c4.8,4.8,12.5,4.8,17.3,0 s4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7S381.9,104.65,381.9,203.25z" />
        </svg>
        <form
          className="flex flex-row justify-between items-center w-full"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(query, filter); // ✅ filter is defined in this component
          }}
        >
          <input
            type="text"
            className="flex-1 bg-transparent focus:outline-none"
            placeholder="Search subscription"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Filter + Add Subscription */}
      <div className="flex flex-row w-full lg:w-[33%] gap-4">
        {/* Filter */}
        <div className="relative flex-1 shadow-lg">
          <div
            className="w-full bg-white text-blue-700 rounded-[0.5rem] h-[3rem] flex items-center gap-3 cursor-pointer pl-4 pr-2 hover:bg-gray-100"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <svg
              height="15px"
              width="15px"
              viewBox="0 0 210.68 210.68"
              className="fill-blue-700"
            >
              <path d="M205.613,30.693c0-10.405-10.746-18.149-32.854-23.676C154.659,2.492,130.716,0,105.34,0 C79.965,0,56.021,2.492,37.921,7.017C15.813,12.544,5.066,20.288,5.066,30.693c0,3.85,1.476,7.335,4.45,10.479l68.245,82.777v79.23 c0,2.595,1.341,5.005,3.546,6.373c1.207,0.749,2.578,1.127,3.954,1.127c1.138,0,2.278-0.259,3.331-0.78l40.075-19.863 c2.55-1.264,4.165-3.863,4.169-6.71l0.077-59.372l68.254-82.787C204.139,38.024,205.613,34.542,205.613,30.693z" />
            </svg>
            <span>Filter: {filter}</span>
          </div>
          {dropdownOpen && (
            <div className="absolute top-[3.2rem] left-0 w-full bg-white rounded-[0.5rem] transition-all duration-300 ease z-50 shadow-lg">
              <h3 className="font-bold p-2 text-black border-b border-gray-100">
                Filter by:
              </h3>
              <ul className="flex flex-col text-black">
                {["Active", "Upcoming", "Expired"].map((label, i) => (
                  <li
                    key={label}
                    onClick={() => handleFilterChange(label)}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex flex-row gap-2 ${
                      i === 2 ? "hover:rounded-b-lg" : ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      className="fill-blue-700"
                    >
                      <path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z" />
                    </svg>
                    {label}
                  </li>
                ))}{" "}
              </ul>
            </div>
          )}
        </div>

        {/* Add Subscription */}
        <div className="flex-1 shadow-lg">
          <div
            className="w-full bg-red-400 text-white hover:bg-red-500 items-center rounded-[0.5rem] h-[3rem] flex justify-start gap-3 cursor-pointer pl-4 pr-2"
            onClick={() => setAddSubscription(true)}
          >
            <svg
              width="15px"
              height="15px"
              viewBox="0 0 45.402 45.402"
              className="fill-white"
            >
              <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z" />
            </svg>
            Add Subscription
          </div>
        </div>
      </div>
      {addSubscription && (
        <div className="fixed justify-center h-[70%] items-center z-50 flex top-0 left-0 w-full h-full shadow-lg backdrop-blur bg-black/40">
          <div className="flex flex-col bg-white rounded-lg p-6 w-2xl">
            <div className="flex flex-row justify-between w-full items-start">
              <div>
                <h1 className="text-3xl font-bold">Add New Subscription</h1>
                <span>Enter the details of your new subscription below.</span>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  className="fill-black cursor-pointer"
                  onClick={() => setAddSubscription(false)}
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </div>
            </div>
            <form
              noValidate
              onSubmit={handleSubmit}
              id="subscription-form"
              className="max-w-xl p-6 bg-white rounded-lg space-y-6"
            >
              {/* Service Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Service Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Netflix, Spotify, etc."
                  className={`mt-1 w-full rounded-md border p-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-1 peer ${
                    wasSubmitted && serviceNameError
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  }`}
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                />
                {wasSubmitted && serviceNameError && (
                  <p className="mt-1 text-sm text-red-600">
                    Please enter a service name.
                  </p>
                )}
              </div>

              {/* Plan and Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Plan
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Premium, Basic, etc."
                    className={`mt-1 w-full rounded-md border p-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-1 peer ${
                      wasSubmitted && planError
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    }`}
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                  />
                  {wasSubmitted && planError && (
                    <p className="mt-1 text-sm text-red-600">
                      Please enter a valid plan.
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    placeholder="9.99"
                    className={`mt-1 w-full rounded-md border p-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-1 peer ${
                      wasSubmitted && priceError
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    }`}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  {wasSubmitted && priceError && (
                    <p className="mt-1 text-sm text-red-600">
                      Please enter a valid price.
                    </p>
                  )}
                </div>
              </div>

              {/* Billing Cycle & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Billing Cycle
                  </label>
                  <select className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500">
                    <option>Monthly</option>
                    <option>Yearly</option>
                    <option>Weekly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500">
                    <option>Entertainment</option>
                    <option>Music</option>
                    <option>Productivity</option>
                    <option>Shopping</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Start Date & Payment Method */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    className={`mt-1 w-full rounded-md border p-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-1 peer ${
                      wasSubmitted && startDateError
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    }`}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  {wasSubmitted && startDateError && (
                    <p className="mt-1 text-sm text-red-600">
                      Please select a start date.
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Payment Method
                  </label>
                  <select className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500">
                    <option>Credit Card</option>
                    <option>Debit Card</option>
                    <option>UPI</option>
                    <option>Net Banking</option>
                  </select>
                </div>
              </div>

              {/* Card / UPI */}
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Card Number Or UPI Number
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  (last 4 digits)
                </label>
                <input
                  type="text"
                  maxLength="4"
                  required
                  placeholder="1234"
                  className={`mt-1 w-full rounded-md border p-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-1 peer ${
                    wasSubmitted && cardOrUPIError
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  }`}
                  value={cardOrUPI}
                  onChange={(e) => setCardOrUPI(e.target.value)}
                />
                {wasSubmitted && cardOrUPIError && (
                  <p className="mt-1 text-sm text-red-600">
                    Please enter a valid 4-digit number.
                  </p>
                )}
              </div>
            </form>

            {/* Submit Buttons */}
            <div className="flex flex-row justify-end gap-4 items-center">
              <button
                className="bg-white shadow rounded-lg p-2 cursor-pointer px-4 hover:bg-grey-500 hover:text-black"
                onClick={() => setAddSubscription(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                form="subscription-form"
                className="bg-purple-300 cursor-pointer text-white shadow hover:bg-purple-700 rounded-lg p-2 px-4 flex flex-row gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  className="fill-white"
                >
                  <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                </svg>
                Add Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SearchBar;
