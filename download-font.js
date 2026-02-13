const fs = require('fs');
const https = require('https');
const path = require('path');

const url = "https://github.com/google/fonts/raw/main/ofl/cormorantgaramond/CormorantGaramond-Regular.ttf";
const dest = path.join(process.cwd(), 'assets', 'fonts', 'CormorantGaramond-Regular.ttf');

const file = fs.createWriteStream(dest);

https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
        file.close();
        console.log('Download completed');
    });
}).on('error', (err) => {
    fs.unlink(dest);
    console.error('Error downloading font:', err.message);
    process.exit(1);
});
