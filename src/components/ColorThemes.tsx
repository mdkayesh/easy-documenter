import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { CiCircleCheck } from "react-icons/ci";
import { z } from "zod";
import { formSchema } from "./form/validationSchemas";

const colors = [
  {
    primary: "#E11D48",
    secondary: "#27272A",
    background: "#0C0A09",
    textColor: "#F2F2F2",
    muted: "#A1A1AA",
  },
  {
    primary: "#64FFDA",
    secondary: "#011A23",
    background: "#001118",
    textColor: "#BFC9E3",
    muted: "#878DA0",
  },
  {
    primary: "#EA580C",
    secondary: "#292524",
    background: "#0C0A09",
    textColor: "#FAFAF9",
    muted: "#A8A29E",
  },
  {
    primary: "#22C55E",
    secondary: "#27272A",
    background: "#0C0A09",
    textColor: "#F2F2F2",
    muted: "#A1A1AA",
  },
  {
    primary: "#3B82F6",
    secondary: "#020817",
    background: "#09090B",
    textColor: "#BFC9E3",
    muted: "#A1A1AA",
  },
];

type DocumentSectionProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

const ColorThemes = ({ form }: DocumentSectionProps) => {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [themes, setThemes] = useState(colors);

  const handleSelectTheme = (index: number) => {
    setSelectedTheme(index !== selectedTheme ? index : index);
    form.setValue("theme", themes[index]);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setThemes((prev) => {
      const newThemes = [...prev];
      newThemes[selectedTheme] = {
        ...newThemes[selectedTheme],
        [key]: e.target.value,
      };
      return newThemes;
    });

    form.setValue(`theme`, themes[selectedTheme]);
  };

  useEffect(() => {
    if (!form.getValues().theme.primary) return;
    setThemes((prev) => {
      const newThemes = [...prev];
      newThemes[selectedTheme] = form.getValues("theme");
      return newThemes;
    });

    return () => {};
  }, []);

  return (
    <div className="mt-6">
      <h1 className="text-xl font-semibold my-6">Color Themes</h1>

      <div className="flex flex-wrap gap-x-24 gap-y-4">
        {themes.map((theme, index) => {
          return (
            <div className={`relative h-10 w-10 cursor-pointer`} key={index}>
              {index === selectedTheme && (
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-40 text-2xl">
                  <CiCircleCheck />
                </div>
              )}
              {Object.entries(theme).map(([key, value], i) => (
                <div
                  key={key}
                  className={`${
                    index === selectedTheme ? "opacity-80" : "opacity-100"
                  } absolute top-0 rounded-lg shadow-lg border h-full w-full`}
                  style={{
                    backgroundColor: value,
                    left: `${i * 50}%`,
                    zIndex: 10 - i,
                  }}
                  onClick={() => handleSelectTheme(index)}
                />
              ))}
            </div>
          );
        })}
      </div>

      <h3 className="mt-7 font-semibold">Customize Colors</h3>
      <div className="flex gap-4 items-center mt-4">
        {Object.entries(themes[selectedTheme]).map(([key, value], i) => {
          return (
            <label
              key={key}
              htmlFor={`colorPicker_${key}`}
              className="cursor-pointer"
            >
              <p className="capitalize text-muted-foreground text-xs">{key}</p>
              <div
                className="h-10 w-10 rounded-lg shadow-lg border mt-0.5"
                style={{
                  backgroundColor: value,
                }}
              />
              <input
                type="color"
                id={`colorPicker_${key}`}
                value={value}
                onChange={(e) => handleChange(e, key)}
                className="hidden"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default ColorThemes;
