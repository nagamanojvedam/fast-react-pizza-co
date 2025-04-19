import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder() {
  const Fetcher = useFetcher();

  return (
    <Fetcher.Form method="PATCH" className="text-center">
      <Button type="primary">Make Priority</Button>
    </Fetcher.Form>
  );
}

export async function action({ request, params }) {
  const data = { priority: true };

  await updateOrder(params.orderId, data);
  return null;
}

export default UpdateOrder;
