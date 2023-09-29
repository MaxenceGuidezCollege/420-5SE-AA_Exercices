
module.exports = function(dd, o, path){

    let isStandard = false;

    if(o !== '-o'){
        isStandard = true;
    }

    if(path === undefined || path === null){
        path = '';
    }

// Define font files
    var fonts = {
        Roboto: {
            normal: 'C:\\Users\\202130087\\WebstormProjects\\420-5SE-AA\\s3\\tf3\\fonts/Roboto/Roboto-Regular.ttf',
            bold: 'C:\\Users\\202130087\\WebstormProjects\\420-5SE-AA\\s3\\tf3\\fonts/Roboto/Roboto-Medium.ttf',
            italics: 'C:\\Users\\202130087\\WebstormProjects\\420-5SE-AA\\s3\\tf3\\fonts/Roboto/Roboto-Italic.ttf',
            bolditalics: 'C:\\Users\\202130087\\WebstormProjects\\420-5SE-AA\\s3\\tf3\\fonts/Roboto/Roboto-MediumItalic.ttf'
        }
    };

    var PdfPrinter = require('pdfmake');
    var printer = new PdfPrinter(fonts);
    var fs = require('fs');

    var pdfDoc = printer.createPdfKitDocument(dd);
    if(isStandard){
        pdfDoc.pipe(process.stdout);
    }
    else{
        pdfDoc.pipe(fs.createWriteStream(path + 'document.pdf'));
    }
    pdfDoc.end();
}

