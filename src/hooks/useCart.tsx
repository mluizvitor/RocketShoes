import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { Product, Stock } from "../types";

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem("@RocketShoes:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }
    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      let newCart = [...cart];
      const stock: Stock = await api
        .get(`/stock/${productId}`)
        .then((res) => res.data);

      const productOnCart = newCart.find((product) => product.id === productId);

      if (productOnCart) {
        if (productOnCart.amount >= stock.amount) {
          toast.error("Quantidade solicitada fora de estoque");
          return;
        }
        newCart = newCart.filter((product) => product.id !== productId);

        productOnCart.amount += 1;

        newCart.push(productOnCart);
      } else {
        const product = await api
          .get(`/products/${productId}`)
          .then((res) => res.data);

        const newProduct = { ...product, amount: 1 };
        newCart.push(newProduct);
      }

      setCart(newCart);
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(newCart));
    } catch {
      toast.error("Erro na adição do produto");
    }
  };

  const removeProduct = (productId: number) => {
    try {
      let newCart = [...cart];
      const productOnCart = newCart.find((product) => product.id === productId);

      if (!productOnCart) {
        throw new Error();
      }

      newCart = newCart.filter((product) => product.id !== productId);

      setCart(newCart);
      toast.info("Produto removido do carrinho");
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(newCart));
    } catch {
      toast.error("Erro na remoção do produto");
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount <= 0) return;

      const itemStock = await api
        .get(`/stock/${productId}`)
        .then((res) => res.data);

      if (amount > itemStock.amount) {
        toast.error("Quantidade solicitada fora de estoque");
        return;
      }

      const newCart = [...cart];
      const updatedProduct = newCart
        .map((product) => product.id)
        .indexOf(productId);

      newCart[updatedProduct].amount = amount;
      setCart(newCart);
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(newCart));
    } catch {
      toast.error("Erro na alteração de quantidade do produto");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
