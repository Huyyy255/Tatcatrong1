
"use client"
// @ts-expect-error - no types
import { useMemo } from 'react'
import autoAnimate, { type AutoAnimateOptions } from '@formkit/auto-animate'

/**
 * A hook that applies auto-animate to a parent element.
 *
 * @param options - An optional object of options.
 * @returns A ref to apply to the parent element.
 */
export function useAutoAnimate<T extends HTMLElement>(
  options?: AutoAnimateOptions | ((el: T) => AutoAnimateOptions)
): [React.RefCallback<T>] {
  const parent = useMemo(
    () =>
      Object.assign(
        (el: T | null) => {
          if (el) {
            autoAnimate(el, options || {})
          }
        },
        {
          current: null as T | null,
        }
      ),
    [options]
  )
  return [parent]
}
