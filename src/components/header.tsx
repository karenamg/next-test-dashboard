import Navigation from "@/components/navigation";

import { Loader2 } from "lucide-react";

function Header() {
  return (
    <header className="w-screen lg:w-1/4 bg-gradient-to-b from-blue-700 to-blue-500 p-4 lg:px-14 lg:py-8 lg:bg-none lg:bg-blue-500 fixed z-10">
      <div className="max-w-screen-2xl mx-auto lg:h-screen">
        <div className="flex lg:flex-col items-center lg:gap-x-16 lg:gap-y-10">
          <h1 className="font-bold text-4xl text-white hidden lg:block">
            24Siete
          </h1>
          <Navigation />
        </div>
      </div>
    </header>
  );
}

export default Header;
