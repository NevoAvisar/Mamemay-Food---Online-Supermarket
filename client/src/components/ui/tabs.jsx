import * as React from "react";
import PropTypes from "prop-types";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

// Root Component for Tabs
const Tabs = TabsPrimitive.Root;

// List Component for Tabs
const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    dir="rtl"
    ref={ref}
    className={cn(
      "flex h-10 items-right justify-right rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

// Trigger Component for each Tab
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    dir="rtl"
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all hover:bg-gray-200", // Hover effect added here
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

// Content Component for each Tab
const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    dir="rtl"
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

// PropTypes validation
TabsList.propTypes =
  TabsTrigger.propTypes =
  TabsContent.propTypes =
    {
      className: PropTypes.string,
    };

export { Tabs, TabsList, TabsTrigger, TabsContent };
