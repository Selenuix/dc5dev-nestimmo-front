'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import {Button} from "@/components/ui/button";
import FormCategory from "./FormCategory";
import {useState} from "react";

const DrawerCategory = () => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="default">
          Create new category
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center">Add new category</DrawerTitle>
          <DrawerDescription className="text-center">Please fill the form.</DrawerDescription>
          <FormCategory setOpen={setOpen}/>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline" className="w-full">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default DrawerCategory;