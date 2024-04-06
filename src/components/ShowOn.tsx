import React, { ReactNode } from "react";

interface Props {
  condition: boolean;
  children: ReactNode;
}

const ShowOn: React.FC<Props> = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};

export default ShowOn;
