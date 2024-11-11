import * as React from "react";
import PropTypes from "prop-types"; // ייבוא PropTypes לבדיקה
import { cn } from "@/lib/utils"; // פונקציה לשילוב מחלקות CSS

// קומפוננטת Card בסיסית להצגת כרטיס
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm", // סגנון בסיסי עבור הכרטיס
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

// PropTypes עבור Card
Card.propTypes = {
  className: PropTypes.string, // className צריך להיות מחרוזת אם נשלח
};

// קומפוננטת כותרת של כרטיס (Card Header)
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)} // סגנון בסיסי לכותרת של כרטיס
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

CardHeader.propTypes = {
  className: PropTypes.string,
};

// קומפוננטת הכותרת של הכרטיס (Card Title)
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    dir="rtl"
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )} // סגנון עבור הכותרת
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

CardTitle.propTypes = {
  className: PropTypes.string,
};

// קומפוננטת תיאור של הכרטיס (Card Description)
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)} // סגנון עבור התיאור של הכרטיס
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

CardDescription.propTypes = {
  className: PropTypes.string,
};

// קומפוננטת תוכן של כרטיס (Card Content)
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

CardContent.propTypes = {
  className: PropTypes.string,
};

// קומפוננטת תחתית של כרטיס (Card Footer)
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)} // סגנון עבור תחתית הכרטיס
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

CardFooter.propTypes = {
  className: PropTypes.string,
};

// ייצוא של כל הקומפוננטות של הכרטיס
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
