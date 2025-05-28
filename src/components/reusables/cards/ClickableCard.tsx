import React from "react";
import { Link } from "react-router-dom";
import { Card, Heading } from "@chakra-ui/react";

type ClickableCardProps = {
  to: string;
  title: string;
  body: string;
  size?: "sm" | "md" | "lg";
  variant?: "elevated" | "outline" | "subtle";
};

const ClickableCard: React.FC<ClickableCardProps> = ({
  to,
  title,
  body,
  size = "sm",
  variant = "elevated",
}) => {
  return (
    <Link to={to} className="block">
      <Card.Root
        variant={variant}
        size={size}
        className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02] rounded-2xl border border-gray-200"
      >
        <Card.Header className="bg-indigo-50 px-5 py-3 rounded-t-2xl">
          <Heading size="md" className="text-indigo-700 font-semibold">
            {title}
          </Heading>
        </Card.Header>
        <Card.Body className="text-gray-600 px-5 py-4">
          {body}
        </Card.Body>
      </Card.Root>
    </Link>
  );
};

export default ClickableCard;
