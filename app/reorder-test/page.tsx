"use client";

import { Reorder } from "framer-motion";
import { useState } from "react";

export default function Page() {
  return (
    <>
      <p>Reorder test</p>
      <List />
    </>
  );
}

function List() {
  const [items, setItems] = useState([0, 1, 2, 3]);
  console.log(items);

  return (
    <Reorder.Group axis="y" values={items} onReorder={setItems}>
      {items.map((item) => (
        <Reorder.Item key={item} value={item}>
          {item}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

/* Notes
OK. I can reorder. But before I do that, it will be easier to pull of once my current code will be componentized.
*/
