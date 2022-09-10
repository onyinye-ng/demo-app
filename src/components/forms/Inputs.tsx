import { useStatusStore } from "../../stores"

/**
 * An optimized input.
 *
 * @param props
 * @returns button
 */
export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const { isLoading } = useStatusStore()
  return (
    <input
      type={props.type ?? "text"}
      {...props}
      disabled={isLoading}
      className={`rounded-sm w-full py-2 px-3 placeholder:text-grey text-grey-dark focus:outline-none focus:shadow-none ${props.className}`}
    />
  )
}

/**
 * An optimized textarea input.
 *
 * @param props
 * @returns textarea
 */
export const TextareaInput: React.FC<React.InputHTMLAttributes<HTMLTextAreaElement>> = (props) => {
  const { isLoading } = useStatusStore()
  return (
    <textarea
      rows={2}
      {...props}
      disabled={isLoading}
      className={`rounded-sm w-full py-2 px-3 placeholder:text-grey text-grey-dark focus:outline-none focus:shadow-none ${props.className}`}
    />
  )
}

/**
 * An optimized checkbox input.
 *
 * @param props
 * @returns checkbox
 */
export const CheckboxInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const { isLoading } = useStatusStore()
  return (
    <input
      {...props}
      disabled={isLoading}
      type={props.type ?? "checkbox"}
      className={`p-2 border-primary-dark text-primary-dark checked:bg-primary checked:text-primary-light focus:outline-none focus:shadow-none hover:opacity-90 ${props.className}`}
    />
  )
}

/**
 * An optimized label.
 *
 * @param props
 * @returns label
 */
export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = (props) => {
  return (
    <label
      {...props}
      className={`${props.className}`}
    />
  )
}
