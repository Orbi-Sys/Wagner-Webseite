import Image from 'next/image';
import { Card } from './Card';

interface TeamCardProps {
  name: string;
  position: string;
  bio?: string;
  imageSrc?: string;
}

function PersonPlaceholder() {
  return (
    <div className="w-32 h-32 rounded-full bg-[#e0eaed] flex items-center justify-center mx-auto">
      <svg
        className="w-16 h-16 text-text-muted"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    </div>
  );
}

export function TeamCard({ name, position, bio, imageSrc }: TeamCardProps) {
  return (
    <Card className="p-6 text-center shadow-none">
      <div className="mb-4">
        {imageSrc ? (
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden">
            <Image
              src={imageSrc}
              alt={`${name} – ${position}`}
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
        ) : (
          <PersonPlaceholder />
        )}
      </div>
      <h3 className="text-lg font-bold text-text-dark">{name}</h3>
      <p className="text-secondary font-medium text-sm mt-1">{position}</p>
      {bio && <p className="text-text-muted text-sm mt-3">{bio}</p>}
    </Card>
  );
}
