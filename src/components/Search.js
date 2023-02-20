import { useDispatch } from "react-redux";
import { changeSearch } from "../reducers/searchReducer";

import { Col, Form } from "react-bootstrap";

const Search = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        event.preventDefault()
        const content = event.target.value
        dispatch(changeSearch(content))
    }

    return (
        <Col className="searchCol" md={4}>
            <Form.Control type='text' placeholder="search here..." onChange={handleChange} />
        </Col>
    )
}

export default Search