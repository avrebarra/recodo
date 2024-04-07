import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="appwrapper flex justify-center items-center h-screen w-screen ">
      <div className="app w-full max-w-3xl h-full xs:max-h-144">
        <div className="content px-10">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
