import { Link, useNavigate } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from './CartSlice';
import EmptyCart from './EmptyCart';

function Cart() {
  const username = useSelector((state) => state.user.userName);
  const cart = useSelector((store) => store.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleClearCart() {
    dispatch(clearCart());
    navigate('/menu');
  }

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-3 py-3">
      <LinkButton to={`/menu`}>&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-y">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>
      <div className="mt-6 space-x-7">
        <Button to="/order/new" type="primary">
          order pizzas
        </Button>

        <Button type="secondary" onClick={handleClearCart}>
          Clear Cart
        </Button>
        {/* <button >Clear cart</button> */}
      </div>
    </div>
  );
}

export default Cart;
