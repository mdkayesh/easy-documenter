import React from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Button } from "./ui/button";
import { HTML } from "@/data/html";
import { CUSTOMJS } from "@/data/customjs";
import { CSS } from "@/data/css";

const DownloadBtn = () => {
  const handleDownloadZip = async () => {
    const zip = new JSZip();

    // Define the folder and file structure
    const folderName = "document";
    const indexHtmlContent = HTML;
    const cssContent = CSS;
    const customjsContent = CUSTOMJS;
    const configjsContent =
      `const config = ${localStorage.getItem("savedData")}` ||
      "const config = {}";

    // Create folder structure and add files
    zip.folder(folderName)?.file("index.html", indexHtmlContent);
    zip.folder(folderName)?.file("/assets/config.js", configjsContent);
    zip.folder(`${folderName}`)?.file("/assets/styles/custom.css", cssContent);
    zip.folder(`${folderName}`)?.file("/assets/custom.js", customjsContent);

    try {
      // Generate the zip file and trigger download
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "document.zip");
    } catch (error) {
      console.error("Error generating zip file:", error);
    }
  };
  return (
    <Button type="button" onClick={handleDownloadZip}>
      Download
    </Button>
  );
};

export default DownloadBtn;
