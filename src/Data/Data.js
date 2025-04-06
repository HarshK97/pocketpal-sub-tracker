import subscriptions from "./subscriptions.json";
import {
  UilCheckCircle,
  UilCreditCard,
  UilCalendar,
  UilMusic,
  UilPlayCircle,
  UilShoppingBag,
  UilChart,
} from "@iconscout/react-unicons";

// Function to check if a subscription is expired
const getExpiredStatus = (nextPayment) => {
  const today = new Date();
  const nextPaymentDate = new Date(nextPayment);
  return today > nextPaymentDate; // Check if the current date is past the next payment
};

const categoryIcons = {
  Entertainment: UilPlayCircle,
  Music: UilMusic,
  Productivity: UilChart,
  Shopping: UilShoppingBag,
};

// Function to parse the amount
const parseAmount = (amountStr) =>
  typeof amountStr === "number"
    ? amountStr
    : parseInt(amountStr.replace(/[^\d]/g, ""), 10);

// Function to get monthly amount
const getMonthlyAmount = (sub) => {
  if (sub.state === "Expired" || sub.expired === "true") return 0;
  const amt = parseAmount(sub.amount);
  return sub.billing === "Yearly" ? Math.round(amt / 12) : amt;
};

// Get active subscriptions count excluding expired
const activeSubscriptions = subscriptions.filter(
  (sub) => sub.state === "Active" && !getExpiredStatus(sub.nextPayment),
).length;

// Calculate monthly spending
const monthlySpending = subscriptions.reduce(
  (total, sub) => total + getMonthlyAmount(sub),
  0,
);

// Get the current date and the date 15 days ahead
const today = new Date();
const in15Days = new Date();
in15Days.setDate(today.getDate() + 15);

// Add the `upcoming` property to subscriptions
const updatedSubscriptions = subscriptions.map((sub) => {
  const nextPaymentDate = new Date(sub.nextPayment);
  const isUpcoming = nextPaymentDate >= today && nextPaymentDate <= in15Days;
  const isExpired = getExpiredStatus(sub.nextPayment); // Check if expired
  return {
    ...sub,
    upcoming: isUpcoming ? "true" : "false", // Add upcoming property
    expired: isExpired ? "true" : "false", // Add expired property
    state: isExpired ? "Expired" : sub.state, // Update state to expired if necessary
  };
});

// Define category colors
const categoryColors = {
  Entertainment: "#E0B0FF",
  Music: "#F66267",
  Productivity: "#F8D49A",
  Shopping: "#00FF66",
};

const categoryTotals = {};

updatedSubscriptions.forEach((sub) => {
  const monthlyAmount = getMonthlyAmount(sub);
  categoryTotals[sub.category] =
    (categoryTotals[sub.category] || 0) + monthlyAmount;
});

// Prepare SpendingData based on categories
export const SpendingData = Object.entries(categoryTotals).map(
  ([category, value]) => ({
    title: category,
    value,
    percentage: Math.round((value / monthlySpending) * 100),
    icon: categoryIcons[category],
    backGround: categoryColors[category] || "#ccc",
  }),
);

// Prepare the Card data
export const CardsData = [
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
    value: `${updatedSubscriptions.filter((sub) => sub.upcoming === "true").length}`,
    color: {
      backGround:
        "linear-gradient(rgb(248,212,154) -146.42%, rgb(255,202,113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #FDD59B",
    },
    png: UilCalendar,
  },
];

// Export the updated subscriptions data
export const ServiceTableData = updatedSubscriptions;
