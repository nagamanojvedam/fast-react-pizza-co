import { useLoaderData } from "react-router-dom";
import { getOrders } from "../../services/apiRestaurant";
import LinkButton from "../../ui/LinkButton";
import OrderCard from "./OrderCard";
import EmptyOrders from "./EmptyOrders";

function OrdersList() {
  const orders = useLoaderData();
  // const orders = [];

  if (!orders.length) return <EmptyOrders />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/">&larr; Back to home</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Recent orders</h2>
      <ul className="mt-3 divide-y divide-stone-200">
        {orders.map((order) => (
          <OrderCard order={order} key={order.id} />
        ))}
      </ul>
    </div>
  );
}

export async function loader() {
  const orders = await getOrders();
  return orders;
}

export default OrdersList;
