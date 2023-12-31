import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import OrdersPage from "./OrdersPage";
import MenuPage from "./MenuPage";
import ExampleComponent from "./ExampleComponent";
import DishDetails from "./DishDetails";
import OrderDetails from "./OrderDetails";

const App = () => {
    return (
        <BrowserRouter sx={{m: 1}}>
            <NavBar />
            <Routes>
                <Route exact path="/" element={<OrdersPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/add-dish" element={<ExampleComponent />} />
                <Route path="/test" element={<ExampleComponent />} />
                <Route path="/dish/:dishId" element={<DishDetails />} />
                <Route path="/order/:orderId" element={<OrderDetails />} />

            </Routes>
        </BrowserRouter>
    );
};

export default App;
