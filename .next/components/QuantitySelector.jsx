'use client';
import { useState } from 'react';

const QuantitySelector = ({ initialQuantity = 1, maxQuantity = 100 }) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    const increaseQuantity = () => {
        if (quantity < maxQuantity) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="quantity-selector">
            <button 
                onClick={increaseQuantity} 
                className="qty-btn plus"
                disabled={quantity >= maxQuantity}
            >
                <i className="fa-solid fa-plus"></i>
            </button>
            <input 
                type="number" 
                value={quantity} 
                readOnly 
                min="1" 
                max={maxQuantity} 
                className="qty-input"
            />
            <button 
                onClick={decreaseQuantity} 
                className="qty-btn minus"
                disabled={quantity <= 1}
            >
                <i className="fa-solid fa-minus"></i>
            </button>
        </div>
    );
};

export default QuantitySelector;