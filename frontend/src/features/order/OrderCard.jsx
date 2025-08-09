import { Link } from "react-router-dom";
import { formatCurrency, formatDate } from "../../utils/helpers";

function OrderCard({ order }) {
  const cart = order.cart.map((item) => `${item.name}(${item.quantity})`);

  const statusColor =
    order.status === "delivered"
      ? "green"
      : order.status === "pending"
        ? "yellow"
        : "red";

  return (
    <li className="mb-2 gap-2 space-y-1 border border-stone-200 px-2 py-3">
      <div className="flex items-center justify-between">
        <p className="text-l space-x-2 font-bold">
          <span> {order.customer}</span>
          <Link
            to={`/order/${order.id}`}
            className="text-sm font-semibold text-stone-500"
          >
            #{order.id}
          </Link>
        </p>
        <p className="space-x-2">
          {order.priority && (
            <span className="rounded-full bg-stone-500 px-2 py-1 text-xs font-semibold text-stone-50 uppercase">
              Priority
            </span>
          )}
          <span
            className={`rounded-full bg-${statusColor}-500 px-2 py-1 text-xs font-semibold text-${statusColor}-50 uppercase`}
          >
            {order.status}
          </span>
        </p>
      </div>
      <p className="border-b border-dashed border-stone-200 text-stone-500">
        {formatCurrency(order.orderPrice)}
      </p>
      <div className="flex flex-col justify-between">
        <p className="text-md mb-1 text-stone-500 italic">{cart.join(", ")}</p>
        <p className="text-xs">
          {formatDate(order.estimatedDelivery, "long").replace(" at", ",")}
        </p>
      </div>
    </li>
  );
}

export default OrderCard;
