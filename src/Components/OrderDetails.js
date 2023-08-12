import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Container, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function OrderDetails() {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        const response = await axios.get(`${apiBaseUrl}/order/get/${orderId}`);
        setOrder(response.data);
        setStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    }

    fetchOrderDetails();
  }, [orderId]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUpdateStatus = async () => {
    try {
      await axios.put(`${apiBaseUrl}/order/update/${orderId}`, { status });
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 3 }}>
        <h3>Order Details</h3>
        <div>
          <strong>Number:</strong> {order.number}
        </div>
        <div>
          <strong>Created:</strong> {order.creation_time}
        </div>
        <div>
          <strong>Client:</strong> {order.client_name}
        </div>
        <div>
          <strong>Delivery Address:</strong> {order.delivery_address}
        </div>
        <div>
          <strong>Phone Number:</strong> {order.phone_number}
        </div>
        <div>
          <strong>Comments:</strong> {order.comments}
        </div>
        <div>
          <FormControl variant="standard" fullWidth>
            <Select value={status} onChange={handleStatusChange}>
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="in_delivery">In Delivery</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Box mt={2}>
          <Button sx={{m:1}} variant="contained" onClick={handleUpdateStatus}>
            Save
          </Button>
        </Box>
        <div>
          <h4>Order Items:</h4>
          {order.items.map((item) => (
            <div key={item.id}>
                {item.amount} x <strong>{item.dish_name}</strong> = {item.price}
            </div>
          ))}
          <div>
            <br></br>
            <strong>Total price:</strong> {order.value}
          </div>
        </div>
      </Box>
    </Container>
  );
}

export default OrderDetails;
