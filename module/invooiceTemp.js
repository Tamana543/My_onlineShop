const fs = require("fs");
const PDFDocument = require("pdfkit");

function generateHeader(doc) {
  doc
    .image("lamborghini-car-logo.jpg", 50, 45, { width: 50 })
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