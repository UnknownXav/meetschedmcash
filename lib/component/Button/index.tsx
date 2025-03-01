import React, { useMemo } from "react"

export enum ButtonType {
  SOLID = "SOLID",
  OUTLINE = "OUTLINE",
  NEUTRAL = "NEUTRAL",
}

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType?: ButtonType | undefined
}

export default function Button(props: Props) {
  const { buttonType = ButtonType.SOLID } = props

  const displayButtonStyle = useMemo(() => {
    if (buttonType === ButtonType.SOLID) {
      return "p-2 px-4 bg-red-500 rounded-md h-[42px]  text-white hover:bg-red-100 hover:text-red-500"
    }

    if (buttonType === ButtonType.OUTLINE) {
      return "p-2 px-4 bg-white border-red-500 border h-[42px] text-red-500 rounded-md hover:bg-red-200 hover:border-none"
    }

    if (buttonType === ButtonType.NEUTRAL) {
      return "p-2 px-4 bg-red-100 rounded-md h-[42px]  text-red-500 hover:bg-red-100 hover:text-red-500"
    }
  }, [buttonType])

  return (
    <button
      {...props} // Spread props to allow all button attributes
      className={`${displayButtonStyle} ${props.className || ""}`}
    >
      {props.children}
    </button>
  )
}
