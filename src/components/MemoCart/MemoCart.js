import React, { useState, useEffect } from 'react'
import "./MemoCart.css"

export default function MemoCart(props) {
    const initialValue = props.quantity
    const [qtyState, setQtyState] = useState(initialValue)


    return (
        <div>
            {console.log(props.cart)}
            <table className="cart-table">
                <tr>
                    <th>Food</th>
                    <th>Calorie</th>
                    <th>Carb</th>
                    <th>Protein</th>
                    <th>Fat</th>
                    <th>Quantity</th>
                </tr>

                {
                    props.cart.map(e =>
                        <tr>
                            <th>{e.FoodName}</th>
                            <th>{e.Calorie}</th>
                            <th>{e.Carb}</th>
                            <th>{e.Protein}</th>
                            <th>{e.Fat}</th>
                            <th>{e.quantity}</th>
                            <td><button onClick={() => props.removeFromCart(e.FoodName)}>Remove</button></td>
                            <td>
                                <input
                                    style={{ width: "38px" }}
                                    type="number"
                                    value={e.quantity}
                                    onChange={(event) => props.updateQty(e.FoodName, parseInt(event.target.value))}
                                />
                            </td>
                        </tr>

                    )
                }
                <tr>
                    <td><strong>Total</strong></td>
                    <td>
                        {Math.round(props.totalCalorie)}
                    </td>
                    <td>
                        {Math.round(props.totalCarb)}
                    </td>
                    <td>
                        {Math.round(props.totalProtein)}
                    </td>
                    <td>
                        {Math.round(props.totalFat)}
                    </td>
                </tr>
            </table>
        </div>
    )
}
