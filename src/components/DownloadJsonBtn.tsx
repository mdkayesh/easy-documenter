"use client";

import { Button } from "./ui/button";

const DownloadJsonBtn = () => {
  const downloadJsonFile = () => {
    const savedData = localStorage.getItem("savedData");
    if (savedData) {
      const blob = new Blob([savedData], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.download = "documenter.json"; // Filename for the download
      document.body.appendChild(link);
      link.click();

      // Clean up and remove the temporary link
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      alert("No saved data found to download!");
    }
  };

  return (
    <Button type="button" onClick={downloadJsonFile} variant={"outline"}>
      Download JSON
    </Button>
  );
};

export default DownloadJsonBtn;
