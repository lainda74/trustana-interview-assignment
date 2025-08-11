import ErrorBoundary from "@/components/common/error-boundary";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Trustana Interview Assignment</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="description" content="Trustana Interview Assignment" />
        <meta name="keywords" content="Trustana, Interview, Assignment" />
      </head>
      <body>
        <ErrorBoundary fallback={<div className="text-red-500">An error occurred</div>}>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
