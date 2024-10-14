import { useForm } from "react-hook-form"

export function useJobListingFilterForm() {
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      experienceLevel: "",
      location: "",
      minimumSalary: 0,
      onlyShowFavorites: false,
      showHidden: false,
      type: "",
    },
  })

  const values = form.watch()

  function getFilteredJobs(
    jobListings,
    hiddenIds,
    favoriteIds
  ) {
    return jobListings.filter(jobListing => {
      if (!jobListing.title.toLowerCase().match(values.title.toLowerCase())) {
        return false
      }

      if (
        !jobListing.location.toLowerCase().match(values.location.toLowerCase())
      ) {
        return false
      }

      if (
        !isNaN(values.minimumSalary) &&
        jobListing.salary < values.minimumSalary
      ) {
        return false
      }

      if (values.type !== "" && jobListing.type !== values.type) {
        return false
      }

      if (
        values.experienceLevel !== "" &&
        jobListing.experienceLevel !== values.experienceLevel
      ) {
        return false
      }

      if (!values.showHidden && hiddenIds.includes(jobListing.id)) {
        return false
      }

      if (values.onlyShowFavorites && !favoriteIds.includes(jobListing.id)) {
        return false
      }

      return true
    })
  }

  return { form, getFilteredJobs }
}
