import { User } from "@phosphor-icons/react/dist/ssr";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white font-bold">
            U
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">Umurava AI</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">Sophie</p>
            <p className="text-xs text-slate-500">Product Lead</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-slate-600">
            <User size={20} weight="bold" />
          </div>
        </div>
      </div>
    </header>
  );
}
