import * as React from "react";
import PropTypes from "prop-types"; // ייבוא PropTypes לבדיקה
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"; // ייבוא פונקציה לשילוב מחלקות

// הגדרת buttonVariants באמצעות cva עם סגנונות ובחירת משתנים
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// קומפוננטת Button להצגת כפתור עם סגנונות מגוונים
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // החלטה אם להשתמש ב-Slot או ב-button על פי הערך של asChild
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        dir="rtl"
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)} // שילוב של סגנונות מותאמים אישית
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

// הוספת PropTypes כדי לוודא שהנתונים הנכונים נשלחים לקומפוננטה
Button.propTypes = {
  className: PropTypes.string, // className צריך להיות מחרוזת אם נשלח
  variant: PropTypes.oneOf([
    "default",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link",
  ]), // וריאנטים נתמכים
  size: PropTypes.oneOf(["default", "sm", "lg", "icon"]), // סוגי גדלים נתמכים
  asChild: PropTypes.bool, // קובע אם יש להשתמש ב-Slot במקום button (שימוש מותאם)
};

// ייצוא הקומפוננטות והמשתנה
export { Button, buttonVariants };
