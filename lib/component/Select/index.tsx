import React, { useMemo } from "react"
type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  error?: string
}
export default function Select(props: Props) {
  const { error, ...rest } = props

  const displayError = useMemo(() => {
    if (!error) {
      return "border-gray-300"
    }

    return "border-red-500"
  }, [error])

  return (
    <div className="w-full flex flex-col gap-1">
      <select
        {...rest}
        className={`p-3 border ${displayError} w-full rounded-md hover:bg-red-50 outline-none`}
      >
        {props.children}
      </select>
      <p className=" text-xs text-red-500">{props.error}</p>
    </div>
  )
}
