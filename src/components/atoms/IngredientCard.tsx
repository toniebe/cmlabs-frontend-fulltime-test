"use client";

import { useRef } from "react";
import Link from "next/link";
import { ParticleCard } from "./MagicBento";
import { getIngredientImageUrl } from "@/lib/meals";

const GLOW_COLOR = "132, 0, 255";
const GLOW_RADIUS = 300;

interface IngredientCardProps {
  name: string;
}

export default function IngredientCard({ name }: IngredientCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = wrapperRef.current?.querySelector<HTMLElement>(".magic-bento-card");
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--glow-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--glow-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    el.style.setProperty("--glow-intensity", "0.85");
    el.style.setProperty("--glow-radius", `${GLOW_RADIUS}px`);
  };

  const handleMouseLeave = () => {
    const el = wrapperRef.current?.querySelector<HTMLElement>(".magic-bento-card");
    el?.style.setProperty("--glow-intensity", "0");
  };

  return (
    <div ref={wrapperRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <Link href={`/ingredients/${encodeURIComponent(name)}`} className="block">
        <ParticleCard
          className="magic-bento-card magic-bento-card--border-glow"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid rgb(229, 231, 235)",
            borderRadius: "0.75rem",
            padding: "1rem",
            "--glow-color": GLOW_COLOR,
          } as React.CSSProperties}
          particleCount={8}
          glowColor={GLOW_COLOR}
          clickEffect={true}
          enableTilt={false}
          enableMagnetism={false}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-20 h-20 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getIngredientImageUrl(name)}
                alt={name}
                className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <span className="text-xs text-center text-gray-700 font-medium line-clamp-2 leading-tight">
              {name}
            </span>
          </div>
        </ParticleCard>
      </Link>
    </div>
  );
}
