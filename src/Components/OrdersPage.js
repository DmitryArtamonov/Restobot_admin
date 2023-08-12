import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import fetchApi from "../utils/fetch-api";

import { AddGroup } from "./AddGroup";

const columns = [
    {
        field: "number",
        headerName: "Number",
        type: "number",
        flex: 1,
        minWidth: 70,
        renderCell: (params) => (
            <Link to={"/order/" + params.row.id}>{params.row.number}</Link>
        ),

    },
    {
        field: "creation_time",
        headerName: "Created",
        flex: 2,
        minWidth: 120,
    },
    {
        field: "status",
        headerName: "Status",
        flex: 2,
        minWidth: 50,
    },
    {
        field: "client_name",
        headerName: "Client",
        flex: 3,
        minWidth: 100,
    },
    {
        field: "phone_number",
        headerName: "Phone",
        flex: 3,
        minWidth: 100,
    },
        {
        field: "delivery_address",
        headerName: "Address",
        flex: 3,
        minWdth: 70,
    },
    {
        field: "comments",
        headerName: "Comments",
        flex: 3,
        minWdth: 70,
    },
    {
        field: "value",
        headerName: "Value",
        type: "number",
        flex: 2,
        minWdth: 50,
    },
];

const OrdersPage = () => {

    const [orders, setOrders] = useState();

    useEffect(() => {
        async function fetchOrders() {
            const data = await fetchApi("orders/1");
            setOrders(data);
        }
        fetchOrders();
    }, []);

    return (
        <div style={{ height: 400, width: "100%" }}>
            <h3>Orders</h3>

            {orders ? (
                <DataGrid
                    rows={orders}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 20 },
                        },
                    }}
                    pageSizeOptions={[20, 50, 100]}
                    checkboxSelection
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}


export default OrdersPage