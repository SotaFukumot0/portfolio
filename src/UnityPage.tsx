import './UnityPage.css';
import { useEffect,useState,useCallback } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { Card } from "@/components/ui/card"
import { ReactUnityEventParameter } from 'react-unity-webgl/distribution/types/react-unity-event-parameters';
import { OpenDialog }from "./lib/bridge.ts"
import LoadingPage from "./LoadingPage";

let unitySendMessage: ((gameObjectName: string, methodName: string, parameter?: ReactUnityEventParameter) => void);
let unityIsLoaded = false;

export function getUnityMessenger() {
  return {
    sendMessage: unitySendMessage,
    isLoaded: unityIsLoaded,
  };
}

function UnityPage() {
  const { unityProvider,isLoaded,loadingProgression,sendMessage,addEventListener,removeEventListener } = useUnityContext({
    loaderUrl: "Unity/Build/Builds.loader.js",
    dataUrl: "Unity/Build/Builds.data",
    frameworkUrl: "Unity/Build/Builds.framework.js",
    codeUrl: "Unity/Build/Builds.wasm",
    workerUrl: "Unity/Build/Builds.worker.js",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "SotaFukumoto",
    productName: "MyPortfolio",
    productVersion: "0.1.0",
  });
  //DynamicDevicePixelRatio
  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio
  );
  useEffect(
    function () {
      const updateDevicePixelRatio = function () {
        setDevicePixelRatio(window.devicePixelRatio);
      };
      const mediaMatcher = window.matchMedia(
        `screen and (resolution: ${devicePixelRatio}dppx)`
      );
      mediaMatcher.addEventListener("change", updateDevicePixelRatio);
      return function () {
        mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
      };
    },
    [devicePixelRatio]
  );
  //webConversation
  useEffect(() => {
    unitySendMessage = sendMessage;
    unityIsLoaded = isLoaded;
  }, [sendMessage, isLoaded]);

  const onOpenDialog = useCallback((...parameters: ReactUnityEventParameter[]) => {
    const str = parameters[0];
    if (typeof str === "string") {
      // console.log("[Unity -> React] OpenDialog:", str);
      OpenDialog(str);
    }
  }, []);
  useEffect(() => {
      addEventListener("OpenDialog", onOpenDialog);
      return () => {
        removeEventListener("OpenDialog", onOpenDialog);
      };
    }, [addEventListener, removeEventListener,onOpenDialog]);

  return (
      <Card className="w-screen h-screen p-0 rounded-none shadow-none border-0">
        <Unity
          unityProvider={unityProvider}
          devicePixelRatio={devicePixelRatio}
          className={`w-screen h-screen ${isLoaded ? "visible" : "invisible"}`}
        />
        <LoadingPage loadingProgression={loadingProgression} isLoaded={isLoaded} />
      </Card>
  );
}

export default UnityPage