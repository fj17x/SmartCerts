const PDFDocument = require("pdfkit")
const fs = require("fs")
let spacer = 0

// var simplePDFCert = (data, path) => {
//   // Create a document
//   const doc = new PDFDocument({ size: "A4", layout: "landscape" })

//   if (fs.existsSync(data.logo.path)) {
//     spacer = 50
//   }

//   // HeadCert
//   headCert(doc, data)

//   // H2 Head
//   h2Head(doc, data)

//   // Name
//   awardee(doc, data)

//   // Subtitle
//   subtitle(doc, data)

//   // Date
//   certDate(doc, data)

//   doc.end()
//   doc.pipe(fs.createWriteStream(path))
// }

// let headCert = (doc, data) => {
//   if (fs.existsSync(data.logo.path)) {
//     doc
//       .image(data.logo.path, (doc.page.width - 100) / 2, 30, {
//         width: 100,
//       })
//       .moveDown()
//     doc
//       .fontSize(50)
//       .text(data.words.title, (doc.page.width - 600) / 2, 150, {
//         align: "center",
//         width: 600,
//       })
//       .moveDown()
//   } else {
//     doc
//       .fontSize(40)
//       .text(data.words.title, (doc.page.width - 600) / 2, 100 + spacer, {
//         align: "center",
//         width: 600,
//       })
//       .moveDown()
//   }
// }

// let h2Head = (doc, data) => {
//   doc
//     .fontSize(20)
//     .text(data.words.h2, (doc.page.width - 600) / 2, 190 + spacer, {
//       align: "center",
//       width: 600,
//     })
// }

// let awardee = (doc, data) => {
//   doc
//     .fontSize(60)
//     .text(data.words.awardee, (doc.page.width - 600) / 2, 250 + spacer, {
//       align: "center",
//       width: 600,
//     })
// }

// let subtitle = (doc, data) => {
//   doc
//     .fontSize(20)
//     .text(data.words.reason, (doc.page.width - 800) / 2, 350 + spacer, {
//       align: "center",
//       width: 800,
//     })
// }

// let certDate = (doc, data) => {
//   var d = new Date(),
//     dformat = [d.getDate(), d.getMonth() + 1, d.getFullYear()].join("/")
//   doc.fontSize(10).text(`Date Completed: ${dformat}`, 30, 500, {
//     align: "left",
//     width: 100,
//   })
// }

// module.exports = simplePDFCert

// const sampleData = {
//   logo: {
//     path: "./sampleLogo.jpg",
//   },
//   company: {
//     name: "Idemy Courses Inc",
//   },
//   words: {
//     title: "Certificate of Completion",
//     h2: "Awarded To",
//     awardee: "User Admin",
//     reason: "for completing THE NOTHING course",
//   },
// }

// simplePDFCert(sampleData, "output.pdf")
