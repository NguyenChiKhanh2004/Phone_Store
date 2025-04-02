// checkOutStorage.js
const CHECKOUT_KEY = 'checkoutItems';

export const getCheckoutItems = () => {
    const stored = localStorage.getItem(CHECKOUT_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const setCheckoutItems = (items) => {
    localStorage.setItem(CHECKOUT_KEY, JSON.stringify(items));
};
