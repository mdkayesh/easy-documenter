import Link from "next/link";
import React from "react";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
    <header className="sticky top-0 left-0 w-full py-3 px-6 border-b bg-background z-50">
      <nav className="flex justify-between items-center">
        <Link href={"/"} className="logo text-lg font-semibold">
          <span className="text-primary">Easy</span> Documenter
        </Link>

        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Navbar;
