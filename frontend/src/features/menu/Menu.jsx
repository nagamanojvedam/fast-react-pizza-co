// import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  // const [menu, setMenu] = useState([]);

  // useEffect(() => {
  //   const menuItems = async () => {
  //     try {
  //       const data = await getMenu();
  //       setMenu(data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   menuItems();
  // }, []);

  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
