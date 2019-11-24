

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
      if (colIndex === 8) {
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
      name: "invoiceNumber",
      label: "Invoice number",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "invoiceId",
      label: "invoice Id",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "paymentMethod",
      label: "Payment method",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "invoiceSystem",
      label: "Invoice System",
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
      },
      {
        name: "amount",
        label: "Amount",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "IssuanceDate",
        label: "Issuance Date",
        options: {
          filter: true,
          sort: true
        }
      }
  ];
  
  
  exports.options = options 
  exports.columns = columns