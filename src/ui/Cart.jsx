import { useDispatch, useSelector } from "react-redux";
import CartItem from "../features/cart/CartItem";
import Button from "./Button";
import LinkButton from "./LinkButton";
import { clearCart, getCart } from "../features/cart/cartSlice";
import EmptyCart from "../features/cart/EmptyCart";

function Cart() {
  const { username } = useSelector((state) => state.user);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b border-b-stone-200">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="mt-6 space-x-6">
        <Button to="/order/new" type="primary">
          Order Pizzas
        </Button>
        <Button type="secondary" onClick={handleClearCart}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
