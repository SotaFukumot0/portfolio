// src/config/particlesOptions.ts
import { ISourceOptions, OutMode } from "@tsparticles/engine";

export const particlesOptions = {
    autoPlay:true,
      "background": {
      "color": {
        "value": "#ffffff"
      },
      // "image": "url('https://particles.js.org/images/background3.jpg')",
      "position": "50% 50%",
      "repeat": "no-repeat",
      "size": "cover",
      "opacity": 1
    },
    "backgroundMask": {
      "composite": "destination-out",
      "cover": {
        "opacity": 1,
        "color": {
          "value": {
            "r": 255,
            "g": 255,
            "b": 255
          }
        }
      },
      "enable": true
    },
    "clear": true,
    "defaultThemes": {},
    "delay": 0,
    "fullScreen": {
      "enable": true,
      "zIndex": 0
    },
    "detectRetina": true,
    "duration": 0,
    "fpsLimit": 120,
    "interactivity": {
    "detectsOn": "window",
    "events": {
      "onClick": {
        "enable": true,
        "mode": "push"
      },
    "onDiv": {
        "selectors": {},
        "enable": false,
        "mode": {},
        "type": "circle"
      },
      "onHover": {
        "enable": true,
        "mode": "bubble",
        "parallax": {
          "enable": false,
          "force": 2,
          "smooth": 10
        }
      },
      "resize": {
        "delay": 0.5,
        "enable": true
      }
    },
    particles: {
      color: {
        value: "#000000",
      },
      move: {
        enable: true,
        speed: 2,
        outModes: {
          default: OutMode.bounce,
        },
      },
      number: {
        value: 100,
        density: {
          enable: true,
          area: 800,
        },
      },
      opacity: {
        value: 1,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: 5,
        random: true,
      },
    },
} as ISourceOptions;
