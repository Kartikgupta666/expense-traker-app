const PDFDocument = require("pdfkit")
const nodemailer = require("nodemailer")
const fs = require('fs')

// const transactions = [{
//     date: "2023-10-01",
//     amount: 100.00,
//     description: "Groceries"
// }, {
//     date: "2023-10-02",
//     amount: 50.00,
//     description: "Transport"
// }, {
//     date: "2023-10-03",
//     amount: 200.00,
//     description: "Utilities"
// }, {
//     date: "2023-10-04",
//     amount: 150.00,
//     description: "Dining Out"
// }, {
//     date: "2023-10-05",
//     amount: 75.00,
//     description: "Entertainment"
// }]

const generatePDF = (filePath, transactions, email, callback) => {
    if (transactions.length === 0) {
        return
    }
    else {

        const doc = new PDFDocument({ margin: 50 });
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // 🎨 Title Styling
        doc.fillColor("#0073e6").fontSize(22).text("Expense Tracker Transaction Report", { align: "center", underline: true });

        doc.moveDown();
        doc.fillColor("#333").fontSize(14).text(`Report for: ${email}`, { align: "center" });

        doc.moveDown(2);
        const Y = doc.y
        // 🏛️ Define Table Column Positions and Widths
        const colX = [50, 200, 350]; // X positions for Date, Amount, Description
        const colWidth = [150, 100, 150]; // Column widths
        const rowHeight = 20; // Row spacing

        // 🏦 Draw Table Headers with Fixed Width & Alignment
        doc
            .font("Helvetica-Bold")
            .fontSize(12)
            .text("Date", colX[0], Y, { width: colWidth[0], align: "center" })
            .text("Amount", colX[1], Y, { width: colWidth[1], align: "center" })
            .text("Description", colX[2], Y, { width: colWidth[2], align: "center" });

        // 🔹 Draw a Separator Line Below the Header
        doc.moveTo(50, doc.y + 5).lineTo(550, doc.y + 5).stroke();
        doc.moveDown(1.5);

        // 🏦 Table Rows (Properly Aligned)
        let sum = 0;
        transactions.forEach((transaction, index) => {
            sum += transaction.amount;
            const y = doc.y;

            // Apply alternate row background color
            if (index % 2 === 0) {
                doc.rect(50, y - 2, 500, 18).fill("#f2f2f2").stroke();
            }

            doc
                .fillColor("#000")
                .font("Helvetica")
                .text(transaction.date, colX[0], y, { width: colWidth[0], align: "center" })
                .text(transaction.amount.toFixed(2), colX[1], y, { width: colWidth[1], align: "center" })
                .text(transaction.description, colX[2], y, { width: colWidth[2], align: "center" });

            doc.moveDown();
        });

        doc.moveDown(2);
        const BelowY = doc.y
        // 🔥 Total Amount Styling (Aligned with Amount Column)
        doc
            .fillColor("#ff5733")
            .font("Helvetica-Bold")
            .fontSize(14)
            .text("Total Amount", colX[0], BelowY, { width: colWidth[0], align: "left" })
            .fillColor("#28a745")
            .text(`₹ ${sum.toFixed(2)}`, colX[1], BelowY, { width: colWidth[1], align: "right" });

        // ✅ Finalize PDF
        doc.end();

        stream.on("finish", () => {
            console.log("PDF Created: " + filePath);
            callback();
        });

    }
};


// Function to send email
const sendEmailWithPDF = async (filePath, recipientEmail) => {
    try {
        // Configure Nodemailer transport
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.APP_MAIL, // Replace with your email
                pass: process.env.APP_PASSWORD // Use an App Password if using Gmail
            }
        });

        // Email options
        const mailOptions = {
            from: process.env.APP_MAIL,
            to: recipientEmail,
            subject: "Your Expense Tracker Transaction Report",
            text: ` ${recipientEmail} , Please find attached your transaction report.`,
            attachments: [
                {
                    filename: "Expense_Tracker_Transactions.pdf",
                    path: filePath
                }
            ]
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = { generatePDF, sendEmailWithPDF }