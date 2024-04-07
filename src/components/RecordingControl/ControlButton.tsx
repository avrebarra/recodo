import { Button } from "@chakra-ui/react";

interface Props {
  onClick: () => void;
  primary?: boolean;
  icon: React.ReactNode;
}

const PRIMARY_COLOR = "blue";

const ControlButton: React.FC<Props> = ({ onClick, primary, icon }) => {
  return (
    <Button borderRadius={100} colorScheme={primary ? PRIMARY_COLOR : undefined} height="48px" onClick={onClick}>
      {icon}
    </Button>
  );
};

export default ControlButton;
