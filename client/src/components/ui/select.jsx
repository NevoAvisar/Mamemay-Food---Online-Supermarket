import * as React from "react";
import PropTypes from "prop-types";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

// רכיב Select ראשי
const Select = SelectPrimitive.Root;

// רכיב קבוצת אופציות עבור Select
const SelectGroup = SelectPrimitive.Group;

// רכיב שמחזיק את הערך שנבחר
const SelectValue = SelectPrimitive.Value;

// טריגר לבחירת האופציה
const SelectTrigger = React.forwardRef(
  ({ className, children, dir = "ltr", ...props }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        `flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 ${
          dir === "rtl" ? "rtl" : ""
        }`,
        className
      )}
      dir={dir}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

SelectTrigger.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  dir: PropTypes.oneOf(["ltr", "rtl"]),
};

// כפתור גלילה למעלה ב-Select
const SelectScrollUpButton = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUp className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
  )
);
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

SelectScrollUpButton.propTypes = {
  className: PropTypes.string,
};

// כפתור גלילה למטה ב-Select
const SelectScrollDownButton = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollDownButton
      ref={ref}
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
  )
);
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

SelectScrollDownButton.propTypes = {
  className: PropTypes.string,
};

// תוכן ה-Select
const SelectContent = React.forwardRef(
  (
    { className, children, position = "popper", dir = "ltr", ...props },
    ref
  ) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          `relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ${
            dir === "rtl" ? "rtl" : ""
          }`,
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        dir={dir}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

SelectContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  position: PropTypes.oneOf(["popper", "item"]),
  dir: PropTypes.oneOf(["ltr", "rtl"]),
};

// תווית ב-Select
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pr-8 pl-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

SelectLabel.propTypes = {
  className: PropTypes.string,
};

// פריט בתוך Select
const SelectItem = React.forwardRef(
  ({ className, children, dir = "ltr", ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        `relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 ${
          dir === "rtl" ? "pr-8 pl-2" : "pl-8 pr-2"
        } text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
        className
      )}
      dir={dir}
      {...props}
    >
      <span
        className={`absolute ${
          dir === "rtl" ? "right-2" : "left-2"
        } flex h-3.5 w-3.5 items-center justify-center`}
      >
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
);
SelectItem.displayName = SelectPrimitive.Item.displayName;

SelectItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  dir: PropTypes.oneOf(["ltr", "rtl"]),
};

// מפריד בתוך Select
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

SelectSeparator.propTypes = {
  className: PropTypes.string,
};

// ייצוא כל הרכיבים עם `SelectValue`
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
