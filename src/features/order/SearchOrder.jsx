import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (evnt) => {
    evnt.preventDefault();

    if (!orderId) return;

    navigate(`/order/${orderId}`);
    setOrderId("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search order #"
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:ring focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none sm:w-64 sm:focus:w-72"
        value={orderId}
        onChange={(evnt) => setOrderId(evnt.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
