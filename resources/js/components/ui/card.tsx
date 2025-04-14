import * as React from "react"

import { cn } from "@/lib/utils"

const Card = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-white p-10 rounded-xl shadow-md w-full max-w-[400px] border border-gray-100",
        className
      )}
      {...props}
    />
  );
};

export { Card }
