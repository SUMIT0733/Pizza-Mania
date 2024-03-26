import { Link } from 'react-router-dom';
import SearchOrder from '../features/orders/SearchOrder';
import Username from '../features/users/Username';

function Header() {
  return (
    <header className="border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6 flex items-center justify-between">
      <Link to="/" className="tracking-[5px]">
        Fast react Pizza
      </Link>
      <SearchOrder />

      <Username />
    </header>
  );
}

export default Header;
