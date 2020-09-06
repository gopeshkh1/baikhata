import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SellInfo from "./SaleInfo/SellInfo";
import BuyInfo from "./BuyInfo";
import StocksLeft from "./StocksInfo/StocksInfo";
import { AutoComplete } from "./CompMap/CstmComp/CstmComp";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    margin: "auto",
    width: "40%",
    backgroundColor: "#272c34"
  }
}));

const tabs = [
  { id: "sale_info", label: "Sale Info", component: <SellInfo /> },
  { id: "stocks_info", label: "Stocks Info", component: <StocksLeft /> }
];

export default function Dashboard() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      {
        // <AutoComplete />
      }
      <AppBar position="static" className={classes.appBar}>
        <Tabs value={value} onChange={handleChange} centered>
          {tabs.map(tab => (
            <Tab key={tab.id} label={tab.label} />
          ))}
        </Tabs>
      </AppBar>
      {tabs.map((tab, index) => (
        <TabPanel key={tab.id} index={index} value={value}>
          {tab.component}
        </TabPanel>
      ))}
    </div>
  );
}
