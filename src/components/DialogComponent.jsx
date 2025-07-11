import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "@/components/ui/button";

export function DialogComponent({
  isOpen,
  onClose,
  name,
  description,
  children,
  onSubmit,
  submitLabel,
  cancelLabel,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black sm:max-w-md rounded-xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{name}</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              {description}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">{children}</div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                className={"cursor-pointer"}
                variant="outline"
                type="button"
              >
                {cancelLabel}
              </Button>
            </DialogClose>
            <Button className={"cursor-pointer"} type="submit">
              {submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
