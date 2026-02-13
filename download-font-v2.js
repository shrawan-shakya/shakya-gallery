const fs = require('fs');
const path = require('path');

const url = "https://github.com/google/fonts/raw/main/ofl/cormorantgaramond/CormorantGaramond-Regular.ttf";
const dest = path.join(process.cwd(), 'assets', 'fonts', 'CormorantGaramond-Regular.ttf');

async function downloadFont() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Unexpected response ${response.statusText}`);

        const buffer = await response.arrayBuffer();
        fs.writeFileSync(dest, Buffer.from(buffer));

        console.log('Download completed successfully');
    } catch (error) {
        console.error('Error downloading font:', error.message);
        process.exit(1);
    }
}

downloadFont();
