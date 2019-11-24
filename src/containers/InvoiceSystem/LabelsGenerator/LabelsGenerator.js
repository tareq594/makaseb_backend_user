import React, { useState, useEffect } from "react";
import classes from "./LabelsGenerator.css";
import WhiteCard from "../../../components/UI/WhiteCard/WhiteCard";
import TextField from "@material-ui/core/TextField";
import MutanabiButton from "../../../components/UI/MutanabiButton/MutanabiButton";
import MenuItem from "@material-ui/core/MenuItem";
import SuggestionBox from "../../../components/UI/SuggestionBox/SuggestionBox";
import RadioButton from "../../../components/UI/RadioButton/RadioButton";
import axios from "../../../axios";
import naxios from "axios"
const qs = require('querystring')
var QRCode = require('qrcode')



const LabelsGenerator = () => {
  // const NameError = () => {
  //     // return validName ? (
  //     //   <div />
  //     // ) : (
  //     //   <p className={classes.Invalid}>This Customer is already existed</p>
  //     // );
  //   };
var todayString = ""
var today = new Date();
    var dd = today.getDate();
    
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
    
    if(mm<10) 
    {
        mm='0'+mm;
    } 
    todayString = mm+'/'+dd+'/'+yyyy;

  const printLabel = ()=>{
    

    QRCode.toDataURL(`105308${invoiceNumber}`,{type:'terminal'}, function (err, url) {

    const requestBody = {
      printerName: 'DYMO LabelWriter 450',
      labelXml:`<?xml version="1.0" encoding="utf-8"?>
      <DieCutLabel Version="8.0" Units="twips" MediaType="Default">
      <PaperOrientation>Landscape</PaperOrientation>
      <Id>Address</Id>
      <PaperName>30252 Address</PaperName>
      <DrawCommands>
      <RoundRectangle X="0" Y="0" Width="1581" Height="5040" Rx="270" Ry="270"/>
      </DrawCommands>
      <ObjectInfo>
      <AddressObject>
      <Name>Address</Name>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
      <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
      <LinkedObjectName></LinkedObjectName>
      <Rotation>Rotation0</Rotation>
      <IsMirrored>False</IsMirrored>
      <IsVariable>True</IsVariable>
      <HorizontalAlignment>Right</HorizontalAlignment>
      <VerticalAlignment>Middle</VerticalAlignment>
      <TextFitMode>ShrinkToFit</TextFitMode>
      <UseFullFontHeight>True</UseFullFontHeight>
      <Verticalized>False</Verticalized>
      <StyledText>
      <Element>
      <String>مستودع ادويه المتنبي</String>
      <Attributes>
      <Font Family="Geeza Pro" Size="14" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
      </Attributes>
      </Element>
      </StyledText>
      <ShowBarcodeFor9DigitZipOnly>False</ShowBarcodeFor9DigitZipOnly>
      <BarcodePosition>Suppress</BarcodePosition>
      <LineFonts>
      <Font Family="Geeza Pro" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
      </LineFonts>
      </AddressObject>
      <Bounds X="3087.859" Y="57.59995" Width="1759.256" Height="387.8125"/>
      </ObjectInfo>
      <ObjectInfo>
      <ImageObject>
      <Name>Image</Name>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
      <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
      <LinkedObjectName></LinkedObjectName>
      <Rotation>Rotation0</Rotation>
      <IsMirrored>False</IsMirrored>
      <IsVariable>False</IsVariable>
      <Image>${url.split(",")[1]}</Image>
      <ScaleMode>Uniform</ScaleMode>
      <BorderWidth>0</BorderWidth>
      <BorderColor Alpha="255" Red="0" Green="0" Blue="0"/>
      <HorizontalAlignment>Center</HorizontalAlignment>
      <VerticalAlignment>Center</VerticalAlignment>
      </ImageObject>
      <Bounds X="331.2" Y="57.59995" Width="1002.075" Height="1250.234"/>
      </ObjectInfo>
      <ObjectInfo>
      <TextObject>
      <Name>TEXT_1</Name>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
      <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
      <LinkedObjectName></LinkedObjectName>
      <Rotation>Rotation0</Rotation>
      <IsMirrored>False</IsMirrored>
      <IsVariable>False</IsVariable>
      <HorizontalAlignment>Right</HorizontalAlignment>
      <VerticalAlignment>Middle</VerticalAlignment>
      <TextFitMode>ShrinkToFit</TextFitMode>
      <UseFullFontHeight>True</UseFullFontHeight>
      <Verticalized>False</Verticalized>
      <StyledText>
      <Element>
      <String>المستلم</String>
      <Attributes>
      <Font Family="Geeza Pro" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
      </Attributes>
      </Element>
      <Element>
      <String>: </String>
      <Attributes>
      <Font Family="Lucida Grande" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
      </Attributes>
      </Element>
      <Element>
      <String>${customerData.name}</String>
      <Attributes>
      <Font Family="Geeza Pro" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
      </Attributes>
      </Element>
      </StyledText>
      </TextObject>
      <Bounds X="1482.422" Y="407.8125" Width="3434.844" Height="395.625"/>
      </ObjectInfo>
      <ObjectInfo>
      <TextObject>
      <Name>TEXT_2</Name>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
      <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
      <LinkedObjectName></LinkedObjectName>
      <Rotation>Rotation0</Rotation>
      <IsMirrored>False</IsMirrored>
      <IsVariable>False</IsVariable>
      <HorizontalAlignment>Right</HorizontalAlignment>
      <VerticalAlignment>Middle</VerticalAlignment>
      <TextFitMode>ShrinkToFit</TextFitMode>
      <UseFullFontHeight>True</UseFullFontHeight>
      <Verticalized>False</Verticalized>
      <StyledText>
      <Element>
      <String>عدد الطرود</String>
      <Attributes>
      <Font Family="Geeza Pro" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
      </Attributes>
      </Element>
      <Element>
      <String>:</String>
      <Attributes>
      <Font Family="Lucida Grande" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
      </Attributes>
      </Element>
      <Element>
      <String>غير محدد</String>
      <Attributes>
      <Font Family="Geeza Pro" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
      </Attributes>
      </Element>
      </StyledText>
      </TextObject>
      <Bounds X="3315.709" Y="788.75" Width="1499.062" Height="382.9688"/>
      </ObjectInfo>
      <ObjectInfo>
      <TextObject>
      <Name>TEXT_3</Name>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
      <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
      <LinkedObjectName></LinkedObjectName>
      <Rotation>Rotation0</Rotation>
      <IsMirrored>False</IsMirrored>
      <IsVariable>False</IsVariable>
      <HorizontalAlignment>Left</HorizontalAlignment>
      <VerticalAlignment>Middle</VerticalAlignment>
      <TextFitMode>ShrinkToFit</TextFitMode>
      <UseFullFontHeight>True</UseFullFontHeight>
      <Verticalized>False</Verticalized>
      <StyledText>
      <Element>
      <String>${invoiceNumber}</String>
      <Attributes>
      <Font Family="Helvetica" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
      </Attributes>
      </Element>
      </StyledText>
      </TextObject>
      <Bounds X="331.2" Y="1168.191" Width="1037.188" Height="324.6094"/>
      </ObjectInfo>
      <ObjectInfo>
      <TextObject>
      <Name>TEXT_4</Name>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
      <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
      <LinkedObjectName></LinkedObjectName>
      <Rotation>Rotation0</Rotation>
      <IsMirrored>False</IsMirrored>
      <IsVariable>False</IsVariable>
      <HorizontalAlignment>Right</HorizontalAlignment>
      <VerticalAlignment>Middle</VerticalAlignment>
      <TextFitMode>ShrinkToFit</TextFitMode>
      <UseFullFontHeight>True</UseFullFontHeight>
      <Verticalized>False</Verticalized>
      <StyledText>
      <Element>
      <String>المدينه</String>
      <Attributes>
      <Font Family="Geeza Pro" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
      </Attributes>
      </Element>
      <Element>
      <String>:</String>
      <Attributes>
      <Font Family="Lucida Grande" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
      </Attributes>
      </Element>
      <Element>
      <String>${customerData.city}</String>
      <Attributes>
      <Font Family="Geeza Pro" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
      </Attributes>
      </Element>
      </StyledText>
      </TextObject>
      <Bounds X="1717.059" Y="811.1719" Width="1392.344" Height="336.0156"/>
      </ObjectInfo>
      <ObjectInfo>
      <TextObject>
      <Name>TEXT_5</Name>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
      <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
      <LinkedObjectName></LinkedObjectName>
      <Rotation>Rotation0</Rotation>
      <IsMirrored>False</IsMirrored>
      <IsVariable>False</IsVariable>
      <HorizontalAlignment>Right</HorizontalAlignment>
      <VerticalAlignment>Middle</VerticalAlignment>
      <TextFitMode>ShrinkToFit</TextFitMode>
      <UseFullFontHeight>True</UseFullFontHeight>
      <Verticalized>False</Verticalized>
      <StyledText>
      <Element>
      <String>طريقه الدفع</String>
      <Attributes>
      <Font Family="Geeza Pro" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
      </Attributes>
      </Element>
      <Element>
      <String>: </String>
      <Attributes>
      <Font Family="Lucida Grande" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
      </Attributes>
      </Element>
      <Element>
      <String>${paymentMethods.find(method=>method.value==paymentMethod).label}</String>
      <Attributes>
      <Font Family="Geeza Pro" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
      </Attributes>
      </Element>
      </StyledText>
      </TextObject>
      <Bounds X="1685.547" Y="1183.906" Width="3125.312" Height="308.8938"/>
      </ObjectInfo>
      <ObjectInfo>
      <TextObject>
      <Name>TEXT</Name>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
      <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
      <LinkedObjectName></LinkedObjectName>
      <Rotation>Rotation0</Rotation>
      <IsMirrored>False</IsMirrored>
      <IsVariable>False</IsVariable>
      <HorizontalAlignment>Left</HorizontalAlignment>
      <VerticalAlignment>Middle</VerticalAlignment>
      <TextFitMode>ShrinkToFit</TextFitMode>
      <UseFullFontHeight>True</UseFullFontHeight>
      <Verticalized>False</Verticalized>
      <StyledText>
      <Element>
      <String>${todayString}</String>
      <Attributes>
      <Font Family="Lucida Grande" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
      </Attributes>
      </Element>
      </StyledText>
      </TextObject>
      <Bounds X="1539.012" Y="57.59995" Width="1472.344" Height="367.1875"/>
      </ObjectInfo>
      </DieCutLabel>
      `,
      printParamsXml: '',
      labelSetXml:''
    }

    const config = {
      headers: {
        'Accept':"*/*",
        'Content-Type': 'application/x-www-form-urlencoded',
        "Connection":"keep-alive"
      }
    }


    naxios.post('https://localhost:41951/DYMO/DLS/Printing/PrintLabel', qs.stringify(requestBody), config)
  .then((result) => {
    // Do somthing
  })
  .catch((err) => {
    console.log(err)
    // Do somthing
  })
})

    
  }

  const paymentMethods = [
    {
      value: "inAccount",
      label: "بالحساب"
    },
    {
      value: "cashOnDelivery",
      label: "نقداً عند التسليم"
    },
    {
      value: "chx",
      label: "شيك"
    }
  ];
  const statusMethods = [
    {
      value: "issued",
      label: "Issued"
    },
    {
      value: "ofd",
      label: "Out for delivery"
    },
    {
      value: "delivered",
      label: "Delivered"
    },
    {
      value: "returned",
      label: "Returned"
    }
  ];

  const [text, setText] = useState("");

  const [isDone, setIsDone] = useState(false);
  const [statusMethod, setStatusMethod] = useState("issued");
  const [paymentMethod, setpaymentMethod] = useState("inAccount");
  const [isInvoiceAuto, setIsInvoiceAuto] = useState(true);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [customerData, setCustomerData] = useState({});
  const [amount, setAmount] = useState("");
  const [invoiceData, setInvoiceData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    
    
    setDefaultInvoiceNumber();
  }, []);

  const setDefaultInvoiceNumber = () => {
    axios.get(`/invoices/latest`).then(res => {
      setInvoiceNumber(res.data["invoiceNumber"]);
    });
  };
  const handleChange = event => {
    setpaymentMethod(event.target.value);
  };
  const resetForm = () => {
    setStatusMethod("issued");
    setpaymentMethod("inAccount");
//    setIsInvoiceAuto(true);
    setInvoiceNumber("");
    setCustomerData({});
    setAmount(0);
    setInvoiceData({});
    setText("");
    if(isInvoiceAuto){
    setDefaultInvoiceNumber();
    }
  };
  const submitHandler = event => {
    event.preventDefault();
    setIsLoading(true);
    const newInvoiceData = {
      invoiceNumber: invoiceNumber,
      invoiceId: `105308${invoiceNumber}`,
      status: statusMethod,
      paymentMethod: paymentMethod,
      invoiceSystem: "CT",
      customer: customerData["_id"],
      amount: amount,
      IssuanceDate: new Date(),
      events: [
        {
          date: new Date(),
          status: statusMethod
        }
      ]
    };
    setInvoiceData(newInvoiceData);
    axios
      .post("/invoices/create", newInvoiceData)
      .then(res => {
        // console.log(res.status)
        setIsLoading(false);
        if (res.data.error) {
          alert(`Error: ${res.data.error} please check it`);
          return;
        }
        // resetForm();
        setIsDone(true);
        printLabel(newInvoiceData)
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
        alert("error occured");
      });
  };
  const autoInvoiceHandler = () => {
    if(isDone){
      return
    }
    setDefaultInvoiceNumber();
    setIsInvoiceAuto(!isInvoiceAuto);
  };

  const handleInvoiceNumberChange = event => {
    setInvoiceNumber(event.target.value);
  };
  const handleStatusMethodChange = event => {
    setStatusMethod(event.target.value);
  };
  const handleAmountChange = event => {
    setAmount(event.target.value);
  };

  const handleCustomerSelection = customer => {
    // console.log(customer)
    setCustomerData(customer);
  };
  const handleNewInvoice = () => {
    resetForm();
    setIsDone(false)
  };

  const submitButton = isDone ? (
    <div></div>
  ) : (
    <MutanabiButton isLoading={isLoading}>Generate</MutanabiButton>
  );
  const postButtons = isDone ? (
    <div className={classes.Buttons}>
      <MutanabiButton isLoading={isLoading} click={printLabel}>Reprint label</MutanabiButton>
      <MutanabiButton isLoading={isLoading} click={handleNewInvoice}>
        New invoice
      </MutanabiButton>
    </div>
  ) : (
    <div></div>
  );

  return (
    <div>
      <WhiteCard>
        <h1>Labels generator</h1>
        <form onSubmit={submitHandler} className={classes.FormBox}>
          <div className={classes.MultiInput}>
            <div className={classes.Invoice}>
              <TextField
                disabled={isInvoiceAuto || isDone}
                id="standard-required"
                label="Invoice number"
                margin="normal"
                type="number"
                required
                autoComplete="off"
                value={invoiceNumber}
                onChange={handleInvoiceNumberChange}
              />
              <div className={classes.SizedBox}></div>
              <RadioButton
                checked={isInvoiceAuto}
                handleClick={autoInvoiceHandler}
              >
                Auto invoice number increment
              </RadioButton>
            </div>
            <TextField
              disabled={isDone}
              id="Payment"
              select
              label="Payment method"
              margin="normal"
              type="number"
              className={classes.SubTextField}
              required
              value={paymentMethod}
              onChange={handleChange}
              helperText="Please select payment method"
            >
              {paymentMethods.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            {/* <DropDownMenu></DropDownMenu> */}
          </div>
          <div className={classes.MultiInput}>
            {/* section for suggestion */}
            <SuggestionBox
            id={"box"}
              disabled={isDone}
              onCustomerSelection={handleCustomerSelection}
              text={text}
              setText={setText}
            ></SuggestionBox>
            {/* section for suggestion */}

            <TextField
              disabled={isDone}
              id="standard-required"
              label="Amount"
              margin="normal"
              className={classes.SubTextField}
              onChange={handleAmountChange}
              value={amount}
              type="number"
              autoComplete="off"
            />
          </div>
          <div className={classes.MultiInput}>
            <TextField
              disabled={isDone}
              id="Invoice"
              select
              label="Invoice status"
              margin="normal"
              type="number"
              className={classes.SubTextField}
              required
              value={statusMethod}
              onChange={handleStatusMethodChange}
              helperText="Please select invoice status"
              //   onChange={handleCityInput}
            >
              {statusMethods.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          {submitButton}
        </form>
        {postButtons}
      </WhiteCard>
    </div>
  );
};

export default LabelsGenerator;
