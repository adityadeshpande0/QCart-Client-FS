import React from "react";
import { Avatar, Button } from "@chakra-ui/react";

interface CustomAvatarProps {
  name: string;
  src: string;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({ name, src }) => {
  return (
    <Button>
      <Avatar.Root>
        <Avatar.Fallback name={name} />
        <Avatar.Image src={src} />
      </Avatar.Root>
    </Button>
  );
};

export default CustomAvatar;