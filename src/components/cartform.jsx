import React, { Component } from "react";

class CartForm extends Component {
  state = {
    product: {
      _id: 123,
      title: "Damit",
      price: "88",
      available: [
        { size: "small", quantity: 2 },
        { size: "medium", quantity: 3 },
        { size: "large", quantity: 4 }
      ]
    },
    sizeToOrder: "",
    orders: "",
    purchase: []
  };

  handleChange = e => {};

  handleSubmit = e => {
    e.preventDefault();
  };

  setFirstLetter = word => {
    return word.substring(0, 1).toUpperCase();
  };

  mapOrder(product, size) {
    return {
      title: product.title,
      size: size
    };
  }

  render() {
    const { product } = this.state;
    console.log(product.available);
    return (
      <div>
        <h1>
          Cart
          {this.state.purchase.length}
        </h1>
        <h2>{product.title}</h2>
        <form onSubmit={this.handleSubmit}>
          {product.available.map(a => (
            <label htmlFor={a.size} key={a.size} className="btn btn-primary">
              <input
                type="radio"
                value={a.size}
                id={a.size}
                name={product.title}
              />
              {this.setFirstLetter(a.size)}
            </label>
          ))}
          <br />
          <button className="btn btn-primary">Add Product</button>
        </form>
      </div>
    );
  }
}

export default CartForm;
