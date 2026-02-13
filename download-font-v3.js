const https = require('https');
const fs = require('fs');
const path = require('path');

const url = "https://github.com/google/fonts/raw/main/ofl/cormorantgaramond/CormorantGaramond-Regular.ttf";
const dest = path.join(process.cwd(), 'assets', 'fonts', 'CormorantGaramond-Regular.ttf');

function download(url, dest) {
    const file = fs.createWriteStream(dest);

    https.get(url, (response) => {
        // Determine the redirect
        if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307) {
            console.log('Redirecting to:', response.headers.location);
            file.close();
            fs.unlinkSync(dest); // Delete partial file
            download(response.headers.location, dest); // Recursive call
            return;
        }

        if (response.statusCode !== 200) {
            console.error(`Failed to download: ${response.statusCode}`);
            file.close();
            fs.unlinkSync(dest);
            process.exit(1);
            return;
        }

        response.pipe(file);

        file.on('finish', () => {
            file.close();
            console.log('Download completed successfully');
        });
    }).on('error', (err) => {
        fs.unlink(dest);
        console.error('Error downloading font:', err.message);
        process.exit(1);
    });
}

// Ensure directory exists
const dir = path.dirname(dest);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

download(url, dest);
