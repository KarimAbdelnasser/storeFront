type Order = {
  id: string;
  status?: string;
  user_id: string;
  products_ids?: [string];
  quantityOfEach?: [number];
};

export default Order;
