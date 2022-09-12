import { Link } from "react-router-dom"
import { Card as CardType } from "../../stores"
import logo from "../../assets/logo3.svg"

export const Card: React.FC<{ card: CardType }> = ({ card }) => {
  return (
    <Link
      key={card.id}
      to={`/dashbaord/${card.id}`}
      className="py-1 px-1 h-44 min-w-max w-full md:w-1/2"
    >
      <div className="bg-primary hover:bg-primary-dark w-full h-full rounded-lg relative shadow-sm flex justify-center items-center">
        <span className="absolute top-0 right-0 m-2 font-medium text-grey-light">
          &#8358;{card.amount}
        </span>
        <img
          src={logo}
          alt="Logo"
          className="lg:w-40 w-32"
        />
      </div>
    </Link>
  )
}
