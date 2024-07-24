import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const InvoiceLines = ({ selectedInvoiceIds,  setTotalAmountArray }) => {
    const [invoiceLines, setInvoiceLines] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchInvoiceLines = async () => {
            try {
                const response = await axios.get('https://bever-aca-assignment.azurewebsites.net/invoicelines');
                const invoiceLinesData = response.data.value;

                // Filter invoice lines by selectedInvoiceIds
                const filteredInvoiceLines = invoiceLinesData.filter(
                    (line) => selectedInvoiceIds.includes(line.InvoiceId)
                );

                setInvoiceLines(filteredInvoiceLines);
            } catch (error) {
                console.error('Error fetching invoice lines:', error);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://bever-aca-assignment.azurewebsites.net/products');
                setProducts(response.data.value);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchInvoiceLines();
        fetchProducts();
    }, [selectedInvoiceIds]);

    useEffect(() => {
        if (invoiceLines.length && products.length) {
            const totals = invoiceLines.reduce((acc, line) => {
                const productDetails = products.find((prod) => prod.ProductId === line.ProductId) || { Price: 0 };
                const totalAmount = line.Quantity * productDetails.Price;

                if (!acc[line.InvoiceId]) {
                    acc[line.InvoiceId] = 0;
                }
                acc[line.InvoiceId] += totalAmount;

                return acc;
            }, {});

            const totalsArray = Object.keys(totals).map((invoiceId) => ({
                InvoiceId: invoiceId,
                AllTotalAmount: totals[invoiceId],
            }));
            setTotalAmountArray(totalsArray)
        }
    }, [invoiceLines, products]);

    // Map product ID to product details
    const getProductDetails = (productId) => {
        const product = products.find((prod) => prod.ProductId === productId);
        return product ? product : { Name: 'Unknown', Price: 0 };
    };

    // Define columns for the table
    const columns = [
        {
            title: 'Product',
            key: 'ProductName',
            render: (text, record) => getProductDetails(record.ProductId).Name,
        },
        {
            title: 'Price Per Unit',
            key: 'ProductPrice',
            render: (text, record) => getProductDetails(record.ProductId).Price,
        },
        {
            title: 'Quantity',
            dataIndex: 'Quantity',
            key: 'Quantity',
        },
        {
            title: 'Total Amount',
            key: 'TotalAmount',
            render: (text, record) => record.Quantity * getProductDetails(record.ProductId).Price,
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={invoiceLines}
            rowKey="InvoiceLineId"
            title={() => 'Invoice Lines'}
        />
    );
};

export default InvoiceLines;
