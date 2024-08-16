import React from "react";
import { Button } from "./ui/button";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

const Socials = () => {
  return (
    <div className="flex gap-4 items-center">
      <Button
        variant={"outline"}
        size={"icon"}
        asChild
        className="text-muted-foreground"
      >
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl"
        >
          <FaLinkedinIn />
        </a>
      </Button>
      <Button
        variant={"outline"}
        size={"icon"}
        asChild
        className="text-muted-foreground"
      >
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl"
        >
          <FaFacebookF />
        </a>
      </Button>
      <Button
        variant={"outline"}
        size={"icon"}
        asChild
        className="text-muted-foreground"
      >
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl"
        >
          <FaXTwitter />
        </a>
      </Button>
      <Button
        variant={"outline"}
        size={"icon"}
        asChild
        className="text-muted-foreground"
      >
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl"
        >
          <FaGithub />
        </a>
      </Button>
    </div>
  );
};

export default Socials;
