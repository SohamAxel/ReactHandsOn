import { cn } from "@/utils/shadcnUtils";

const JobListingGrid = ({ className, ...props }) => {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col sm:grid gap-4 grid-cols-[repeat(auto-fill,minmax(400px,1fr))]",
        className
      )}
    ></div>
  );
};

export { JobListingGrid };
