"use client"

import { useMemo } from "react"

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string
}

export default function Input(props: Props) {
  const { error, ...rest } = props
  const displayStatus = useMemo(() => {
    if (!error) {
      return "border-gray-300"
    }
    return "border-red-500"
  }, [error])
  return (
    <div className=" w-full flex flex-col w-full ">
      <input
        {...rest}
        className={`p-3 border ${displayStatus} w-ull rounded-md hover:bg-red-50 outline-none`}
      />
      <p className=" text-xs text-red-500">{props.error}</p>
    </div>
  )
}
