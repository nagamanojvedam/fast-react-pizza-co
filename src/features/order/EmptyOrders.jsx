import LinkButton from "../../ui/LinkButton";

function EmptyOrders() {
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <p className="mt-7 font-semibold">
        You don&apos;t have any orders. Start ordering some pizzas :)
      </p>
    </div>
  );
}

export default EmptyOrders;
