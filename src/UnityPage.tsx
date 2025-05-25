import './UnityPage.css';
import { Unity, useUnityContext } from "react-unity-webgl";
import { Card } from "@/components/ui/card"

function UnityPage() {
  const { unityProvider,isLoaded,loadingProgression } = useUnityContext({
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


  return (
      <Card className="w-screen h-screen p-0 rounded-none shadow-none border-0">
        <Unity
          unityProvider={unityProvider}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </Card>
  );
}

export default UnityPage