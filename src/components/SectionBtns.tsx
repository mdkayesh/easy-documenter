import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import { z } from "zod";
import { DrawerDialog } from "./DrawerDialog";
import { formSchema, sectionSchema } from "./form/validationSchemas";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { DrawerClose } from "./ui/drawer";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type SectionBtnsProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  sections: [] | z.infer<typeof sectionSchema>[];
  setSections: Dispatch<SetStateAction<[] | z.infer<typeof sectionSchema>[]>>;
  activeSection: number;
  setActiveSection: Dispatch<SetStateAction<number>>;
};
const SectionBtns = ({
  form,
  sections,
  setSections,
  activeSection,
  setActiveSection,
}: SectionBtnsProps) => {
  const [sectionTitle, setSectionTitle] = useState("section 1");
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  // add the section
  const handleAddSection = () => {
    const existingSection = form
      .getValues("sections")
      .find((v) => v.title.toLowerCase() === sectionTitle.toLowerCase());
    if (existingSection) {
      alert("Section already exists");
      return;
    }

    setSections([
      ...sections,
      {
        title: sectionTitle,
        content: `write here about ${sectionTitle}`,
        id: sectionTitle.split(" ").join("-").toLowerCase(),
      },
    ]);

    // set the form data
    form.setValue("sections", [
      ...form.getValues("sections"),
      {
        title: sectionTitle,
        content: `write here about ${sectionTitle}`,
        id: sectionTitle.split(" ").join("-").toLowerCase(),
      },
    ]);

    const len = form.getValues("sections").length;
    setActiveSection(len === 0 ? 0 : len - 1);
  };

  // delete the section
  const handleDeleteSection = () => {
    const updatedSections = sections.filter(
      (_, index) => index !== activeSection
    );

    setSections(updatedSections);

    // set the form data
    form.setValue("sections", updatedSections);
  };

  // save data function
  const savingData = () => {
    setIsSaving(true);
    // Simulate saving to localStorage or server
    setTimeout(() => {
      localStorage.setItem("savedData", JSON.stringify(form.getValues()));
      setIsSaving(false);
    }, 1000); // Simulate a 1 second save time
  };

  // Live preview
  const handleLivePreview = () => {
    savingData();
  };

  return (
    <>
      <div className="flex gap-4 flex-wrap">
        <DrawerDialog
          title="Add Section"
          description="Add a unique name of section"
          btnProps={{
            variant: "secondary",
            className: "gap-2",
            children: (
              <>
                <span className="text-xl">
                  <FiPlus />
                </span>
                <span>Add Section</span>
              </>
            ),
          }}
        >
          <div className="grid gap-2">
            <div className="grid md:grid-cols-3 items-center gap-4">
              <Label htmlFor="add_section">Name</Label>
              <Input
                id="add_section"
                value={sectionTitle}
                className="col-span-2 h-8"
                onChange={(e) => setSectionTitle(e.target.value)}
              />
            </div>
            <DialogClose asChild className="hidden md:block">
              <Button
                className="w-full mt-3"
                type="button"
                onClick={handleAddSection}
              >
                Add
              </Button>
            </DialogClose>
            <DrawerClose asChild className="block md:hidden">
              <Button
                className="w-full mt-3"
                type="button"
                onClick={handleAddSection}
              >
                Add
              </Button>
            </DrawerClose>
          </div>
        </DrawerDialog>
        {sections.length > 0 && (
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button" variant={"destructive"} className="gap-2">
                <span className="text-xl">
                  <AiOutlineDelete />
                </span>
                <span>Delete Section</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure to delete{" "}
                  <strong className="text-destructive">
                    {form.getValues("sections")?.[activeSection]?.title}
                  </strong>{" "}
                  section?
                </DialogTitle>
                <DialogDescription>
                  This wil delete your section and remove all the edited data.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="destructive" onClick={handleDeleteSection}>
                    Delete
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        <Button
          type="button"
          variant={"destructive"}
          onClick={() => {
            form.reset();
            localStorage.removeItem("savedData");
            setSections([]);
          }}
        >
          Reset All
        </Button>
        {Object.keys(form.formState.errors).length === 0 && (
          <Button asChild variant={"outline"} onClick={handleLivePreview}>
            <Link href={"/live-preview"} target="_blank">
              Live Preview
            </Link>
          </Button>
        )}

        {/* saving data notification */}
        <div
          className={`fixed top-4 right-5 bg-secondary rounded-lg border border-green-600 text-green-600 text-sm z-50 ${
            isSaving ? "translate-x-0 " : "translate-x-[150%] delay-500"
          } transition-all duration-200`}
        >
          {isSaving ? (
            <p className="p-2">Saving...</p>
          ) : (
            <p className="p-2">Saved</p>
          )}
        </div>
        <Button variant={"default"} onClick={savingData} type="button">
          Save
        </Button>
      </div>
      <p className="text-sm mt-2 text-muted-foreground">
        <strong>Note: </strong>Please save the changes before preview the
        document and reload!
      </p>
    </>
  );
};

export default SectionBtns;
