import React, { Component } from "react";

class CartGroup extends Component {
  render() {
    const { purchase } = this.props;

    // console.log(purchase);

    if (purchase.length === 0)
      return <p className="mt-3">Nothing is in the cart</p>;
    return (
      <ul className="list-group mt-3">
        {purchase.map((p, i) => (
          <li key={i} className={"list-group-item"}>
            {p.title}
            {p.quantity}
          </li>
        ))}
      </ul>
    );
  }
}

export default CartGroup;
