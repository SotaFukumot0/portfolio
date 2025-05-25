import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  ISourceOptions
} from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import jsonParticleOption from "./lib/particlesOption.json"
import LetterGlitch from "./reactbits/LetterGlitch/LetterGlitch";

function Sandbox() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setInit(true));
  }, []);

  // const particlesLoaded = async (container?: Container): Promise<void> => {
  //   console.log("Particles container:", container);
  // };

const options: ISourceOptions = useMemo(() => jsonParticleOption as unknown as ISourceOptions, [jsonParticleOption]);

  if (!init) return null;

  return (
    <>
      <LetterGlitch
        glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
        glitchSpeed={50}
        centerVignette={true}
        outerVignette={false}
        smooth={true}
      />
      <Particles
        id="tsparticles"
        // particlesLoaded={particlesLoaded}
        options={options}
        style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      />
    </>
  );
}

export default Sandbox;
