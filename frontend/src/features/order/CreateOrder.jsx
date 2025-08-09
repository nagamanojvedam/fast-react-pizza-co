import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { clearCart, getCart, getTotalPizzaCost } from "../cart/cartSlice";

import store from "../../../store";
import { createOrder } from "../../services/apiRestaurant";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../users/userSlice";
import EmptyCart from "../cart/EmptyCart";

const isValidPhone = (str) => {
  return /^\d{10}$/.test(str);
};

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);

  const navigation = useNavigation();
  const formErrors = useActionData();

  const cart = useSelector(getCart);
  const isSubmitting = navigation.state === "submitting";
  const totalCartPrice = useSelector(getTotalPizzaCost);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const billAmount = totalCartPrice + priorityPrice;
  const isLoadingAddress = addressStatus === "loading";
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="mt-4">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First name</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="tw-input grow"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              type="tel"
              name="phone"
              required
              className="tw-input w-full"
            />

            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              disabled={isLoadingAddress}
              className="tw-input w-full"
              defaultValue={address}
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          <span className="absolute top-[3px] right-[3px] md:top-[5px] md:right-[5px]">
            {!position.latitude && !position.longitude && (
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={(evnt) => {
                  evnt.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Address
              </Button>
            )}
          </span>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
            value={withPriority}
            onChange={(evnt) => setWithPriority(evnt.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
        </div>

        <Button disabled={isSubmitting} type="primary">
          {isSubmitting || isLoadingAddress
            ? "Placing order..."
            : `Order now for ${formatCurrency(billAmount)}`}
        </Button>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number, we might need it to contact you";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
