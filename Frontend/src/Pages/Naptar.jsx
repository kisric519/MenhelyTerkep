import React, { useState } from 'react';
import { Container, Row, Col, Nav, Dropdown, Button } from 'react-bootstrap';
import { Calendar }from 'react-calendar';
import { Link } from "react-router-dom";

const Naptar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const cities = ['Budapest', 'Debrecen', 'Pécs'];
  const categories = ['Technology', 'Health', 'Business'];

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSearch = () => {
    console.log('Searching with:', { selectedDate, selectedCity, selectedCategory });
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3} className="border-right">
          <h3>Menü</h3>
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="calendar">Naptár</Nav.Link>
              <div className="p-3">
                 <Calendar  value={selectedDate || new Date()} />
              </div>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="cities">Városok</Nav.Link>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {selectedCity || 'Válassz várost'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {cities.map((city) => (
                    <Dropdown.Item key={city} onClick={() => setSelectedCity(city)}>
                      {city}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="categories">Kategóriák</Nav.Link>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {selectedCategory || 'Válassz kategóriát'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {categories.map((category) => (
                    <Dropdown.Item key={category} onClick={() => setSelectedCategory(category)}>
                      {category}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
            <Button onClick={handleSearch} className="mt-3">Keresés</Button>
          </Nav>
        </Col>

        <Col md={9}>
          <div className="p-3">
            <h4>Találatok:</h4>
            <div>
              <p>Választott dátum: {selectedDate ? selectedDate.toDateString() : 'Nincs választott dátum'}</p>
              <p>Választott város: {selectedCity || 'Nincs választott város'}</p>
              <p>Választott kategória: {selectedCategory || 'Nincs választott kategória'}</p>
            </div>
            {/* Itt jelenítheted meg a találatokat */}
          </div>
        </Col>
      </Row>
    </Container>
 
  )
}

 export default Naptar