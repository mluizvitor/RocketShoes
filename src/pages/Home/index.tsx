import React, { useState, useEffect } from "react";
import {
  MdAddShoppingCart,
  MdOutlineWarningAmber,
  MdRefresh,
} from "react-icons/md";

import { EmptyHome, ProductList, Button } from "./styles";
import { api } from "../../services/api";
import { formatPrice } from "../../util/format";
import { useCart } from "../../hooks/useCart";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    sumAmount[product.id] = product.amount;

    return sumAmount;
  }, {} as CartItemsAmount);

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get("/products");
      const newProducts = data.map((product: ProductFormatted) =>
        Object.assign(product, {
          priceFormatted: formatPrice(product.price),
        })
      );

      setProducts(newProducts);
    }

    loadProducts();
  }, []);

  async function handleAddProduct(id: number) {
    await addProduct(id);
  }

  return (
    <>
      {products.length === 0 ? (
        <EmptyHome>
          <MdOutlineWarningAmber size={48} color={"#ea6280"} />
          <h2>Não foi possível carregar produtos</h2>
          <Button type="button" onClick={() => document.location.reload()}>
            <div>
              <MdRefresh size={16} color={"#fff"}></MdRefresh>
            </div>
            <span>ATUALIZAR PÁGINA</span>
          </Button>
        </EmptyHome>
      ) : (
        <ProductList>
          {products.map((product) => (
            <li key={product.id}>
              <img src={product.image} alt={product.title} />
              <strong>{product.title}</strong>
              <span>{product.priceFormatted}</span>
              <Button
                type="button"
                data-testid="add-product-button"
                onClick={() => handleAddProduct(product.id)}
              >
                <div data-testid="cart-product-quantity">
                  <MdAddShoppingCart size={16} color="#FFF" />
                  {cartItemsAmount[product.id] || 0}
                </div>

                <span>ADICIONAR AO CARRINHO</span>
              </Button>
            </li>
          ))}
        </ProductList>
      )}
    </>
  );
};

export default Home;
