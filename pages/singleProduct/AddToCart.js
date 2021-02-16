import { useEffect, useState } from 'react';

export default function AddToCart(props) {
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);

  function changeQuantityByClickHandler(event) {
    if (event.target.innerHTML === '+') {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity > 0 ? quantity - 1 : 0);
    }
  }

  function changeQuantityByInputHandler(event) {
    setQuantity(Number(event.target.value));
  }

  useEffect(() => {
    setTotal(quantity * props.pricePerUnit);
  }, [quantity, props.pricePerUnit]);

  return (
    <>
      <div>
        <button onClick={changeQuantityByClickHandler}>-</button>
        <input
          type="text"
          value={quantity}
          onChange={changeQuantityByInputHandler}
        />
        <button onClick={changeQuantityByClickHandler}>+</button>
      </div>
      <div>Total: {total.toFixed(2)}</div>
      <div>
        <button
          onClick={(e) => {
            setQuantity(0);
          }}
        >
          Add to cart
        </button>
      </div>
    </>
  );
}
