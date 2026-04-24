"use client";

import Link from "next/link";
import TiltedCard from "./TiltedCard";

interface MealCardProps {
  id: string;
  name: string;
  thumbnail: string;
  ingredient: string;
}

export default function MealCard({ id, name, thumbnail, ingredient }: MealCardProps) {
  return (
    <Link
      href={`/ingredients/${encodeURIComponent(ingredient)}/${id}`}
      className="block"
    >
      <TiltedCard
        imageSrc={thumbnail}
        altText={name}
        captionText={name}
        containerHeight="240px"
        containerWidth="100%"
        imageHeight="240px"
        imageWidth="100%"
        rotateAmplitude={12}
        scaleOnHover={1.05}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
        overlayContent={
          <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-linear-to-t from-black/70 to-transparent rounded-b-[15px]">
            <p className="text-white text-xs font-semibold line-clamp-2 leading-tight">
              {name}
            </p>
          </div>
        }
      />
    </Link>
  );
}
