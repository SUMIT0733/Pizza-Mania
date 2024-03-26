import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalPizzas, getTotalPrice } from './CartSlice';

function CartOverview() {
  const total_pizzas = useSelector(getTotalPizzas);
  const total_price = useSelector(getTotalPrice);

  // const total_price = cart.reduce((total, item) => total + item.totalPrice, 0);
  return (
    <div className="flex items-center justify-between bg-stone-700 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      {!total_pizzas ? (
        <p className="m-auto">Start Adding Pizza From the Menu</p>
      ) : (
        <>
          <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
            <span>{total_pizzas} pizzas</span>
            <span>${total_price}</span>
          </p>
          <Link to="/cart">Open cart &rarr;</Link>
        </>
      )}
    </div>
  );
}

export default CartOverview;
