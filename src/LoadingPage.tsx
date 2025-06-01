import { useEffect, useMemo, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./components/ui/button.tsx";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  ISourceOptions
} from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import jsonParticleOption from "./lib/particlesOption.json"
import LetterGlitch from "./reactbits/LetterGlitch/tunedLetterGlitch.tsx";
import CountUp from './reactbits/CountUp/CountUp';
import { getCurrentTheme } from "./components/theme-provider.tsx";

type LoadingPageProps = {
  loadingProgression: number;
  isLoaded: boolean;
};

function LoadingPage({ loadingProgression, isLoaded }: LoadingPageProps) {
  const [visible, setVisible] = useState(true); 
  const [fadeOut, setFadeOut] = useState(false);
  const [init, setInit] = useState(false);
  const baseParticleCountRef = useRef<number | null>(null);
  const countUpEndedRef = useRef(false);
  const [theme,setTheme]=useState("system");
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setInit(true));
    setTheme(getCurrentTheme()=="light"?"dark":"light");
  }, []);

  const handleCountUpEnd = () => {
    countUpEndedRef.current = true;
    if (isLoaded) {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 4000);
    }
  };

  const options: ISourceOptions = useMemo(() => {
    if (baseParticleCountRef.current === null) {
      baseParticleCountRef.current =
        jsonParticleOption.particles?.number?.value ?? 30;
    }
    const base = baseParticleCountRef.current;
    const count = base + Math.round((100 - base) * Math.min(1, Math.max(0, loadingProgression)));
    // const count = baseParticleCount;
    const dynamicOptions = {
      ...jsonParticleOption,
      backgroundMask:{
        composite: "destination-out",
        cover:{
          color:{
            opacity: 1,
            value: getCurrentTheme()=="light"?{
              r: 255,
              g: 255,
              b: 255
            }:{
              r: 30,
              g: 30,
              b: 30
            }
          },
        },
        enable: true
      },
      particles: {
        ...jsonParticleOption.particles,
        number: {
          ...(jsonParticleOption.particles?.number || {}),
          value: count,
        },
      },
    };

    return dynamicOptions as unknown as ISourceOptions;
  }, [loadingProgression]);
  // const options: ISourceOptions = useMemo(() => {return jsonParticleOption as unknown as ISourceOptions},[]);
  const particlesElement = useMemo(() => {
    return <Particles id="tsparticles-loading" options={options} />;
  }, [init]);

  if (!init || !visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-2000 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <Card className="w-screen h-screen p-0 rounded-none shadow-none border-0 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
          <LetterGlitch
            glitchColors={["#2c14e3", "#e37514", "#14e384"]}
            glitchSpeed={50}
            centerVignette={false}
            outerVignette={true}
            smooth={true}
            bgClassName="bg-gray-200 dark:bg-black"
          />
        </div>
        {init && particlesElement}
        <Card className="absolute w-full max-w-md mx-auto border-primary border-2 bg-background top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <CardContent className="flex flex-col items-center justify-center">
            <div>NowLoading...</div>
            <CountUp
              from={0}
              to={loadingProgression*100}
              separator=","
              direction="up"
              duration={1}
              onEnd={handleCountUpEnd}
              className="text-primary text-4xl font-bold m-4"
            />
            <Button
              onClick={() => {
                const currentUrl = new URL(window.location.href)
                currentUrl.searchParams.set('theme', theme)
                window.location.href = currentUrl.toString()
              }}
              className="mt-4"
            >
              {`switch to ${theme} mode`}
            </Button>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}

export default LoadingPage;
