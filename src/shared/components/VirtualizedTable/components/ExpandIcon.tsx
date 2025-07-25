import { SquareMinus, SquarePlus } from 'lucide-react';

interface ExpandIconProps {
  isExpanded: boolean;
  hasChildren: boolean;
}

export const ExpandIcon = ({ isExpanded, hasChildren }: ExpandIconProps) => {
  if (!hasChildren) {
    return <span className="size-4 inline-block" />;
  }

  return (
    <span className="size-4 inline-flex items-center justify-center">
      {isExpanded ? (
        <SquareMinus className="size-3 text-gray-600" />
      ) : (
        <SquarePlus className="size-3 text-gray-600" />
      )}
    </span>
  );
};
