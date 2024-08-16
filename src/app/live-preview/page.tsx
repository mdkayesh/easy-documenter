"use client";

import React, { useEffect, useRef, useState } from "react";
import { HTML } from "@/data/html";
import { CUSTOMJS } from "@/data/customjs";
import { CSS } from "@/data/css";
import Loader from "@/components/Loader";

const LivePreviewPage = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const iframe = iframeRef.current;
    if (iframe) {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(HTML);
        doc.close();

        // Inject CSS
        const styleElement = doc.createElement("style");
        styleElement.textContent = CSS;
        doc.head?.appendChild(styleElement);
        // wait for load iframe

        iframe.onload = () => {
          if (doc.body) {
            // Inject JS
            const savedData = localStorage.getItem("savedData");
            if (savedData) {
              const scriptElement = doc.createElement("script");
              scriptElement.textContent = `const config = ${savedData}`;

              doc.body.appendChild(scriptElement);
            }

            const scriptElement = doc.createElement("script");
            scriptElement.textContent = CUSTOMJS;
            doc.body.appendChild(scriptElement);
          }
        };
      }
    }

    setIsLoading(false);
    return () => {};
  }, [HTML, CSS, CUSTOMJS]);

  return (
    <div>
      {isLoading && (
        <div className="h-[90vh] flex justify-center items-center">
          <Loader />
        </div>
      )}
      <iframe
        ref={iframeRef}
        title="Live Preview"
        // src=""
        className={`${
          isLoading ? "hidden" : "block"
        } w-full h-[calc(100vh-66px)]`}
      ></iframe>
    </div>
  );
};

export default LivePreviewPage;
