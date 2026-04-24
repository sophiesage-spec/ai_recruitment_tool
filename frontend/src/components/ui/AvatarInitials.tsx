import { cn } from "~/lib/utils";

interface AvatarInitialsProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AvatarInitials({ name, size = "md", className }: AvatarInitialsProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Deterministic color based on name
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-indigo-500",
    "bg-rose-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-cyan-500",
  ];
  const charCodeSum = name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const colorClass = colors[charCodeSum % colors.length];

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-xl",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full text-white font-bold shrink-0",
        colorClass,
        sizeClasses[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
