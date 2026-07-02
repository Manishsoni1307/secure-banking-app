import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";

/* ===============================
   MONTHLY SPENDING DATA
================================= */

const spendingData = [
  {
    month: "Jan",
    spending: 12000,
  },
  {
    month: "Feb",
    spending: 15000,
  },
  {
    month: "Mar",
    spending: 18000,
  },
  {
    month: "Apr",
    spending: 14500,
  },
  {
    month: "May",
    spending: 22000,
  },
  {
    month: "Jun",
    spending: 19500,
  },
];

/* ===============================
   INCOME VS EXPENSE DATA
================================= */

const incomeExpenseData = [
  {
    month: "Jan",
    income: 45000,
    expense: 12000,
  },
  {
    month: "Feb",
    income: 50000,
    expense: 18000,
  },
  {
    month: "Mar",
    income: 52000,
    expense: 16000,
  },
  {
    month: "Apr",
    income: 49000,
    expense: 21000,
  },
  {
    month: "May",
    income: 56000,
    expense: 19000,
  },
  {
    month: "Jun",
    income: 58000,
    expense: 23000,
  },
];

/* ===============================
      MONTHLY SPENDING CHART
================================= */

export function MonthlySpendingChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={spendingData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="spending"
          stroke="#2563eb"
          strokeWidth={4}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

/* ===============================
     INCOME EXPENSE CHART
================================= */

export function IncomeExpenseChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={incomeExpenseData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Legend />

        <Bar
          dataKey="income"
          fill="#16a34a"
          radius={[8, 8, 0, 0]}
        />

        <Bar
          dataKey="expense"
          fill="#dc2626"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}