import { sum } from "lodash";

export const calculateCartTotals = (cart: any) => {
  const subtotal = sum(
    cart.map((item: any) =>
      item.variant.reduce(
        (acc: any, v: any) => acc + v.sell_price * v.quantity,
        0
      )
    )
  );
  const shippingFees = 0;
  const discount = 0;
  const total = subtotal + shippingFees - discount;

  return { subtotal, shippingFees, discount, total };
};
