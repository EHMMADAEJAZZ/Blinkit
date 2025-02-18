const debounce =(cb,delay)=>{
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            cb.apply(context, args);
        }, delay);
    }
}
export default debounce