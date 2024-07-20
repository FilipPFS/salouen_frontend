import { FaBars, FaShieldAlt, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useCartSelector } from "../../store/hooks";
import { useState } from "react";

const Header = () => {
  const connected = false;
  const admin = true;

  const [open, setOpen] = useState(false);

  const handleMobileNavigation = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  console.log(open);

  const cart = useCartSelector((state) => state.cart.items);

  const cartSum = cart.reduce((total, product) => total + product.quantity, 0);

  return (
    <header className={styles.header}>
      <Link to={"/"}>
        <h1>Salouen</h1>
      </Link>
      <nav className={styles.navigation}>
        <Link to={"/products"}>Produits</Link>
        {connected ? (
          <Link to={"account"} className={styles.account}>
            Mon Compte
          </Link>
        ) : (
          <Link to={"sign-up"} className={styles.account}>
            Connexion
          </Link>
        )}
        <div className={styles.cartBlock}>
          <Link to={"/cart"}>
            <FaShoppingCart className={styles.cartIcon} />
          </Link>
          <span>{cartSum}</span>
          {admin && (
            <Link to={"/dashboard"}>
              <FaShieldAlt className={styles.shieldIcon} />
            </Link>
          )}
        </div>
      </nav>
      <div className={styles.mobClick}>
        <FaBars className={styles.mobIcon} onClick={handleMobileNavigation} />
        {open && (
          <nav className={styles.mobNavigation}>
            <Link to={"/products"}>Produits</Link>
            {connected ? (
              <Link to={"account"}>Mon Compte</Link>
            ) : (
              <Link to={"sign-up"}>Connexion</Link>
            )}
            <div className={styles.cartBlock}>
              <div className={styles.cartItem}>
                <Link to={"/cart"}>
                  <FaShoppingCart className={styles.cartIcon} />
                </Link>
                <span>{cartSum}</span>
              </div>
              {admin && (
                <Link to={"/dashboard"}>
                  <FaShieldAlt className={styles.shieldIcon} />
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
