const React = require("react");


const columns = [
  {
    name: "name",
    label: "Name",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "city",
    label: "City",
    options: {
      filter: true,
      sort: true
    }
  },

  {
    name: "mobileNumber",
    label: "Mobile number",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "email",
    label: "Email",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "itemsSold",
    label: "#Items sold",
    options: {
      filter: true,
      sort: true
    }
  }
];

exports.columns = columns;
