import React from "react";
import {
  Typography,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@material-ui/core";

const columns = [
  { id: "bill_no", label: "Bill no." },
  { id: "seller", label: "Seller name" },
  { id: "quantity", label: "Quantity purchased(katti)" },
  { id: "quintals", label: "Quintals purchased" },
  { id: "rate", label: "Rate(per quintal)" },
  { id: "other_expenses", label: "Other expenses(palledari etc.)" },
  { id: "total", label: "Total due" },
];

const rows = [
  {
    bill_no: 1,
    seller: "gopesh",
    quantity: 12,
    quintals: 14,
    rate: 2000,
    other_expenses: 0,
    total: 30000,
  },
  {
    bill_no: 2,
    seller: "gopesh",
    quantity: 12,
    quintals: 14,
    rate: 2000,
    other_expenses: 0,
    total: 30000,
  },
  {
    bill_no: 3,
    seller: "gopesh",
    quantity: 12,
    quintals: 14,
    rate: 2000,
    other_expenses: 0,
    total: 30000,
  },
  {
    bill_no: 4,
    seller: "gopesh",
    quantity: 12,
    quintals: 14,
    rate: 2000,
    other_expenses: 0,
    total: 30000,
  },
  {
    bill_no: 5,
    seller: "gopesh",
    quantity: 12,
    quintals: 14,
    rate: 2000,
    other_expenses: 0,
    total: 30000,
  },
];

function DisplayTable(props) {
  return (
    <Table size="small">
      <TableHead style={{ backgroundColor: "#2f6894" }}>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.id} style={{ color: "white" }}>
              <Typography>{column.label}</Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.bill_no}>
            {columns.map((column) => (
              <TableCell key={column.id}>
                <Typography>{row[column.id]}</Typography>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function BuyInfo() {
  return (
    <div>
      {/* <AddEntry /> */}
      <DisplayTable />
      {/* <Typography>Sell Info</Typography> */}
    </div>
  );
}
