import React from "react";

function formatMoney(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

function ProductCard({ name, price, image, description, tag }) {
  return (
    <article className="product-card">
      <div className="product-card__media">
        <img src={image} alt={name} />
        {tag ? <span className="product-card__tag">{tag}</span> : null}
      </div>
      <h3>{name}</h3>
      <p className="product-card__description">{description}</p>
      <div className="product-card__footer">
        <strong>{formatMoney(price)}</strong>
        <button type="button">Thêm vào giỏ</button>
      </div>
    </article>
  );
}

export default ProductCard;