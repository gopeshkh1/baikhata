import { SELECT, DATE, STRING, INT, FLOAT, MULTIENTRY } from "./EntryType";

export const columns = [
  [
    {
      id: "sales_type",
      label: "Select Entry Type",
      type: SELECT,
      list: [
        { id: "sell", label: "Sell" },
        { id: "buy", label: "Buy" },
      ],
      gridProp: { xs: 4 },
    },
  ],
  [
    {
      id: "bill_no",
      label: "Bill Number",
      type: STRING,
      gridProp: { xs: 4 },
      isRequired: true,
    },
    {
      id: "date_of_purchase",
      label: "Date of Purchase",
      type: DATE,
      gridProp: { xs: 4 },
    },
    {
      id: "incoming_date",
      label: "Incoming date",
      type: DATE,
      visibleOn: { id: "sales_type", value: "buy" },
      gridProp: { xs: 4 },
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
    {
      id: "dealer_name",
      label: "Dealer Name",
      type: STRING,
      gridProp: { xs: 4 },
      isRequired: true,
    },
  ],
  [
    {
      id: "products",
      label: "Products",
      subLabelPrefix: "Product",
      type: MULTIENTRY,
      gridProp: { xs: 12 },
      subcolumns: [
        [
          {
            id: "product_type",
            label: "Type",
            type: STRING,
            isRequired: true,
            gridProp: { xs: 4 },
          },
          {
            id: "product_name",
            label: "Name",
            type: STRING,
            isRequired: true,
            gridProp: { xs: 4 },
          },
          {
            id: "marka",
            label: "Marka",
            type: INT,
            gridProp: { xs: 4 },
            isRequired: true,
          },
          {
            id: "quantity",
            label: "Katti",
            type: INT,
            gridProp: { xs: 4 },
            isRequired: true,
          },
          {
            id: "quintals",
            label: "Quintals",
            type: FLOAT,
            gridProp: { xs: 4 },
            isRequired: true,
          },
          {
            id: "rate",
            label: "Rate",
            type: INT,
            gridProp: { xs: 4 },
            isRequired: true,
          },
        ],
      ],
    },
  ],
  [
    {
      id: "other_expenses",
      label: "Other expenses",
      subLabelPrefix: "Expense",
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
      subLabelPrefix: "Mode",
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
