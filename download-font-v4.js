const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = [
    "https://cdn.jsdelivr.net/fontsource/fonts/cormorant-garamond@latest/latin-400-normal.ttf", // Fontsource (reliable)
    "https://github.com/google/fonts/raw/main/ofl/cormorantgaramond/CormorantGaramond-Regular.ttf",
    "https://github.com/google/fonts/raw/master/ofl/cormorantgaramond/CormorantGaramond-Regular.ttf"
];

const dest = path.join(process.cwd(), 'assets', 'fonts', 'CormorantGaramond-Regular.ttf');

// Ensure directory exists
const dir = path.dirname(dest);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

function download(urlIndex) {
    if (urlIndex >= urls.length) {
        console.error('All download attempts failed.');
        process.exit(1);
        return;
    }

    const url = urls[urlIndex];
    console.log(`Trying ${url}...`);

    https.get(url, (response) => {
        // Redirects
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
            console.log(`Redirecting to ${response.headers.location}`);
            https.get(response.headers.location, (res) => {
                handleResponse(res, urlIndex);
            }).on('error', () => download(urlIndex + 1));
            return;
        }
        handleResponse(response, urlIndex);
    }).on('error', (err) => {
        console.error(`Error with ${url}: ${err.message}`);
        download(urlIndex + 1);
    });
}

function handleResponse(response, urlIndex) {
    if (response.statusCode !== 200) {
        console.error(`Failed with status ${response.statusCode}`);
        download(urlIndex + 1);
        return;
    }

    const file = fs.createWriteStream(dest);
    response.pipe(file);

    file.on('finish', () => {
        file.close();
        // Check file size
        const stats = fs.statSync(dest);
        if (stats.size < 1000) {
            console.error('File too small, likely corrupted or HTML.');
            fs.unlinkSync(dest);
            download(urlIndex + 1);
        } else {
            console.log(`Download completed successfully! Size: ${stats.size} bytes`);
        }
    });
}

download(0);
