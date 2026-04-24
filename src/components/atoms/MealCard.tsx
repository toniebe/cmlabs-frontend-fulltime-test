import Link from "next/link";
import Image from "next/image";

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
      className="flex flex-col rounded-xl overflow-hidden border border-gray-200 hover:shadow-md hover:border-gray-400 transition-all bg-white group"
    >
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        <Image
          src={thumbnail}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <div className="p-3">
        <p className="text-sm font-medium text-gray-800 line-clamp-2">{name}</p>
      </div>
    </Link>
  );
}
