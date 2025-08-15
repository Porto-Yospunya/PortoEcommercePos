import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";

export const uploadImage = async (file: File | null, dirname: string) => {
  let url = "";
  if (file !== null && typeof file !== "string" && file.name !== "") {
    const filename = `${uuid()}-${file.name}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadDir = path.join(process.cwd(), `public/uploads/${dirname}`);
    await mkdir(uploadDir, { recursive: true });

    const uploadPath = path.join(uploadDir, filename);
    await writeFile(uploadPath, buffer);
    url = `/uploads/${dirname}/${filename}`;
  }

  return url;
};
