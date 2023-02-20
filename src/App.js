import { useEffect } from "react";
import { initializeMeals } from "./reducers/mealReducer";
import { useDispatch } from "react-redux";
import MealList from "./components/Meal";
import Order from "./components/Order";
import Notifiaction from "./components/Notification";

import { Row, Col } from "react-bootstrap";

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeMeals())
  }, [dispatch])

  return (
    <div>
      <Row className="header">
        <h2>JUMBO's</h2>
        <Notifiaction />
      </Row>
      <Row>
        <Col className="mealSection" md={8}>
          <MealList />
        </Col>
        <Col className="orderSection" md={4}>
          <Order />
        </Col>
      </Row>
    </div>
  )
}

export default App;
