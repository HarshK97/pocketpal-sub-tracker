import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

export default function ServiceInfoTable({ data, onDelete }) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 2,
        borderRadius: "1rem",
        overflow: "hidden",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="styled table">
        <TableHead sx={{ backgroundColor: "#bfdbfe" }}>
          <TableRow>
            <TableCell sx={{ color: "#7D5BA6", fontSize: "1.125rem" }}>
              Service
            </TableCell>
            <TableCell
              align="right"
              sx={{ color: "#7D5BA6", fontSize: "1.125rem" }}
            >
              Plan
            </TableCell>
            <TableCell
              align="right"
              sx={{ color: "#7D5BA6", fontSize: "1.125rem" }}
            >
              Billing
            </TableCell>
            <TableCell
              align="right"
              sx={{ color: "#7D5BA6", fontSize: "1.125rem" }}
            >
              Next&nbsp;Payment
            </TableCell>
            <TableCell
              align="right"
              sx={{ color: "#7D5BA6", fontSize: "1.125rem" }}
            >
              Payment&nbsp;Method
            </TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": {
                    backgroundColor: "#f3f4f6",
                    cursor: "pointer",
                  },
                  transition: "background-color 0.2s ease-in-out",
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    color: "#000",
                    fontSize: "1.125rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "0.5rem",
                      backgroundColor: row.iconColor || "#e11d48",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: 600,
                    }}
                  >
                    {row.name.charAt(0)}
                  </Box>
                  <Box>
                    <div style={{ fontWeight: "600" }}>{row.name}</div>
                    <div style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                      {row.amount}
                    </div>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box
                    sx={{
                      px: 2,
                      py: 0.5,
                      borderRadius: "9999px",
                      backgroundColor: "#c7d2fe",
                      color: "#3730a3",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      display: "inline-block",
                    }}
                  >
                    {row.plan}
                  </Box>
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontSize: "1rem", color: "#111827" }}
                >
                  {row.billing}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontSize: "1rem", color: "#111827" }}
                >
                  📅 {row.nextPayment}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontSize: "1rem", color: "#111827" }}
                >
                  {row.paymentMethod + "(" + row.last4Digits + ")"}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontSize: "1rem", color: "#111827" }}
                >
                  <button
                    onClick={() => onDelete(row.name)}
                    className="text-blue-700 !bg-transparent rounded-lg p-2 shadow-lg"
                  >
                    Cancel
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                align="center"
                sx={{ py: 4, color: "#6b7280" }}
              >
                No subscriptions in this category.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
