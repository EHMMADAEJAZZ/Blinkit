const discountedPrice = (price,discount)=>{
    const discountedPrice =Math.ceil((Number(price) * Number(discount))/100);
    return Number(price) - Number(discountedPrice);
}
export default discountedPrice;