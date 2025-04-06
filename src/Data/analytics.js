import subscriptions from "./subscriptions.json";

const parseAmount = (amountStr) => {
  return parseInt(amountStr.replace(/[^\d]/g, ""), 10);
};

export const getActiveSubscriptionCount = () => {
  return subscriptions.length;
};

export const getMonthlySpending = () => {
  return subscriptions.reduce((total, sub) => {
    if (sub.billing === "Monthly") {
      return total + parseAmount(sub.amount);
    } else if (sub.billing === "Yearly") {
      return total + Math.round(parseAmount(sub.amount) / 12);
    }
    return total;
  }, 0);
};

export const getUpcomingRenewals = (referenceDate = new Date()) => {
  return subscriptions.filter((sub) => {
    const paymentDate = new Date(sub.nextPayment);
    return paymentDate >= referenceDate;
  });
};

export const getSpendingByCategory = () => {
  const categoryMap = {};

  subscriptions.forEach((sub) => {
    const category = sub.category;
    const amount = parseAmount(sub.amount);
    const monthlyAmount =
      sub.billing === "Monthly" ? amount : Math.round(amount / 12);

    if (!categoryMap[category]) {
      categoryMap[category] = 0;
    }
    categoryMap[category] += monthlyAmount;
  });

  const total = getMonthlySpending();

  return Object.entries(categoryMap).map(([title, value]) => ({
    title,
    value,
    percentage: Math.round((value / total) * 100),
  }));
};
