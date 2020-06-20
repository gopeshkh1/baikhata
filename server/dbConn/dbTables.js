const tables = {
  products: {
    tableName: "products_entry",
    columns: [
      "sales_id",
      "id",
      "product_type",
      "product_name",
      "rate",
      "quintals",
      "quantity",
      "marka"
    ]
  },
  other_expenses: {
    tableName: "expenses_entry",
    columns: ["sales_id", "id", "expense_type", "expense_amt"]
  },
  sales: {
    tableName: "sales_entry",
    columns: [
      "id",
      "sales_type",
      "bill_no",
      "date_of_purchase",
      "dalal_name",
      "dealer_name",
      "total",
      "remarks"
    ]
  },
  amt_paid: {
    tableName: "amt_paid",
    columns: ["sales_id", "id", "amount_paid", "payment_mode", "details"]
  }
};

module.exports = tables;
