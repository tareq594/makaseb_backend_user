

const options = {
    print: true,
    filterType: "checkbox",
    responsive: "scroll",
    textLabels: {
      body: {
        noMatch: "no matchs"
      }
    },
    customSort: (data, colIndex, order) => {
      if (colIndex === 1 || colIndex === 5 || colIndex === 6) {
        return data.sort((a, b) => {
          if (order === "desc") {
            return new Date(a.data[colIndex]) - new Date(b.data[colIndex]);
          } else {
            return new Date(b.data[colIndex]) - new Date(a.data[colIndex]);
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
      name: "billNumber",
      label: "Bill number",
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
    },
    {
        name: "stockEntryDate",
        label: "Stock entry date",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "selldate",
        label: "Sell date",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "customer",
        label: "Customer",
        options: {
          filter: true,
          sort: true
        }
      }
  ];
  
  
  exports.options = options 
  exports.columns = columns