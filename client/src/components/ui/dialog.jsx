import * as React from "react";
import PropTypes from "prop-types"; // Adding PropTypes
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils"; // Utility for class name merging

// Main Dialog Component
const Dialog = DialogPrimitive.Root;

// Trigger Button for Dialog
const DialogTrigger = DialogPrimitive.Trigger;

// Portal for Dialog content (teleporting content to the DOM root)
const DialogPortal = DialogPrimitive.Portal;

// Close Button for Dialog
const DialogClose = DialogPrimitive.Close;

// Dialog Overlay for background effect
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

DialogOverlay.propTypes = {
  className: PropTypes.string,
};

// Dialog Content container
const DialogContent = React.forwardRef(
  ({ className, children, descriptionId, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out sm:rounded-lg",
          className
        )}
        aria-describedby={descriptionId}
        {...props}
      >
        {children}
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
);
DialogContent.displayName = "DialogContent";

DialogContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  descriptionId: PropTypes.string,
};

// Dialog Header
const DialogHeader = ({ className, ...props }) => (
  <div
    id="dialog-description"
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);

DialogHeader.displayName = "DialogHeader";

DialogHeader.propTypes = {
  className: PropTypes.string,
};

// Dialog Footer
const DialogFooter = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

DialogFooter.propTypes = {
  className: PropTypes.string,
};

// Export Dialog Components
export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter,
};
