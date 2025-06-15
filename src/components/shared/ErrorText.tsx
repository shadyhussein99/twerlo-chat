interface IErrorTextProps {
  error: string;
}

export const ErrorText = ({ error }: IErrorTextProps) => {
  return <p className="mt-1 text-xs text-danger">{error}</p>;
};
