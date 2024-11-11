import * as React from "react";
import PropTypes from "prop-types";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

// Sheet Root Component
const Sheet = SheetPrimitive.Root;

// Trigger Component for Sheet
const SheetTrigger = React.forwardRef((props, ref) => (
  <SheetPrimitive.Trigger ref={ref} {...props} />
));
SheetTrigger.displayName = "SheetTrigger";

SheetTrigger.propTypes = {
  children: PropTypes.node.isRequired,
};

// Close Button Component for Sheet
const SheetClose = React.forwardRef((props, ref) => (
  <SheetPrimitive.Close ref={ref} {...props} />
));
SheetClose.displayName = "SheetClose";

SheetClose.propTypes = {
  children: PropTypes.node,
};

// Portal Component for Sheet
const SheetPortal = ({ children, ...props }) => (
  <SheetPrimitive.Portal {...props}>{children}</SheetPrimitive.Portal>
);
SheetPortal.propTypes = {
  children: PropTypes.node.isRequired,
};

// Overlay for sheet
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

SheetOverlay.propTypes = {
  className: PropTypes.string,
};

// Variants for SheetContent positioning and animations
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

// Content for sheet
const SheetContent = React.forwardRef(
  ({ side = "right", className, children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}
        <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetClose>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
);
SheetContent.displayName = "SheetContent";

SheetContent.propTypes = {
  side: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

// Header for sheet
const SheetHeader = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

SheetHeader.propTypes = {
  className: PropTypes.string,
};

// Footer for sheet
const SheetFooter = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

SheetFooter.propTypes = {
  className: PropTypes.string,
};

// Title for sheet
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = "SheetTitle";

SheetTitle.propTypes = {
  className: PropTypes.string,
};

// Description for sheet
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = "SheetDescription";

SheetDescription.propTypes = {
  className: PropTypes.string,
};

// Export Components individually
export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
