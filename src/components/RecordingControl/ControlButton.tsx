import { Button } from "@chakra-ui/react";

interface Props {
  onClick: () => void;
  disabled?: boolean;
  primary?: boolean;
  icon: React.ReactNode;
}

const PRIMARY_COLOR = "teal";

const ControlButton: React.FC<Props> = ({ onClick, disabled, primary, icon }) => {
  return (
    <Button
      isDisabled={disabled}
      borderRadius={100}
      colorScheme={primary ? PRIMARY_COLOR : undefined}
      variant={primary ? undefined : "outline"}
      height="48px"
      onClick={onClick}
    >
      {icon}
    </Button>
  );
};

export default ControlButton;
