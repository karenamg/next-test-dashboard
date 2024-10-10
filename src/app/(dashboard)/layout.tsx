import Header from "@/components/header";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row h-dvh ">
      <Header />
      <main className="absolute px-3 py-8 lg:px-14 lg:w-3/4 w-full lg:left-1/4 top-16 lg:top-0">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
