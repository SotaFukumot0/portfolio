import { getUnityMessenger } from "../UnityPage";
import { OpenDialogUI } from "../DialogUI.tsx"
export type CommunicateStrProps="Profile"|"Work"|"Sandbox"|"Contact"|"Default";

// send to Unity
export function SelectObj(str:CommunicateStrProps|null|undefined) {
  // console.log("selectObj",str)
  const { sendMessage, isLoaded } = getUnityMessenger();
  if (isLoaded && sendMessage && str) {
    sendMessage("Scripts", "SelectObjectFromReact", str);
  } else {
    //for dev
    OpenDialog(str);
  }
  
}
// call from Unity
export function OpenDialog(str:string|null|undefined) {
  // console.log("OpenDialog",str)
  if(str && str=="Default") return;
  OpenDialogUI(str)
}
// set Theme in Unity
export function SetThemeUnity(theme:string|null|undefined){
  const { sendMessage, isLoaded } = getUnityMessenger();
  if (isLoaded && sendMessage && theme) {
    sendMessage("Scripts", "SetThemeFromReact", theme);
  }
}