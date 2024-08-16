import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import * as React from "react";

interface DrawerDialogProps {
  // triggerText: string;
  title: string;
  description: string;
  onSubmit?: (event: React.FormEvent) => void;
  children: React.ReactNode;
  formClassName?: string;
  dialogClassName?: string;
  drawerClassName?: string;
  dialogTitleClassName?: string;
  dialogDescriptionClassName?: string;
  drawerTitleClassName?: string;
  drawerDescriptionClassName?: string;
  btnProps?: ButtonProps;
}

export function DrawerDialog({
  // triggerText,
  title,
  description,
  // onSubmit,
  children,
  // formClassName,
  dialogClassName,
  drawerClassName,
  dialogDescriptionClassName,
  dialogTitleClassName,
  drawerDescriptionClassName,
  drawerTitleClassName,
  btnProps,
}: DrawerDialogProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   if (onSubmit) {
  //     onSubmit(event);
  //   }
  // };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button {...btnProps} />
        </DialogTrigger>
        <DialogContent className={cn("sm:max-w-[425px]", dialogClassName)}>
          <DialogHeader>
            <DialogTitle className={dialogTitleClassName}>{title}</DialogTitle>
            <DialogDescription className={dialogDescriptionClassName}>
              {description}
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button {...btnProps} />
      </DrawerTrigger>
      <DrawerContent className={drawerClassName}>
        <DrawerHeader className="text-left">
          <DialogTitle className={drawerTitleClassName}>{title}</DialogTitle>
          <DialogDescription className={drawerDescriptionClassName}>
            {description}
          </DialogDescription>
        </DrawerHeader>
        <div className="px-4">{children}</div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
