export interface Error {
  message: string;
  status?: number;
}

export interface IErrorProps {
  error: Error;
  reset: () => void;
}
