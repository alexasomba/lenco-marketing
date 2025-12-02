import { cn } from "@/lib/utils";

interface AuthorCardProps {
  name: string;
  avatar?: string;
  position?: string;
  className?: string;
}

export function AuthorCard({ name, avatar, position, className }: AuthorCardProps) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className="rounded-full w-10 h-10 border border-border object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="flex-1">
        <h3 className="text-sm font-semibold tracking-tight">{name}</h3>
        {position && (
          <p className="text-xs text-muted-foreground">{position}</p>
        )}
      </div>
    </div>
  );
}
