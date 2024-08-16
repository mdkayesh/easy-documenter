"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FaRegEdit } from "react-icons/fa";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema, sectionSchema } from "./form/validationSchemas";

type SectionTitleInputProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  activeSection: number;
  sections: z.infer<typeof sectionSchema>[] | [];
  setSections: Dispatch<SetStateAction<[] | z.infer<typeof sectionSchema>[]>>;
};

const SectionTitleInput = ({
  form,
  sections,
  setSections,
  activeSection,
}: SectionTitleInputProps) => {
  const [updateName, setUpdateName] = useState("");
  const [editTitle, setEditTitle] = useState(false);

  useEffect(() => {
    const title = form.getValues(`sections.${activeSection}.title`);

    console.log(title);
    if (title) {
      setUpdateName(title);
    }

    return () => {};
  }, [activeSection, form]);

  const handleUpdateTitle = () => {
    if (!updateName) {
      alert("Please enter a section name");
      return;
    }

    setEditTitle(!editTitle);

    if (!editTitle) return;
    const existingSection = form
      .getValues("sections")
      .find((v) => v.title.toLowerCase() === updateName.toLowerCase());
    if (existingSection) {
      alert("Section already exists");
      return;
    }
    setSections((prev) => {
      const updatedSections = [...prev];
      updatedSections[activeSection].title = updateName;
      updatedSections[activeSection].id = updateName
        .split(" ")
        .join("-")
        .toLowerCase();
      return updatedSections;
    });

    form.setValue(`sections.${activeSection}.title`, updateName);
    form.setValue(
      `sections.${activeSection}.id`,
      updateName.split(" ").join("-").toLowerCase()
    );
  };

  return (
    <div>
      {sections.length > 0 && (
        <div className="flex gap-2 items-center mt-2 max-w-sm">
          <Input
            disabled={!editTitle}
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
          />

          <Button
            size={"sm"}
            className="text-base"
            type="button"
            onClick={handleUpdateTitle}
          >
            {editTitle ? "save" : <FaRegEdit />}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SectionTitleInput;
