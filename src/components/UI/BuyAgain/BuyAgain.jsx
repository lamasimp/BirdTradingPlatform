import React, { useState } from "react";
import "../../../style/buyagain.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import numeral from "numeral";
import { data } from "jquery";
const BuyAgain = ({ orderList, setShowBuyAgain }) => {
  const navigate = useNavigate();
  const [orderSelect, setOrderSelect] = useState([]);
  const [orderdata, setorderdata] = useState(orderList);
  useEffect(() => {
    setOrderSelect(
      orderdata.items.map((product) => ({
        shopId: orderList.shopId,
        shopName: orderList.shopName,
        productId: product.productId,
        productName: product.productName,
        thumbnail: product.firstImagePath,
        quantity: product.quantity,
        soldPrice: product.soldPrice,
        totalPrice: product.soldPrice * product.quantity,
        cartId: 0,
      }))
    );
  }, [orderdata]);

  const UpdateItem = (data) => {
    const { quantity, productId, quantityPro } = data;
    const updatedOrderData = { ...orderdata };
    const updatedItems = updatedOrderData.items.map((item) => {
      if (item.productId === productId) {
        const newQuantity = item.quantity + quantity;

        if (newQuantity >= 1 && newQuantity <= quantityPro) {
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: item.soldPrice * newQuantity,
          };
        } else {
          return item;
        }
      }
      return item;
    });

    updatedOrderData.items = updatedItems;

    setorderdata(updatedOrderData);
  };

  const total = orderdata.items.reduce(
    (accumulator, item) => accumulator + item.soldPrice * item.quantity,
    0
  );

  const handleBuyNow = () => {
    navigate("/checkout", { state: { orderSelect } });
    setOrderSelect([]);
  };
  const handelCancel = () => {
    setShowBuyAgain(false);
  };
  console.log(orderSelect);
  console.log(orderList);

  return (
    <div className="confirmation-modal">
      <div
        className="log-add-feedback"
        style={{
          width: "1000px",
          padding: "10px",
          borderRadius: "2px",
          background: "#fff",
        }}
      >
        <div className="Cart-page-inFor">
          <div className="cart-shop-select"></div>
          <div className="cart-products-info">
            <div className="cart-inFor">Sản Phẩm</div>
          </div>
          <div className="cart-products-num">
            <div className="cart-inFor">Đơn Giá</div>
          </div>
          <div className="cart-products-quantitytii">
            <div className="cart-inFor">Số Lượng</div>
          </div>
          <div className="cart-products-num">
            <div className="cart-inFor">Số Tiền</div>
          </div>
        </div>
        {orderdata.items.map((item) => (
          <div
            key={item.productId}
            className="cart-product d-flex"
            style={{ padding: "20px" }}
          >
            <div className="cart-shop-select"></div>
            <div className="cart-products-info">
              <img
                src={item.firstImagePath}
                alt={item.productName}
                className="cart-product-img"
              />
              <div className="cart-product-name">{item.productName}</div>
              <div className="cart-product-description">
                {item.productDescription}
              </div>
            </div>
            <div className="cart-products-num">
              <div className="cart-product-price">
                {numeral(item.soldPrice).format("0,0")} đ
              </div>
            </div>

            <div
              className="cart-products-quantity"
              style={{ margin: "0px 20px 50px " }}
            >
              <button
                className="cart-clickQuantity"
                onClick={() =>
                  UpdateItem({
                    quantity: -1,
                    productId: item.productId,
                    quantityPro: item.quantityProduct,
                  })
                }
              >
                <i className="ri-subtract-line" />
              </button>
              <span type="text" className="cart-view-quantity">
                {item.quantity}{" "}
              </span>
              <button
                className="cart-clickQuantity"
                onClick={() =>
                  UpdateItem({
                    quantity: 1,
                    productId: item.productId,
                    quantityPro: item.quantityProduct,
                  })
                }
              >
                <i className="ri-add-line" />
              </button>
            </div>

            <div className="cart-products-num">
              <div className="cart-product-total">
                {numeral(item.soldPrice * item.quantity).format("0,0")} đ
              </div>
            </div>
          </div>
        ))}
        <div
          className="d-flex"
          style={{ marginLeft: "400px", marginTop: "50px" }}
        >
          <div
            className="cart-inFor"
            style={{
              color: "#088b0dc4",
              fontSize: "20px",
              marginRight: "60px",
            }}
          >
            Tổng Thanh Toán:
            <div className="don-vi" style={{ marginLeft: "5px" }}>
              ₫
            </div>
            {numeral(total).format("0,0")}
          </div>
          <Button
            variant="outlined"
            onClick={handelCancel}
            style={{ margin: "0px 10px" }}
          >
            Huỷ
          </Button>
          <Button
            variant="contained"
            onClick={handleBuyNow}
            style={{ margin: "0px 10px" }}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuyAgain;
