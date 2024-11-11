import * as React from "react";
import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

// Textarea Component
const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

// Adding PropTypes validation
Textarea.propTypes = {
  className: PropTypes.string,
};

export { Textarea };
