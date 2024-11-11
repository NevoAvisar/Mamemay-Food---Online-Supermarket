import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

// Component for displaying skeleton loading state
function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

// PropTypes validation to enforce correct props
Skeleton.propTypes = {
  className: PropTypes.string,
};

export { Skeleton };
