import { OpenDialogUI } from "../DialogUI.tsx"
export type CommunicateStrProps="Profile"|"Work"|"Sandbox"|"Contact";

// send to Unity
export function SelectObj(str:CommunicateStrProps|null|undefined) {
  console.log("selectObj",str)
  //for dev
  OpenDialog(str)
}
// call from Unity
export function OpenDialog(str:string|null|undefined) {
  console.log("OpenDialog",str)
  OpenDialogUI(str)
}