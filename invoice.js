const createPdf = require("./renderer");

// Utils
const utils = require("./utils");

// Moment
const moment = require("moment");
moment.locale("en-us");

// name is used to generate the PDF filename
const name = "johndoe";

// The due date is automatically generated based on the operating system date
// and it is set to the last day of the current month.
// If you need to generate an invoice for a specific month, replace the
// `invoiceDueDate` declaration for the following commented line and fill in
// the target month and year.
// let invoiceDueDate = moment('03/89', 'MM/YY');
let invoiceDueDate = moment();
const invoiceDueDateLong = invoiceDueDate.endOf("month").format("LL");
console.log(`Invoice due on ${invoiceDueDateLong}`);

const invoiceData = {
  // The invoice number is used by Ekumen Inc to keep track of the processed
  // invoices. You will need to manually update this number each month.
  // Make sure to check the invoice generated for the previous month to ensure
  // you have the right invoice number.
  invoiceNumber: 1,
  itemList: [
    {
      description: "Professional software development services.",
      // FILL ME IN
      price: 123,
    },
    {
      description: "Reimbursement for end of year treat.",
      // FILL ME IN
      price: 15,
    },
    // Ekumen will cover transfer fees of up to 50 USD.
    // You might want to confirm this with Ekumen if you're a trainee.
    // The input price is specific to Itaú, update for your bank if needed.
    {
      description: "Transfer fees.",
      price: 38.5,
    },
  ],
  // Recipient information
  recipient: "Ekumen, Inc.",
  recipientAddress: "8 The Green, Suite D",
  recipientCity: "Dover, Delaware, 19901",
  recipientEmail: "notices@ekumeninc.com",
  // Sender information
  sender: "John Doe",
  senderAddress: "Main Street 5",
  senderCity: "Asunción, Paraguay",
  senderEmail: "johndoe@email.com",
  // senderPicture is an optional URL to an image.
  // It can be used to personalize your invoice.
  senderPicture: "",
};

// Format prices and get total price
let itemTotal = 0;
invoiceData.itemList.forEach((item) => {
  itemTotal += item.price;
  // Update the price number format to the US currency format
  item.price = utils.formatPriceToUSD(item.price);
});
itemTotal = utils.formatPriceToUSD(itemTotal);

// Prepare PDF data
const pdfData = {
  invoiceNumber: invoiceData.invoiceNumber,
  invoiceDate: moment(),
  invoiceDueDate: invoiceDueDateLong,
  senderPicture: invoiceData.senderPicture,
  recipient: invoiceData.recipient,
  recipientAddress: invoiceData.recipientAddress,
  recipientCity: invoiceData.recipientCity,
  recipientEmail: invoiceData.recipientEmail,
  sender: invoiceData.sender,
  senderAddress: invoiceData.senderAddress,
  senderEmail: invoiceData.senderEmail,
  senderCity: invoiceData.senderCity,
  itemList: invoiceData.itemList,
  itemTotal: itemTotal,
};

const filename = `${name}-invoice-${invoiceDueDate.format("MM-YYYY")}.pdf`;

createPdf(pdfData, filename, "template/invoice.pug");
