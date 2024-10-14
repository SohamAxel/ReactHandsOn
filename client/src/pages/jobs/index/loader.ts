import { getAllPublishedListings } from "@/features/job-listing";

export const loader = () => {
  return { jobListingsPromise: getAllPublishedListings() };
};
