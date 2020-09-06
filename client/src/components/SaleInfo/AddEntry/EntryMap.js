import {
  SELECT,
  DATE,
  STRING,
  INT,
  FLOAT,
  MULTIENTRY,
  LABEL,
  AUTOCOMPLETE
} from "../../CompMap/CompType";

export const rows = [
  [
    {
      id: "sales_type",
      label: "Select Entry Type",
      type: SELECT,
      list: [
        { id: "sell", label: "Sell" },
        { id: "buy", label: "Buy" }
      ],
      gridProp: { xs: 4 }
    }
  ],
  [
    {
      id: "bill_no",
      label: "Bill Number",
      type: STRING,
      gridProp: { xs: 4 },
      isRequired: true
    },
    {
      id: "date_of_purchase",
      label: "Date of Purchase",
      type: DATE,
      gridProp: { xs: 4 }
    },
    {
      id: "incoming_date",
      label: "Incoming date",
      type: DATE,
      visibleOn: { id: "sales_type", value: "buy" },
      gridProp: { xs: 4 }
    }
  ],
  [
    {
      id: "dalal_name",
      label: "Dalal Name",
      type: STRING,
      gridProp: { xs: 4 },
      isRequired: true
    },
    {
      id: "dealer_name",
      label: "Dealer Name",
      type: STRING,
      gridProp: { xs: 4 },
      isRequired: true
    }
  ],
  [
    {
      id: "products",
      label: "Products",
      subLabelPrefix: "Product",
      type: MULTIENTRY,
      gridProp: { xs: 10 },
      subcolumns: [
        [
          {
            id: "product_type",
            label: "Type",
            type: STRING,
            isRequired: true,
            gridProp: { xs: 4 }
          },
          {
            id: "product_name",
            label: "Name",
            type: AUTOCOMPLETE,
            isRequired: true,
            gridProp: { xs: 4 }
          },
          {
            id: "marka",
            label: "Marka",
            type: INT,
            gridProp: { xs: 4 },
            isRequired: true
          },
          {
            id: "quantity",
            label: "Katti",
            type: INT,
            gridProp: { xs: 4 },
            isRequired: true
          },
          {
            id: "quintals",
            label: "Quintals",
            type: FLOAT,
            gridProp: { xs: 4 },
            isRequired: true
          },
          {
            id: "rate",
            label: "Rate",
            type: INT,
            gridProp: { xs: 4 },
            isRequired: true
          }
        ]
      ]
    }
  ],
  [
    {
      id: "total_product_quantity",
      label: "Total Quantity",
      type: LABEL,
      gridProp: { xs: 6 },
      calDependency: ["products"],
      calculation: ({ products = [] }) => {
        const result = products.reduce(
          (result, product) => (result = result + product.quintals),
          0
        );
        // update({ name: "total_product_quantity", value: result });
        return result;
      }
    },
    {
      id: "net_products_value",
      label: "Net Products Value",
      type: LABEL,
      gridProp: { xs: 6 },
      calDependency: ["products"],
      calculation: ({ products = [] }) => {
        const result = products.reduce(
          (result, product) =>
            (result = result + product.rate * product.quintals),
          0
        );
        // update({ name: "net_products_value", value: result });
        return result;
      }
    }
  ],
  [
    {
      id: "other_expenses",
      label: "Other expenses",
      subLabelPrefix: "Expense",
      type: MULTIENTRY,
      gridProp: { xs: 9 },
      subcolumns: [
        [
          {
            id: "expense_type",
            label: "Type",
            type: STRING,
            gridProp: { xs: 4 }
          },
          {
            id: "expense_amt",
            label: "Amount",
            type: INT,
            gridProp: { xs: 4 }
          }
        ]
      ]
    }
  ],
  [
    {
      id: "expenses_total",
      label: "Expenses total",
      type: LABEL,
      gridProp: { xs: 6 },
      calDependency: ["total_product_quantity", "other_expenses"],
      calculation: ({ total_product_quantity = 0, other_expenses = [] }) => {
        const result = other_expenses.reduce(
          (result, expense) =>
            (result = result + total_product_quantity * expense.expense_amt),
          0
        );
        // update({ name: "expenses_total", value: result });
        return result;
      }
    }
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
            gridProp: { xs: 4 }
          },
          {
            id: "payment_mode",
            label: "Mode of payment",
            type: STRING,
            gridProp: { xs: 4 }
          },
          {
            id: "details",
            label: "Details",
            type: STRING,
            gridProp: { xs: 4 }
          }
        ]
      ]
    }
  ],
  [
    {
      id: "total",
      label: "Total",
      type: LABEL,
      gridProp: { xs: 6 },
      calDependency: ["net_products_value", "expenses_total"],
      calculation: ({ net_products_value = 0, expenses_total = 0 }) => {
        const result = net_products_value + expenses_total;
        // update({ name: "total", value: result });
        return result;
      }
    }
  ],
  [{ id: "remarks", label: "Remarks", type: STRING, gridProp: { xs: 9 } }]
];
