import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

// Image metadata
export const size = {
    width: 192,
    height: 192,
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
                    fontSize: 140, // Scaled for 192px
                    background: "#e4e4e4", // soft gray
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#000000", // black
                    fontFamily: '"Cormorant Garamond"',
                    borderRadius: "4px", // Slightly larger radius
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
