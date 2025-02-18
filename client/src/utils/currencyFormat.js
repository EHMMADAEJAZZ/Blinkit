const formatCurrency =(cur,amount)=>{
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: cur,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2  // Limit to two decimal places
     }).format(amount);
}
export default formatCurrency;