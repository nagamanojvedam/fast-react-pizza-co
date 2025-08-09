import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPizzaCost, getTotalPizzaQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const quantity = useSelector(getTotalPizzaQuantity);
  const amount = useSelector(getTotalPizzaCost);

  if (!quantity) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-sm text-stone-200 uppercase sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>
          {quantity} pizza{quantity > 1 ? "s" : ""}
        </span>
        <span>{formatCurrency(amount)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
