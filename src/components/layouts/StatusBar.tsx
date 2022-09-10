import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid"
import React from "react"
import { Toast, useStatusStore } from "../../stores"
import { Button, IconButton } from "../forms"
// import { Link, useLocation } from "react-router-dom"
// import logo from "../../assets/logo.svg"

// const Header: React.FC<{}> = () => {
//   const { pathname } = useLocation()

//   return (
//     <div className="h-[10%] sticky top-0">
//       <div className="backdrop-blur backdrop:bg-grey px-3 py-5 flex justify-between items-center">
//         <Link to="/">
//           <img
//             src={logo}
//             alt="Logo"
//             className="lg:w-40 w-32"
//           />
//         </Link>

//         <div className="flex lg:flex-row lg:gap-5">
//           <Link
//             to="/dashboard"
//             className={`${
//               pathname === "/dashboard" ? "border-primary" : "border-transparent "
//             } hover:border-primary border-b-4 rounded-sm p-2`}
//           >
//             Cards
//           </Link>
//           <Link
//             to="/dashboard/activate"
//             className={`${
//               pathname === "/dashboard/activate" ? "border-primary" : "border-transparent "
//             } hover:border-primary border-b-4 rounded-sm p-2`}
//           >
//             Activate Card
//           </Link>
//           <Link
//             to="/dashboard/payment"
//             className={`${
//               pathname === "/dashboard/payment" ? "border-primary" : "border-transparent "
//             } hover:border-primary border-b-4 rounded-sm p-2`}
//           >
//             Receive Payment
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

export const LoadingIndicator: React.FC<{ borderColor: string }> = ({ borderColor }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`inline-block w-5 h-5 border-2 ${borderColor} border-r-transparent animate-spin rounded-full`}
        role="status"
      />
    </div>
  )
}

export const StatusBar: React.FC<{}> = () => {
  const { isLoading, loadingProps, toastList, removeToast, confirmProps, closeConfirm } =
    useStatusStore()

  return (
    <>
      {isLoading === true ? (
        <div className="absolute z-50 h-[5%] top-3 left-3 right-3 flex justify-between">
          <div className="h-full w-fit p-3 flex items-center gap-2 text-primary-light">
            <LoadingIndicator borderColor={loadingProps.borderColor!} />
            <span>{loadingProps.message}</span>
          </div>
        </div>
      ) : (
        <span />
      )}

      {toastList.length > 0 && (
        <div
          className={`absolute z-50 flex flex-col gap-3 w-[95%] md:w-[40%] lg:w-[20%] top-0 right-0 ${
            toastList.length > 0 && "p-3 h-screen overflow-y-clip"
          }`}
        >
          {toastList.length > 0 &&
            toastList.map((toast: Toast) => (
              <div
                key={toast.id}
                className={`relative h-fit w-full flex items-start bg-${toast.color}-light text-${toast.color} p-3 gap-2 shadow-md`}
              >
                <IconButton
                  title="remove"
                  onClick={() => removeToast(toast)}
                  className="absolute right-0 top-0 m-1 bg-opacity-10 hover:bg-opacity-40 bg-grey-light"
                >
                  <XMarkIcon className="w-5" />
                </IconButton>
                {toast.color === "success" ? (
                  <CheckCircleIcon className="w-7 h-7 min-w-min" />
                ) : toast.color === "danger" ? (
                  <XCircleIcon className="w-7 h-7 min-w-min" />
                ) : (
                  <ExclamationCircleIcon className="w-7 h-7 min-w-min" />
                )}
                <span>{toast.message}</span>
              </div>
            ))}
        </div>
      )}

      {confirmProps !== undefined && (
        <div className="absolute z-40 h-full flex justify-center top-0 bottom-0 left-0 right-0 backdrop-blur-sm">
          <div className="mt-[70%] md:mt-[40%] lg:mt-[10%] w-[90%] md:w-[50%] lg:w-[25%] h-fit">
            <div
              className={`h-full bg-${confirmProps.color}-light text-${confirmProps.color} rounded-md p-4 shadow-lg flex flex-col justify-between gap-7`}
            >
              <p className="text-lg font-medium">{confirmProps.message}</p>
              <div className="flex gap-2 justify-end">
                <Button
                  onClick={async () => {
                    await confirmProps.onCancel!()
                    closeConfirm()
                  }}
                  title="cancel"
                  className={`bg-${confirmProps.color}-light text-${confirmProps.color} p-2`}
                >
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    await confirmProps.onConfirm!()
                  }}
                  title={confirmProps.action}
                  className={`bg-${confirmProps.color} text-${confirmProps.color}-light p-2`}
                >
                  {confirmProps.action}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}