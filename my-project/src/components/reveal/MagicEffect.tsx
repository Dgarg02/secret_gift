"use client";

import TreasureBox from "./effects/TreasureBox";
import CrystalOrb from "./effects/CrystalOrb";
import HeartsBurst from "./effects/HeartsBurst";
import FireworksMagic from "./effects/FireworksMagic";
import BalloonPop from "./effects/BalloonPop";
import SpinWheel from "./effects/SpinWheel";
import LetterUnroll from "./effects/LetterUnroll.tsx";
import ScratchReveal from "./effects/ScratchReveal";

export default function MagicEffect({ type }: { type: string }) {
  switch (type) {
    case "treasure":
      return <TreasureBox />;
    case "crystal":
      return <CrystalOrb />;
    case "hearts":
      return <HeartsBurst />;
    case "fireworks":
      return <FireworksMagic />;
    case "balloon":
      return <BalloonPop />;
    case "wheel":
      return <SpinWheel />;
    case "letter":
      return <LetterUnroll />;
    case "scratch":
      return <ScratchReveal />;
    default:
      return null;
  }
}
