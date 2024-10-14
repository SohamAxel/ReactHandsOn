import { getAllMyListings } from "@/features/job-listing";

export const loader = () => {
  return { jobListingsPromise: getAllMyListings() };
};
