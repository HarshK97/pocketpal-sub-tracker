import React from "react";
import { Line } from "rc-progress";
import { UilCalendar } from "@iconscout/react-unicons";
import { SpendingData } from "../../Data/Data"; // Import SpendingData

const SpendingAndPayments = ({ subscriptions }) => {
  const upcomingPayments =
    subscriptions?.filter((sub) => {
      const nextPaymentDate = new Date(sub.nextPayment);
      const today = new Date();
      const in15Days = new Date();
      in15Days.setDate(today.getDate() + 15);

      return (
        nextPaymentDate >= today &&
        nextPaymentDate <= in15Days &&
        sub.state === "Upcoming"
      );
    }) || []; // Default to empty array if undefined
  const today = new Date();
  const in7Days = new Date();
  in7Days.setDate(today.getDate() + 7);

  return (
    <div className="w-full flex py-4 flex-col lg:flex-row gap-4 justify-between items-start mt-2 text-black pt-4">
      <div className="bg-white w-full lg:w-[66.3%] rounded-md p-4 h-[34rem] shadow-lg">
        <h2 className="text-2xl font-bold pb-2">Spending Insights</h2>
        <span className="text-gray-500">
          Breakdown of your subscription costs
        </span>
        <div className="pt-4 flex flex-col gap-4 border-b border-gray-200 pb-6">
          {SpendingData.map(
            (
              item,
              index, // Use SpendingData here
            ) => (
              <div
                key={index}
                className="flex flex-col gap-2 border-b pb-2 last:border-none"
              >
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <div
                      className="rounded-lg p-2"
                      style={{ background: item.backGround }}
                    >
                      {item.icon && (
                        <item.icon className="text-white" size="24" />
                      )}
                    </div>
                    <span>{item.title}</span>
                  </div>
                  <span className="font-bold">₹{item.value}/month</span>
                </div>
                <Line
                  percent={item.percentage}
                  strokeWidth={4}
                  strokeColor={item.backGround}
                  className="h-2"
                />
              </div>
            ),
          )}
        </div>
        <div className="flex flex-col pt-4 gap-2 text-[#03a63c]">
          <span className="text-gray-500">Spending Trend</span>
          <div className="flex flex-row justify-start items-center text-xl font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="fill-[#03a62c]"
            >
              <path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" />
            </svg>
            5% lower than last month
          </div>
        </div>
      </div>

      {/* Upcoming Payments */}
      <div className="bg-white w-full lg:w-[32.5%] rounded-md p-4 shadow-lg">
        <div>
          <h2 className="text-2xl font-bold pb-2">Upcoming Payments</h2>
          <span className="text-gray-500">Due in the next 15 days</span>
        </div>
        <div className="items-center justify-start flex flex-col h-[27.6rem] mt-2 gap-4">
          {upcomingPayments.length > 0 ? (
            upcomingPayments.map((sub, index) => (
              <div
                key={index}
                className="w-full flex flex-row justify-between items-center py-4 border-b"
              >
                <div className="flex flex-row items-center gap-2">
                  <div
                    className="rounded-lg p-2"
                    style={{ background: sub.iconColor }}
                  >
                    <UilCalendar className="text-white" size="24" />
                  </div>
                  <span>{sub.name}</span>
                </div>
                <span className="font-bold">{sub.nextPayment}</span>
              </div>
            ))
          ) : (
            <div className="rounded-full bg-orange-100 w-14 h-14 items-center justify-center flex">
              <UilCalendar className="fill-[#FFCA71] h-8" />
            </div>
          )}
          {upcomingPayments.length === 0 && (
            <span className="text-gray-500">
              No upcoming payments in the next 15 days
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpendingAndPayments;
