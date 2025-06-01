import './DrawerUI.css';
import { useEffect, useRef, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerHeader,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/tunedDrawer";
import { Button } from "@/components/ui/button";
import Dock from "./reactbits/Dock/tunedDock.tsx";
import { LayoutGrid,UserRound,BriefcaseBusiness,BookText,Mail,Info,/*FileQuestion,Settings*/ } from "lucide-react";
import { SelectObj,CommunicateStrProps,OpenDialog }from "./lib/bridge.ts"

function DrawerUI() {
  const [open, setOpen] = useState(false);
  const [baseItemSize, setBaseItemSize] = useState(80);
  const dockRef = useRef<HTMLDivElement | null>(null);
  const items = [
    { icon: <UserRound size={30} />, label: 'Profile', onClick: () => Selected('Profile'), className:'rounded-lg border-4 dark:bg-black !border-blue-500' },
    { icon: <BriefcaseBusiness size={30} />, label: 'Work', onClick: () => Selected('Work'), className:'rounded-lg border-4 dark:bg-black !border-green-300' },
    { icon: <BookText size={30} />, label: 'Sandbox', onClick: () => Selected('Sandbox'), className:'rounded-lg border-4 dark:bg-black !border-orange-300' },
    { icon: <Mail size={30} />, label: 'Contact', onClick: () => Selected('Contact'), className:'rounded-lg border-4 dark:bg-black !border-red-400' },
    { icon: <Info size={30} />, label: 'Info', onClick: () => DirectOpenDialog('Info'), className:'rounded-lg border-4 dark:bg-black !border-black-200' },
  ];
  function Selected(str:CommunicateStrProps|null|undefined){
    setOpen(false);
    SelectObj(str);
  }
  function DirectOpenDialog(str:string|null|undefined){
    setOpen(false);
    OpenDialog(str);
  }
  //adjust docks
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (dockRef.current) {
          const dockWidth = dockRef.current.scrollWidth;
          const windowWidth = window.innerWidth;
          if (dockWidth > windowWidth * 0.9) {
            setBaseItemSize(50);
          }
        }
      }, 0); // 次のレンダリングタイミングに遅らせる
    }
  }, [open]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="lg" className="drawer-trigger-fixed bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-100">
          <LayoutGrid size={10} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className='rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border border-gray-100'>
        <DrawerHeader></DrawerHeader>
        <DrawerTitle></DrawerTitle>
        <DrawerDescription></DrawerDescription>
        <Dock 
          items={items}
          panelHeight={80}
          baseItemSize={baseItemSize}
          magnification={100}
          dockHeight={10}
          className=''
          ref={dockRef}
        />
      </DrawerContent>
    </Drawer>
  )
}

export default DrawerUI
