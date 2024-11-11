import PropTypes from "prop-types"; // ייבוא של PropTypes לבדיקת טיפוסי נתונים
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

// הגדרת badgeVariants באמצעות cva עם סגנונות ובחירת משתנים
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default", // הגדרת ערך ברירת מחדל במקרה שלא נשלח פרופס variant
    },
  }
);

// קומפוננטת Badge להצגת תגיות עם סגנונות מגוונים
function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

// הוספת PropTypes כדי לוודא שהנתונים הנכונים נשלחים לקומפוננטה
Badge.propTypes = {
  className: PropTypes.string, // className יכול להיות מחרוזת
  variant: PropTypes.oneOf(["default", "secondary", "destructive", "outline"]), // וריאנטים נתמכים בלבד
};

// ייצוא הקומפוננטות והמשתנה
export { Badge, badgeVariants };
