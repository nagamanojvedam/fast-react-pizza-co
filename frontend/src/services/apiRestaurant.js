const MY_SERVER_URL = "http://localhost:5000/api/v1";
// const API_URL = "https://react-fast-pizza-api.jonas.io/api";

export async function getMenu() {
  const response = await fetch(`${MY_SERVER_URL}/menu`);

  if (!response.ok) throw new Error("Failed getting menu");

  const { data } = await response.json();

  return data;
}

export async function getOrders() {
  // const response = await fetch(`${API_URL}/orders`);
  const response = await fetch(`${MY_SERVER_URL}/orders`);
  if (!response.ok) throw Error("Failed to get yours orders");

  const { data } = await response.json();

  return data;
}

export async function createOrder(newOrder) {
  const response = await fetch(`${MY_SERVER_URL}/orders`, {
    method: "POST",
    body: JSON.stringify(newOrder),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Failed creating your order");

  const { data } = await response.json();
  return data;
}

export async function updateOrder(id, updateData) {
  const response = await fetch(`${MY_SERVER_URL}/orders/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updateData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Failed updating your order");
}

export async function getOrder(id) {
  const response = await fetch(`${MY_SERVER_URL}/orders/${id}`);

  if (!response.ok) throw new Error("Cannot get this order");

  const { data } = await response.json();
  return data;
}
