interface ChatWindowHeaderProps {
  contactName: string;
}

export const ChatWindowHeader = ({ contactName }: ChatWindowHeaderProps) => {
  return (
    <p className="px-4 py-3 font-semibold text-white shadow bg-primary">
      {`Chat with ${contactName}`}
    </p>
  );
};
