"use client";

import { CSS } from "@/data/css";
import { CUSTOMJS } from "@/data/customjs";
import { HTML } from "@/data/html";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { CalendarIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ColorThemes from "../ColorThemes";
import DocumentSection from "../DocumentSection";
import DownloadJsonBtn from "../DownloadJsonBtn";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Textarea } from "../ui/textarea";
import { formSchema } from "./validationSchemas";

const defaultValues: z.infer<typeof formSchema> = {
  name: "",
  subline: "",
  email: "",
  favicon: "",
  logo: "",
  username: "",
  description: "",
  website: undefined,
  sections: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  theme: {
    primary: "#E11D48",
    secondary: "#27272A",
    background: "#0C0A09",
    textColor: "#F2F2F2",
    muted: "#A1A1AA",
  },
};

const DocumentForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const handleDownloadZip = async () => {
      const zip = new JSZip();

      // Define the folder and file structure
      const folderName = "document";
      const indexHtmlContent = HTML;
      const cssContent = CSS;
      const customjsContent = CUSTOMJS;
      const configjsContent = `const config = ${JSON.stringify(values)}`;

      // Create folder structure and add files
      zip.folder(folderName)?.file("index.html", indexHtmlContent);
      zip.folder(folderName)?.file("/assets/config.js", configjsContent);
      zip
        .folder(`${folderName}`)
        ?.file("/assets/styles/custom.css", cssContent);
      zip.folder(`${folderName}`)?.file("/assets/custom.js", customjsContent);

      try {
        // Generate the zip file and trigger download
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, "document.zip");
      } catch (error) {
        console.error("Error generating zip file:", error);
      }
    };
    handleDownloadZip();
  }

  // useEffect(() => {
  //   const subscription = form.watch((values) => {
  //     // Debounce autosave by setting a delay
  //     const timer = setTimeout(() => {
  //       autosave(values as any);
  //     }, 5000); // Save after 1 second of inactivity

  //     // Clear the timeout if the effect runs again (user is still typing)
  //     return () => clearTimeout(timer);
  //   });

  //   return () => subscription.unsubscribe();
  // }, [form, form.watch]); // Watch all form changes

  // add saved data when page reload
  useEffect(() => {
    const savedData = localStorage.getItem("savedData");
    if (savedData) {
      form.reset(JSON.parse(savedData));
    }
  }, [form]);

  return (
    <div className="mt-10">
      <h1 className="mb-6 text-xl font-medium">Document Info</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 items-end">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: ArtFolio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subline*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: React portfolio template"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Create by*</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>website</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: https://website.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: johndoe@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="createdAt"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Created At*</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="updatedAt"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Updated At*</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: https://website.com/logo.png"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="favicon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Favicon*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: https://website.com/favicon.ico"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormLabel>Description*</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write description about your item..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ColorThemes form={form} />

          <DocumentSection form={form} />
          <div className="flex justify-end mt-6 gap-4">
            <DownloadJsonBtn />
            <Button type="submit">Build Documentation</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DocumentForm;
