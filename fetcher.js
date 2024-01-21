const http = require('http');
const fs = require('fs');

//take inputs
const [url, filePath] = process.argv.slice(2);

if (!url || !filePath) {
  console.log("Please provide both a URL and a local file path.");
  process.exit(1);
}
//download and save
const downloadFile = (url, filePath) => {
  http.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });
    //log success or error
    response.on('end', () => {
      fs.writeFile(filePath, data, (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log(`Downloaded and saved ${Buffer.byteLength(data)} bytes to ${filePath}`);
        }
      });
    });
  }).on('error', (err) => {
    console.error('Error downloading resource:', err);
  });
};

downloadFile(url, filePath);
