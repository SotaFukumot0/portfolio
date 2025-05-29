import './DrawerUI.css';
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerHeader,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Dock from "./reactbits/Dock/Dock.tsx";
import { LayoutGrid,UserRound,BriefcaseBusiness,BookText,Mail,Info,/*FileQuestion,Settings*/ } from "lucide-react";
import { SelectObj,CommunicateStrProps,OpenDialog }from "./lib/bridge.ts"

function DrawerUI() {
  const [open, setOpen] = useState(false);
  const items = [
    { icon: <UserRound size={30} />, label: 'Profile', onClick: () => Selected('Profile') },
    { icon: <BriefcaseBusiness size={30} />, label: 'Work', onClick: () => Selected('Work') },
    { icon: <BookText size={30} />, label: 'Sandbox', onClick: () => Selected('Sandbox') },
    { icon: <Mail size={30} />, label: 'Contact', onClick: () => Selected('Contact') },
    { icon: <Info size={30} />, label: 'Info', onClick: () => DirectOpenDialog('Info')},
  ];
  function Selected(str:CommunicateStrProps|null|undefined){
    setOpen(false);
    SelectObj(str);
  }
  function DirectOpenDialog(str:string|null|undefined){
    setOpen(false);
    OpenDialog(str);
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="lg" className="drawer-trigger-fixed">
          <LayoutGrid size={10} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader></DrawerHeader>
        <DrawerTitle></DrawerTitle>
        <DrawerDescription></DrawerDescription>
        <Dock 
          items={items}
          panelHeight={80}
          baseItemSize={80}
          magnification={100}
          dockHeight={10}
        />
      </DrawerContent>
    </Drawer>
  )
}

export default DrawerUI
