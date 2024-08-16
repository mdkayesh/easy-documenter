"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-32 flex flex-col items-start p-2"
      >
        <PopoverClose onClick={() => setTheme("light")} asChild>
          <Button
            type="button"
            variant={"ghost"}
            className="text-left justify-start min-w-full"
          >
            Light
          </Button>
        </PopoverClose>
        <PopoverClose
          onClick={() => setTheme("dark")}
          className="text-left justify-start min-w-full"
          asChild
        >
          <Button type="button" variant={"ghost"}>
            Dark
          </Button>
        </PopoverClose>
        <PopoverClose
          onClick={() => setTheme("system")}
          className="text-left justify-start min-w-full"
          asChild
        >
          <Button type="button" variant={"ghost"}>
            System
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
