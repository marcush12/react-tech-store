import React, { Component } from 'react';
import {linkData} from './linkData';
import {socialData} from './socialData';
//import {items} from './productData';
import {client} from './contentful';

const ProductContext = React.createContext();
//cria componentes provider e consumer

class ProductProvider extends Component {

  state = {
    sidebarOpen: false,
    cartOpen: false,
    links: linkData,
    socialIcons: socialData,
    cart:[],
    cartItems: 0,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
    storeProducts: [],
    filteredProducts: [],
    featuredProducts: [],
    singleProduct: {},
    loading: true,
    search:'',
    price: 0,
    min: 0,
    max: 0,
    company: 'all',
    shipping: false
  };

  componentDidMount() {
    //this.setProducts(items);//use this for local

    //from contentful items
    client.getEntries({
      content_type: "techStoreProduct"
    })
      .then((response) => this.setProducts(response.items))
      .catch(console.error)
  }

  //set products
  setProducts = (products) => {
    let storeProducts = products.map(item => {
      const { id } = item.sys;
      const image = item.fields.image.fields.file.url;
      const product = { id, ...item.fields, image };
      return product;
    });
    //featured products
    let featuredProducts = storeProducts.filter( item => item.featured === true );
    // get max price
    let maxPrice = Math.max(...storeProducts.map(item => item.price))
    this.setState({
    storeProducts,
    filteredProducts: storeProducts,
    featuredProducts,
    cart:this.getStorageCart(),
    singleProduct:this.getStorageProduct(),
    loading: false,
    price:maxPrice,
    max:maxPrice,
    }, ()=> {
      this.addTotals();
    })
  };
  //get cart from local storage
  getStorageCart = ()=> {
    let cart;
    if(localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'))
    } else {
      cart = [];//nothing in LS
    }
    return cart;
  };
  //get product from localstorage
  getStorageProduct = ()=> {
    return localStorage.getItem('singleProduct')? JSON.parse(localStorage.getItem('singleProduct'))  : {};
  };
  //get totals
  getTotals = ()=> {
    let subTotal = 0;
    let cartItems = 0;
    this.state.cart.forEach(item => {
      subTotal += item.total
      cartItems += item.count
    })

    subTotal = parseFloat(subTotal.toFixed(2));//string to float number w 2 dec
    let tax = subTotal * 0.2;
    tax = parseFloat(tax.toFixed(2));
    let total = subTotal + tax;
    total = parseFloat(total.toFixed(2));
    return {
      cartItems, //no need to cartItems = cartItems in ES6
      subTotal,
      tax,
      total
    }

  };
  //add totals
  addTotals = ()=> {
    const totals = this.getTotals();
    this.setState({
      cartItems:totals.cartItems,
      cartSubTotal:totals.subTotal,
      cartTax:totals.tax,
      cartTotal: totals.total
    })
  };
  //sync storage
  syncStorage = ()=> {
    localStorage.setItem('cart', JSON.stringify(this.state.cart))
  }
  //add to cart
  addToCart = (id) => {
    let tempCart = [...this.state.cart];
    let tempProducts = [...this.state.storeProducts]; 
    let tempItem = tempCart.find(item => item.id === id);
    // verifica se o item c id está presente no carrinho
    //filter devolve array, find devolve um único item
    if(!tempItem) {
      tempItem = tempProducts.find(item => item.id === id);
      let total = tempItem.price;
      let cartItem = {...tempItem, count:1, total};
      tempCart = [...tempCart, cartItem]
    } else {
      tempItem.count++;
      tempItem.total = tempItem.price * tempItem.count;
      tempItem.total = parseFloat(tempItem.total.toFixed(2));
    }
    this.setState(() => {
      return {cart:tempCart}
    },()=>{//callback function//chama as funções abaixo
      this.addTotals();
      this.syncStorage();
      this.openCart();
    }) 
  }
  // set single product
  setSingleProduct = id => {
    let product = this.state.storeProducts.find(item => item.id === id);
    localStorage.setItem("singleProduct", JSON.stringify(product));
    this.setState({
      singleProduct: { ...product },
      loading: false
    });
  };

