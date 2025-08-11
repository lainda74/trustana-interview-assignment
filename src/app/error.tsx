"use client";

import { AlertCircle } from "lucide-react";

export default function Error({
  error,
}: {
  error: Error;
}) {

  return (
    <div className="flex items-start gap-2 rounded-md bg-red-100 p-3 text-red-700 border border-red-300">
      {/* Icon */}
      <AlertCircle className="h-5 w-5 flex-shrink-0" />

      {/* Message */}
      <p className="flex-1 text-sm">
        An error occurred: {error.message}
      </p>
    </div>
  );
}
