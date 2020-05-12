import Dashboard from "./components/Dashboard";
import { fetchSaleData } from "./redux/actions/sales";
import React, { useEffect } from "react";
import { connect } from "react-redux";
// import store from "./redux/store"

function App(props) {
  useEffect(() => {
    props.fetchSaleData();
  });

  return (
    <div>
      <Dashboard />
    </div>
  );
}

const mapDispatchToProps = {
  fetchSaleData,
};

export default connect(null, mapDispatchToProps)(App);
