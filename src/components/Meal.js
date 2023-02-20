import { useSelector, useDispatch } from "react-redux";
import Search from "./Search";
import { addOrderItem, changeQty } from "../reducers/orderReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Row, Col } from "react-bootstrap";

const Meal = ({ meal }) => {
    const dispatch = useDispatch()

    const order = useSelector(state => state.order)

    const handleClick = (meal) => {
        const itemExist = order.items.find(item => item.itemId === meal.id)
        itemExist ? dispatch(changeQty({ ...itemExist, qty: itemExist.qty + 1 })) : dispatch(addOrderItem(meal))

        dispatch(setNotification({ message: `'${meal.name}' added to your order`, timeout: 3000 }))
    }

    return (
        <Col className="mealGridBox" md={3}>
            <div className="gridBoxWrapper" onClick={() => handleClick(meal)}>
                <img alt={meal.name} src={meal.image} />
                <p>{meal.name}<span> $ {meal.price}</span></p>
            </div>
        </Col>
    )
}

const MealList = () => {

    const meals = useSelector(({ meals, search }) => {
        if (search === '') {
            return [...meals]
        }
        else {
            let temp = []
            meals.forEach(meal => {
                let bool = meal.name.toLowerCase().includes(search);
                if (bool === true) {
                    temp.push(meal)
                }
            });
            return temp
        }
    })

    return (
        <>
            <Row className="mealHeaderBar">
                <Col className="headerCol" md={8}>
                    <h5>Meal Menu<span> (tap or click on the meal box to add to the order)</span></h5>
                </Col>
                <Search />
            </Row>

            <Row className="mealGrid">
                {meals.map(meal =>
                    <Meal key={meal.id} meal={meal} />
                )}
            </Row>
        </>
    )
}

export default MealList