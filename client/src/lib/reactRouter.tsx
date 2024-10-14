import {
  LoaderFunctionArgs,
  defer,
  useLoaderData,
  Await as AwaitReactRouter,
} from "react-router-dom"

export function deferredLoader<T extends Record<string, unknown>>(
  dataFunc: (args: LoaderFunctionArgs) => T
) {
  return (args: LoaderFunctionArgs) => {
    return defer(dataFunc(args)) as Omit<ReturnType<typeof defer>, "data"> & {
      data: T
    }
  }
}

export function useDeferredLoaderData<
  T extends ReturnType<typeof deferredLoader>
>() {
  return useLoaderData() as ReturnType<T>["data"]
}

export function Await(props) {
  return <AwaitReactRouter {...props} />
}
