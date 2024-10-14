import { PageHeader } from "@/components/ui/PageHeader"
import { JobListingForm, editJobListing } from "@/features/job-listing"
import { Await } from "@/lib/reactRouter"
import { useLoaderData, useNavigate } from "react-router-dom"
import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"

export function EditJobListingPage() {
  const navigate = useNavigate()
  const { id, jobListingPromise } = useLoaderData()
  return (
    <>
      <PageHeader>Edit Listing</PageHeader>
      <Suspense fallback={<LoadingSpinner className="w-24 h-24" />}>
        <Await resolve={jobListingPromise}>
          {jobListing => (
            <JobListingForm
              initialJobListing={jobListing}
              onSubmit={async values => {
                await editJobListing(id, values)
                navigate("/jobs/my-listings")
              }}
            />
          )}
        </Await>
      </Suspense>
    </>
  )
}
