import { describe, it, expect, afterEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useLocalStorage } from "./useLocalStorage"

describe("#useLocalStorage", () => {
  function renderLocalStorageHook(key, initialValue) {
    return renderHook(
      ({ key, initialValue }) => useLocalStorage(key, initialValue),
      {
        initialProps: { key, initialValue },
      }
    )
  }

  afterEach(() => {
    localStorage.clear()
  })

  it("Ensure the initial value passed to the useLocalStorage hook is stored in localStorage", () => {
    const key = "testkey"
    const initialValue = "testvalue"
    const { result } = renderLocalStorageHook(key, initialValue)

    expect(result.current[0]).toBe(initialValue)
    expect(localStorage.getItem(key)).toBe(JSON.stringify(initialValue))
  })

  it("Ensure the initial value as function passed to the useLocalStorage hook is stored in localStorage", () => {
    const key = "testkey"
    const initialValue = "testvalue"
    const { result } = renderLocalStorageHook(key, () => initialValue)

    expect(result.current[0]).toBe(initialValue)
    expect(localStorage.getItem(key)).toBe(JSON.stringify(initialValue))
  })

  it("Ensure localStorage is updated whenever setValue is called.", () => {
    const key = "testkey"
    const initialValue = "testvalue"
    const { result } = renderLocalStorageHook(key, initialValue)

    const newValue = "newvalue"
    // Wait for all state variables to change then proceed.
    act(() => result.current[1](newValue))

    expect(result.current[0]).toBe(newValue)
    expect(localStorage.getItem(key)).toBe(JSON.stringify(newValue))
  })

  it("Ensure localStorage is cleared whenever setValue is called with undefined.", () => {
    const key = "testkey"
    const initialValue = "testvalue"
    const { result } = renderLocalStorageHook(key, initialValue)

    // Wait for all state variables to change then proceed.
    act(() => result.current[1](undefined))

    expect(result.current[0]).toBeUndefined()
    expect(localStorage.getItem(key)).toBeNull()
  })

  it("Ensure useLocalStorage uses the value from localStorage if it exists instead of the initial value passed to useLocalStorage.", () => {
    const key = "testkey"
    const initialValue = "testvalue"
    const existingValue = "existingvalue"
    localStorage.setItem(key, JSON.stringify(existingValue))
    const { result } = renderLocalStorageHook(key, initialValue)

    expect(result.current[0]).toBe(existingValue)
    expect(localStorage.getItem(key)).toBe(JSON.stringify(existingValue))
  })
})