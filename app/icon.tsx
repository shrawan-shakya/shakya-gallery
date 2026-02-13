import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
    // Read the font file from the filesystem
    const fontPath = path.join(process.cwd(), "assets", "fonts", "CormorantGaramond-Regular.ttf");
    const fontData = fs.readFileSync(fontPath);

    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 24,
                    background: "#e4e4e4", // soft gray
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#000000", // black
                    fontFamily: '"Cormorant Garamond"',
                    borderRadius: "2px",
                }}
            >
                S
            </div>
        ),
        // ImageResponse options
        {
            ...size,
            fonts: [
                {
                    name: 'Cormorant Garamond',
                    data: fontData,
                    style: 'normal',
                    weight: 400,
                },
            ],
        }
    );
}
