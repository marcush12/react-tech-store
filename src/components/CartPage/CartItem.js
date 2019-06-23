import React from "react";
import {
  FaTrash,FaChevronCircleUp, FaChevronCircleDown
} from 'react-icons/fa';

export default function CartItem({cartItem, increment,decrement,removeItem}) {

  const {id,title,price,count,total,image} = cartItem;
  
  
  return <div className="row mt-5 mt-log-0 text-capitalize text-center align-items-center">
    {/* image */}
    <div className="col-10 mx-auto col-lg-2 pb-2">
      <img src={image} width='60' className='img-fluid' alt="product"/>
    </div>
    {/* end of image */}
    {/* title */}
    <div className="col-10 mx-auto col-lg-2 pb-2">
      <span className="d-lg-none">produto : </span>
      {title}
    </div>
    {/* end of title */}
    {/* price */}
    <div className="col-10 mx-auto col-lg-2 pb-2">
      <span className="d-lg-none">preço : R$</span>
      {price}
    </div>
    {/* end of price */}
    {/* count controls */}
      <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
        <div className="d-flex justify-content-center">
          <FaChevronCircleDown onClick={() => decrement(id)} className="cart-icon text-primary" />
          <span className="text-title text-muted mx-3">{count}</span>
          <FaChevronCircleUp onClick={() => increment(id)} className="cart-icon text-primary" />
        </div>
      </div>
    {/* end count controls */}
    {/* removeItem */}
    <div className="col-10 mx-auto col-lg-2">
      <FaTrash className="text-danger cart-icon" onClick={() => removeItem(id)} />
    </div>
    {/* end of removeItem */}
    {/* item total */}
      <div className="col-10 mx-auto col-lg-2">
        <strong className="text-muted">total ítens : ${total}</strong>
      </div>
    {/* end item total */}
  </div>
}
