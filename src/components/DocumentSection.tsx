import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import SectionBtns from "./SectionBtns";
import SectionList from "./SectionList";
import { formSchema, sectionSchema } from "./form/validationSchemas";
import dynamic from "next/dynamic";
import SectionTitleInput from "./SectionTitleInput";

const TextEditor = dynamic(() => import("@/components/TextEditor"), {
  ssr: false,
});

type DocumentSectionProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

const DocumentSection = ({ form }: DocumentSectionProps) => {
  const [activeSection, setAciveSection] = useState(NaN);
  const [sections, setSections] = useState<
    z.infer<typeof sectionSchema>[] | []
  >([]);

  useEffect(() => {
    const savedData = localStorage.getItem("savedData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setSections(parsedData.sections);
      setAciveSection(parsedData.sections.length > 0 ? 0 : NaN);
    }
    return () => {};
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold my-6">Document Section</h1>

      <SectionBtns
        form={form}
        sections={sections}
        setSections={setSections}
        activeSection={activeSection}
        setActiveSection={setAciveSection}
      />

      <div className="mt-7">
        <h3>Current Section Title</h3>
        <SectionTitleInput
          form={form}
          sections={sections}
          setSections={setSections}
          activeSection={activeSection}
        />
      </div>
      <div className="flex gap-6 mt-7 flex-col-reverse md:flex-row">
        <div className="flex-1">
          <TextEditor
            form={form}
            activeSection={activeSection}
            sections={sections}
            setSections={setSections}
          />
        </div>
        {/* sections */}
        <div className="min-w-[250px] w-full rounded-lg p-2 bg-background border h-fit md:w-auto">
          <h3 className="text-xl font-semibold">Sections</h3>

          <SectionList
            form={form}
            sections={sections}
            setSections={setSections}
            activeSection={activeSection}
            setActiveSection={setAciveSection}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentSection;
