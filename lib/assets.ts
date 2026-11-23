import fs from "fs";
import path from "path";

function toBase64(filePath: string) {
    const file = fs.readFileSync(filePath);
    return `data:image/png;base64,${file.toString("base64")}`;
}

export const ASSETS = {
    fish: toBase64(path.join(process.cwd(), "public/assets/fish.png")),
};
