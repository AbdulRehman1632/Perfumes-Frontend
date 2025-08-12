import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Select,
  MenuItem,
  Chip,
  Box,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";
import { GetReq, PutReq } from "../../../api/axios";

const statusColors = {
  Pending: "warning",
  Processing: "info",
  Shipped: "secondary",
  Delivered: "success",
  Cancelled: "error",
};

const months = [
  { value: "All", label: "All Months" },
  { value: 0, label: "January" },
  { value: 1, label: "February" },
  { value: 2, label: "March" },
  { value: 3, label: "April" },
  { value: 4, label: "May" },
  { value: 5, label: "June" },
  { value: 6, label: "July" },
  { value: 7, label: "August" },
  { value: 8, label: "September" },
  { value: 9, label: "October" },
  { value: 10, label: "November" },
  { value: 11, label: "December" },
];

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  console.log(orders)
  const [selectedMonth, setSelectedMonth] = useState("All");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await GetReq("/Orders/all");
      setOrders(res.data.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await PutReq(`/Orders/status/${orderId}`, { status: newStatus });
      fetchOrders();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const filteredOrders =
  
    selectedMonth === "All"
      ? orders
      : orders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate.getMonth() === selectedMonth;
        });

  const columns = [
    { field: "id", headerName: "Order ID", width: 230 },
    { field: "name", headerName: "Customer", width: 130 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "phone", headerName: "Phone", width: 130 },
    { field: "productName", headerName: "Product Name", width: 160 },
    { field: "shippingAddress", headerName: "Address", width: 160 },
    {
      field: "totalAmount",
      headerName: "Total",
      width: 100,
      renderCell: (params) => `Rs. ${params.value}`,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => (
        <Select
          value={params.row.status}
          onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
          size="small"
        >
          {Object.keys(statusColors).map((status) => (
            <MenuItem key={status} value={status}>
              <Chip label={status} color={statusColors[status]} size="small" />
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 150,
      valueGetter: (params) =>
        new Date(params).toLocaleDateString("en-GB"),
    },
  ];

  const rows = filteredOrders.map((order) => ({
   
    id: order.products?.map((p) => p.productId?._id).join(", "),
    name: order.name,
    email: order.email,
    phone: order.phone,
    productName: order.products?.map((p) => p.productName).join(", "),
    shippingAddress: order.shippingAddress,
    totalAmount: order.totalAmount,
    status: order.status,
    createdAt: order.createdAt,
  }));



  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Orders
      </Typography>

      <FormControl sx={{ mb: 2, width: 200 }}>
        <InputLabel>Select Month</InputLabel>
        <Select value={selectedMonth} onChange={handleMonthChange} label="Select Month">
          {months.map((month) => (
            <MenuItem key={month.value} value={month.value}>
              {month.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        pageSize={6}
        rowsPerPageOptions={[6, 10, 20]}
      />
    </Box>
  );
};

export default ManageOrder;
