

const options = {
  print: true,
  filterType: "checkbox",
  responsive: "scroll",
  textLabels: {
    body: {
      noMatch: "no entries"
    }
  },
  customSort: (data, colIndex, order) => {
    if (colIndex === 1) {
      return data.sort((a, b) => {
        if (order === "desc") {
          return new Date(a.data[1]) - new Date(b.data[1]);
        } else {
          return new Date(b.data[1]) - new Date(a.data[1]);
        }
      });
    } else {
      return data.sort((a, b) => {
        return (
          (a.data[colIndex] < b.data[colIndex] ? -1 : 1) *
          (order === "desc" ? 1 : -1)
        );
      });
    }
  },
  onDownload:(buildHead, buildBody, columns, data) =>
    {
      var csvString = ""
      columns.forEach((column,index) => {
        csvString += index<columns.length - 1?column.label+",":column.label+"\n"
      });
      data.forEach(row=>{
        var subString = ""
        row.data.forEach((element,index2)=>{
          var l = element.toString()
          csvString += index2<row.data.length -1?l+ ",":l+"\n"
        })
        csvString += subString
      })
      var BOM = "\uFEFF"; 
      return BOM+csvString
    }
};

const columns = [
  {
    name: "GTIN",
    label: "GTIN",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "expDate",
    label: "Expiry date",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "LOT",
    label: "LOT",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "SN",
    label: "Serial number",
    options: {
      filter: true,
      sort: true
    }
  }
];


exports.options = options 
exports.columns = columns