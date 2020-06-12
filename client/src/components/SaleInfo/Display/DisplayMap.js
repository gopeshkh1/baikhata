export const columns = [
  { id: "date_of_purchase", label: "Date of Purchase", type: "date" },
  {
    id: "products",
    label: "Products",
    subcolumns: [
      { id: "product_type", label: "Type", type: "text" },
      { id: "product_name", label: "Name", type: "text" },
      { id: "quantity", label: "Katti", type: "text" },
      { id: "quintals", label: "Quintals", type: "text" },
      { id: "rate", label: "Rate", type: "text" },
    ],
  },
  {
    id: "other_expenses",
    label: "Other expenses",
    subcolumns: [
      { id: "expense_type", label: "Type" },
      { id: "expense_amt", label: "Amount" },
    ],
  },
  { id: "total", label: "Total" },
  { id: "amt_paid", label: "Amount Paid" },
];

import { DATE, STRING, INT, FLOAT, MULTIENTRY } from "../../CompMap/CompType";
export const rows = [
  [
    {
      id: "date_of_purchase",
      label: "Date of Purchase",
      type: DATE,
      gridProp: { xs: 6 },
    },
    {
      id: "incoming_date",
      label: "Incoming date",
      type: DATE,
      gridProp: { xs: 6 },
    },
  ],
  [
    {
      id: "dalal_name",
      label: "Dalal Name",
      type: STRING,
      gridProp: { xs: 4 },
      isRequired: true,
    },
  ],
  [
    {
      id: "products",
      label: "Products",
      subLabelPrefix: "#",
      type: MULTIENTRY,
      gridProp: { xs: 12 },
      subcolumns: [
        [
          {
            id: "product_type",
            label: "Type",
            type: STRING,
            gridProp: { xs: 4 },
          },
          {
            id: "product_name",
            label: "Name",
            type: STRING,
            gridProp: { xs: 4 },
          },
          {
            id: "marka",
            label: "Marka",
            type: INT,
            gridProp: { xs: 4 },
          },
          {
            id: "quantity",
            label: "Katti",
            type: INT,
            gridProp: { xs: 4 },
          },
          {
            id: "quintals",
            label: "Quintals",
            type: FLOAT,
            gridProp: { xs: 4 },
          },
          {
            id: "rate",
            label: "Rate",
            type: INT,
            gridProp: { xs: 4 },
          },
        ],
      ],
    },
  ],
  [
    {
      id: "other_expenses",
      label: "Other expenses",
      subLabelPrefix: "#",
      type: MULTIENTRY,
      gridProp: { xs: 12 },
      subcolumns: [
        [
          {
            id: "expense_type",
            label: "Type",
            type: STRING,
            gridProp: { xs: 4 },
          },
          {
            id: "expense_amt",
            label: "Amount",
            type: INT,
            gridProp: { xs: 4 },
          },
        ],
      ],
    },
  ],

  [
    {
      id: "amt_paid",
      label: "Amount Paid",
      subLabelPrefix: "#",
      type: MULTIENTRY,
      gridProp: { xs: 12 },
      subcolumns: [
        [
          {
            id: "amount",
            label: "Amount",
            type: INT,
            gridProp: { xs: 4 },
          },
          {
            id: "payment_mode",
            label: "Mode of payment",
            type: STRING,
            gridProp: { xs: 4 },
          },
          {
            id: "details",
            label: "Details",
            type: STRING,
            gridProp: { xs: 4 },
          },
        ],
      ],
    },
  ],
  [{ id: "total", label: "Total", type: FLOAT, gridProp: { xs: 4 } }],
  [{ id: "remarks", label: "Remarks", type: STRING, gridProp: { xs: 9 } }],
];
