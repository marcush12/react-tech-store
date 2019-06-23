import React from "react";

export default function CartColumns() {
  return (
  <div className="container-fluid text-center d-none d-lg-block my-5">
    <div className="row">
      {/* single column */}
      <div className="col-lg-2">
        <p className="text-uppercase">produtos</p>
      </div>
      {/* end of single column */}
      {/* single column */}
      <div className="col-lg-2">
        <p className="text-uppercase">nome do produto</p>
      </div>
      {/* end of single column */}
      {/* single column */}
      <div className="col-lg-2">
        <p className="text-uppercase">preço</p>
      </div>
      {/* end of single column */}
      {/* single column */}
      <div className="col-lg-2">
        <p className="text-uppercase">quantidade</p>
      </div>
      {/* end of single column */}
      {/* single column */}
      <div className="col-lg-2">
        <p className="text-uppercase">remover</p>
      </div>
      {/* end of single column */}
      {/* single column */}
      <div className="col-lg-2">
        <p className="text-uppercase">total</p>
      </div>
      {/* end of single column */}
    </div>
  </div>
  )
}
