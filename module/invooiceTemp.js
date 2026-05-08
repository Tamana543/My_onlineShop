const fs = require("fs");
const PDFDocument = require("pdfkit");
const  path = require('path')



function generateHeader(doc) {
  doc
   .image(
  path.join(__dirname, "../public/img_src/lamborghini-car-logo.jpg"),
  50,
  45,
  { width: 50 }
)
    .fillColor("#444444")
    .fontSize(20)
    .text("Online", 110, 57)
    .fontSize(10)
    .text("Remote", 200, 50, { align: "right" })
    .text("Tamana", 200, 65, { align: "right" })
    .text("Farzami", 200, 80, { align: "right" })
    .moveDown();
}
function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Balance Due:", 50, customerInformationTop + 30)
    .text(
      formatCurrency(invoice.subtotal - invoice.paid),
      150,
      customerInformationTop + 30
    )

    .font("Helvetica-Bold")
    .text(invoice.shipping.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.shipping.address, 300, customerInformationTop + 15)
    .text(
      invoice.shipping.city +
        ", " +
        invoice.shipping.state +
        ", " +
        invoice.shipping.country,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  const invoiceTableTop = 330;
  let currentY = invoiceTableTop;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    currentY,
    "Item",
    "Description",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );
  
  generateHr(doc, currentY + 20);
  currentY += 30;
  doc.font("Helvetica");

  for (let i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    
    // Calculate the height of this specific row
    const rowHeight = generateTableRow(
      doc,
      currentY,
      item.item,
      item.description,
      formatCurrency(item.amount / item.quantity),
      item.quantity,
      formatCurrency(item.amount)
    );

    generateHr(doc, currentY + rowHeight + 5);
    currentY += rowHeight + 15; 
  }


  const totalsTop = currentY;
  generateTableRow(doc, totalsTop, "", "", "Subtotal", "", formatCurrency(invoice.subtotal));
  generateTableRow(doc, totalsTop + 20, "", "", "Paid To Date", "", formatCurrency(invoice.paid));
  
  doc.font("Helvetica-Bold");
  generateTableRow(doc, totalsTop + 45, "", "", "Balance Due", "", formatCurrency(invoice.subtotal - invoice.paid));
}

function generateTableRow(doc, y, item, description, unitCost, quantity, lineTotal) {
  const itemWidth = 90;
  const descWidth = 170;
  const costWidth = 100; // Widened for those large Lamborghini numbers
  const qtyWidth = 40;
  const totalWidth = 80;

  // Draw the text
  doc
    .fontSize(10)
    .text(item, 50, y, { width: itemWidth })
    .text(description, 150, y, { width: descWidth, align: "left" })
    .text(unitCost, 330, y, { width: costWidth, align: "right" }) // Shifted x to 330
    .text(quantity, 435, y, { width: qtyWidth, align: "right" })
    .text(lineTotal, 480, y, { width: totalWidth, align: "right" });

  // Determine which column is the tallest to prevent overlapping the next row
  const itemHeight = doc.heightOfString(item, { width: itemWidth });
  const descHeight = doc.heightOfString(description, { width: descWidth });
  
  return Math.max(itemHeight, descHeight);
}
function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}
function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your Choice.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

module.exports = {
  generateHeader,
  generateCustomerInformation,
  generateInvoiceTable,
  generateFooter
}