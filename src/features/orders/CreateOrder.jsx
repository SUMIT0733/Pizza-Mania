import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import EmptyCart from '../cart/EmptyCart';
import { getTotalPrice } from '../cart/CartSlice';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import { fetchAddress } from '../users/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const checkbox_css =
  'h-4 w-4 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-1';

function CreateOrder() {
  const navigation = useNavigation();
  const [withPriority, setWithPriority] = useState(false);
  const isSubmitting = navigation.state === 'submitting';
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useSelector((state) => state.user);
  const isAddressLoading = addressStatus === 'loading';
  const dispatch = useDispatch();
  const formErrors = useActionData();
  const cart = useSelector((store) => store.cart.cart);
  const total_cart_price = useSelector(getTotalPrice);
  const priority_charge = withPriority ? total_cart_price * 0.2 : 0;
  const total_price = total_cart_price + priority_charge;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-bold">Ready to order? Lets go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-3 flex flex-col gap-1.5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            defaultValue={username}
            name="customer"
            required
            className="input grow"
          />
        </div>

        <div className="mb-3 flex flex-col gap-1.5 sm:flex-row sm:items-center">
          <label
            className={`sm:basis-40 ${formErrors?.phone ? 'text-red-600' : ''}`}
          >
            Phone number
          </label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-2 w-fit rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-3 flex flex-col gap-1.5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow ">
            <input
              type="text"
              name="address"
              required
              disabled={isAddressLoading}
              defaultValue={address}
              className="input  w-full"
            />
            {addressStatus === 'error' && (
              <p className="mt-2 w-fit rounded-md bg-red-100 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[5px] top-1 z-50">
              <Button
                disabled={isAddressLoading}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                get address
              </Button>
            </span>
          )}
        </div>

        <div className=" mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className={checkbox_css}
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting || isAddressLoading
              ? 'Placing Order'
              : `Place order of ${formatCurrency(total_price)}`}
          </Button>
        </div>
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
    priority: data.priority === 'true',
  };

  console.log(order)
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = 'Please enter valid Phone Number';
  }

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
  // return null;
}
export default CreateOrder;
