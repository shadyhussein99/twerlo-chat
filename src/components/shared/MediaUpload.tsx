import { useRef } from "react";
import { AppButton } from "../ui";

interface IMediaUploadProps {
  handleSendFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
}

export const MediaUpload = ({ handleSendFile, accept }: IMediaUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <AppButton
        title="+"
        onClick={() => fileInputRef.current?.click()}
        className="!w-8 !h-8 !px-0 !py-0 !pb-0.5 mb-4 !bg-gray-500 !rounded-full hover:!bg-gray-400"
      />
      {/* Accept images only for simplicity */}
      <input
        type="file"
        accept={accept}
        ref={fileInputRef}
        onChange={handleSendFile}
        style={{ display: "none" }}
        className="hidden"
      />
    </>
  );
};
