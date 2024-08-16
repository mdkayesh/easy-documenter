"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema, sectionSchema } from "./form/validationSchemas";
import { FormControl, FormField, FormItem } from "./ui/form";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Quill loading</p>,
});

type TextEditorProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  activeSection: number;
  sections: z.infer<typeof sectionSchema>[]; // Remove the initial empty array type
  setSections: Dispatch<SetStateAction<z.infer<typeof sectionSchema>[]>>;
};

function TextEditor({
  form,
  activeSection,
  sections,
  setSections,
}: TextEditorProps) {
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  useEffect(() => {
    // Update the value of the field when activeSection changes
    const currentContent = form.getValues(`sections.${activeSection}.content`);
    form.setValue(`sections.${activeSection}.content`, currentContent);
  }, [activeSection, form, setSections]);

  if (form.getValues("sections").length === 0) {
    return (
      <div className="bg-background p-10 rounded-lg border flex justify-center items-center">
        No section added yet!
      </div>
    );
  }

  // return (
  //   <ReactQuill
  //     theme="snow"
  //     value={value}
  //     onChange={setValue}
  //     modules={{
  //       toolbar: toolbarOptions,
  //     }}
  //   />
  // );

  console.log(form.getValues());

  return (
    <FormField
      control={form.control}
      name={`sections.${activeSection}.content`}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <ReactQuill
              theme="snow"
              value={field.value}
              onChange={(v) => {
                setSections((prev) => {
                  const newSections = [...prev];
                  newSections[activeSection].content = v;
                  return newSections;
                });
                return field.onChange(v);
              }}
              modules={{
                toolbar: toolbarOptions,
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export default TextEditor;
