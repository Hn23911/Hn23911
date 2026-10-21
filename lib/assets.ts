import fs from "fs";
import path from "path";

function toBase64(filePath: string) {
    const file = fs.readFileSync(filePath);
    return `data:image/png;base64,${file.toString("base64")}`;
}

export const ASSETS = {
    sleepingCat: toBase64(path.join(process.cwd(), "public/assets/1.png")),
    awakeCat: toBase64(path.join(process.cwd(), "public/assets/2.png")),
    superCat: toBase64(path.join(process.cwd(), "public/assets/3.webp")),
    fish: toBase64(path.join(process.cwd(), "public/assets/4.webp")),
};

