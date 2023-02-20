import { useSelector, useDispatch } from "react-redux";
import { changeQty, emptyOrder, newOrder } from "../reducers/orderReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Row, Col, Table } from "react-bootstrap";

const Order = () => {
    const dispatch = useDispatch()
    const order = useSelector(state => {
        return state.order
    })

    const handleDisplay = order.items.length !== 0 ? { display: 'flex' } : { display: 'none' }
    const handleHide = order.items.length !== 0 ? { display: 'none' } : { display: 'table-row' }

    const handleQtyChange = (action, meal) => {
        const itemExist = order.items.find(item => item.itemId === meal.itemId)
        action === 'plus' ? dispatch(changeQty({ ...itemExist, qty: itemExist.qty + 1 })) : dispatch(changeQty({ ...itemExist, qty: itemExist.qty - 1 }))

        let message = action === 'plus' ? { message: `'${meal.name}' added to your order`, timeout: 3000 } : { message: `'${meal.name}' removed from your order`, timeout: 3000 }
        dispatch(setNotification(message))
    }

    const cnacelOrder = () => {
        dispatch(emptyOrder())
        dispatch(setNotification({ message: 'Your order has been canceled', timeout: 3000 }))
    }

    const confirmOrder = () => {
        dispatch(newOrder(order))
    }

    return (
        <div className="orderSectionHeader">
            <h5>Your Order</h5>

            <Table className="orderTable" striped size="sm">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th className="centerAlign" colSpan={3}>Qty.</th>
                        <th className="rightAligh">Unit price</th>
                        <th className="rightAligh">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={handleHide}>
                        <td className="centerAlign" colSpan={7}>No items in the order!</td>
                    </tr>
                    {order.items.map(item => {
                        return (
                            <tr key={item.itemId}>
                                <td>{item.itemId}</td>
                                <td>{item.name}</td>
                                <td className="centerAlign"><button className="minusBtn" onClick={() => handleQtyChange('minus', item)}>-</button></td>
                                <td className="centerAlign">{item.qty}</td>
                                <td className="centerAlign"><button className="plusBtn" onClick={() => handleQtyChange('plus', item)}>+</button></td>
                                <td className="rightAlign">$ {item.unitPrice}</td>
                                <td className="rightAlign">$ {item.price}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Row style={handleDisplay}>
                <Col className="rightAlign totalAmount" md={10}>
                    Total Payable
                </Col>
                <Col className="rightAlign totalAmount" md={2}>
                    $ {order.totalPrice}
                </Col>
            </Row>
            <Row className="orderActionBtns" style={handleDisplay}>
                <Col className="centerAlign" md={6}>
                    <button className="cancelOrder" onClick={() => cnacelOrder()}>Cancel Order</button>
                </Col>
                <Col className="centerAlign" md={6}>
                    <button className="confirmOrder" onClick={() => confirmOrder()}>Confirm Order</button>
                </Col>
            </Row>
        </div>
    )
}

export default Order