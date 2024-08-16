import { Reorder } from "framer-motion";
import { Dispatch, SetStateAction, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema, sectionSchema } from "./form/validationSchemas";
import { Button } from "./ui/button";

type SectionListProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  sections: z.infer<typeof sectionSchema>[]; // Remove the initial empty array type
  setSections: Dispatch<SetStateAction<z.infer<typeof sectionSchema>[]>>;
  activeSection: number;
  setActiveSection: Dispatch<SetStateAction<number>>;
};

const SectionList = ({
  form,
  sections,
  setSections,
  setActiveSection,
  activeSection,
}: SectionListProps) => {
  const { setValue } = form;

  // Sync the form's sections state with the local sections state
  useEffect(() => {
    setValue("sections", sections);

    return () => {};
  }, [sections, setValue]);

  // Function to handle reordering
  const handleReorder = (newOrder: z.infer<typeof sectionSchema>[]) => {
    setSections(newOrder); // Update local state
  };

  return (
    <Reorder.Group values={sections} onReorder={handleReorder} className="mt-4">
      {sections.length === 0 && (
        <div className="text-center py-4">Add a section!</div>
      )}
      {sections.map((item, index) => (
        <Reorder.Item key={item.id} value={item}>
          <Button
            type="button"
            className="w-full "
            variant={activeSection === index ? "default" : "outline"}
            onClick={() => setActiveSection(index)}
          >
            {item.title}
          </Button>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default SectionList;
