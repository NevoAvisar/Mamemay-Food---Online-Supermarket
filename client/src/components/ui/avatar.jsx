import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import PropTypes from "prop-types"; // הוספת PropTypes כדי לוודא סוגי נתונים נכונים
import { cn } from "@/lib/utils"; // ייבוא של פונקציית עזר לשילוב מחלקות

// קומפוננטה ראשית עבור Avatar
const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", // סגנון בסיסי לאווטאר
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

Avatar.propTypes = {
  className: PropTypes.string, // וידוא שהקלאסנאם הוא מחרוזת
};

// קומפוננטת התמונה של Avatar
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)} // סגנון עבור תמונת האווטאר
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

AvatarImage.propTypes = {
  className: PropTypes.string, // וידוא שהקלאסנאם הוא מחרוזת
};

// קומפוננטת גיבוי למקרה שאין תמונה זמינה
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted", // סגנון עבור גיבוי לאווטאר
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

AvatarFallback.propTypes = {
  className: PropTypes.string, // וידוא שהקלאסנאם הוא מחרוזת
};

export { Avatar, AvatarImage, AvatarFallback };