  handleSidebar = ()=>{
    this.setState({sidebarOpen:!this.state.sidebarOpen});
    // faz ao contrário do q está no state
  };

  handleCart = ()=>{
    this.setState({cartOpen:!this.state.cartOpen});
    // faz ao contrário do q está no state
  };

  //close cart
  closeCart = ()=>{
    this.setState({cartOpen:false});
  };

  //open
  openCart = ()=>{
    this.setState({cartOpen:true});
  };

  //cart functionality
  //increment
  increment = (id) => {
    let tempCart = [...this.state.cart];
    const cartItem = tempCart.find(item => item.id === id);
    cartItem.count++;
    cartItem.total = cartItem.count * cartItem.price;
    cartItem.total = parseFloat(cartItem.total.toFixed(2));
    this.setState(()=>{
      return {
        cart: [...tempCart]
      }
    }, ()=> {
      this.addTotals();
      this.syncStorage();
    })
  };
   //decrement
   decrement = (id) => {
    let tempCart = [...this.state.cart];
    const cartItem = tempCart.find(item => item.id === id);

    cartItem.count = cartItem.count - 1;
    if(cartItem.count === 0) {
      this.removeItem(id)
    } else {
      cartItem.total = cartItem.count * cartItem.price;
      cartItem.total = parseFloat(cartItem.total.toFixed(2));
      this.setState(()=>{
        return {
          cart: [...tempCart]
        }
      }, ()=> {
        this.addTotals();
        this.syncStorage();
      }
      );
    }
  };
   //removeItem
   removeItem = (id) => {
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.id !==id);
    this.setState({
      cart: [...tempCart]
    }, ()=> {
      this.addTotals();
      this.syncStorage();
    });
  }
  //esvaziar carrinho
  clearCart = ()=> {
    this.setState({
      cart: []
    }, ()=> {
      this.addTotals();
      this.syncStorage();
    });
  }

  //handle filtering
  handleChange = event => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState(
      {
        [name]: value
      },
      this.sortData
    );
  };

  sortData = () => {
    const { storeProducts, price, company, shipping, search } = this.state;

    let tempPrice = parseInt(price);

    let tempProducts = [...storeProducts];
    // filtering based on price
    tempProducts = tempProducts.filter(item => item.price <= tempPrice);
    // filtering based on company
    if (company !== "all") {
      tempProducts = tempProducts.filter(item => item.company === company);
    }
    if (shipping) {
      tempProducts = tempProducts.filter(item => item.freeShipping === true);
    }
    if (search.length > 0) {
      tempProducts = tempProducts.filter(item => {
        let tempSearch = search.toLowerCase();
        let tempTitle = item.title.toLowerCase().slice(0, search.length);
        if (tempSearch === tempTitle) {
          return item;
        }
      });
    }
    this.setState({
      filteredProducts: tempProducts
    });
  };

  /* whole app is gonna be a big child */
  render() {
    return (
      <ProductContext.Provider 
      value = {{
        ...this.state,
        handleSidebar:this.handleSidebar,
        handleCart:this.handleCart,
        closeCart:this.closeCart,
        openCart:this.openCart,
        addToCart:this.addToCart,
        setSingleProduct:this.setSingleProduct,
        increment: this.increment,
        decrement: this.decrement,
        removeItem: this.removeItem,
        clearCart: this.clearCart,
        handleChange: this.handleChange
      }}>
        {/* we can pass an object thru value; passou td q está dentro da classe */}
        {this.props.children} 
      </ProductContext.Provider>
      
    );
  }
}

const ProductConsumer =ProductContext.Consumer

export {ProductProvider, ProductConsumer};