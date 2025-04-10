'use client';

interface ErrorHandlerProps {
  errorMessage: string | null;
  children: React.ReactNode;
}

export default function ErrorHandler({ errorMessage, children }: ErrorHandlerProps) {
  return (
    <div>
      {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
      {children}
    </div>
  );
}