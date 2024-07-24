import React, { useEffect, useState } from 'react';
import { Table, Radio, Divider } from 'antd';
import axios from 'axios';

const InvoicesTable = ({ userIdFromLocalStorage, selectedInvoiceIds, setSelectedInvoiceIds }) => {
    const [data, setData] = useState([]);
    const [products, setProducts] = useState([]);
    const [invoiceLines, setInvoiceLines] = useState([]);
    const [totalAmountArray, setTotalAmountArray] = useState([]);
    const [selectionType, setSelectionType] = useState('checkbox');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [invoiceResponse, productResponse, invoiceLinesResponse] = await Promise.all([
                    axios.get('https://bever-aca-assignment.azurewebsites.net/invoices'),
                    axios.get('https://bever-aca-assignment.azurewebsites.net/products'),
                    axios.get('https://bever-aca-assignment.azurewebsites.net/invoicelines')
                ]);

                // Filter invoices by UserId
                const filteredInvoices = invoiceResponse.data.value.filter(
                    invoice => invoice.UserId === userIdFromLocalStorage
                );

                // Map data with keys for Ant Design Table
                const dataWithKeys = filteredInvoices.map((invoice, index) => ({
                    key: index,
                    InvoiceId: invoice.InvoiceId,
                    Name: invoice.Name,
                    PaidDate: new Date(invoice.PaidDate).toLocaleDateString(),
                    Amount: invoice.Amount,
                }));

                setData(dataWithKeys);
                setProducts(productResponse.data.value);
                setInvoiceLines(invoiceLinesResponse.data.value);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userIdFromLocalStorage]);

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

            setTotalAmountArray(totalsArray);
        }
    }, [invoiceLines, products]);

    const getTotalAmount = (invoiceId) => {
        const total = totalAmountArray.find(item => item.InvoiceId === invoiceId);
        return total ? total.AllTotalAmount : 'N/A';
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'Name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Paid Date',
            dataIndex: 'PaidDate',
        },
        {
            title: 'Total Amount',
            dataIndex: 'InvoiceId',
            render: (invoiceId) => getTotalAmount(invoiceId),
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys) => {
            setSelectedInvoiceIds(selectedRowKeys);
        },
        selectedRowKeys: selectedInvoiceIds,
    };

    return (
        <div>
            <Radio.Group
                onChange={({ target: { value } }) => setSelectionType(value)}
                value={selectionType}
            >
                <Radio value="checkbox">Checkbox</Radio>
                <Radio value="radio">Radio</Radio>
            </Radio.Group>

            <Divider />

            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                rowKey="InvoiceId"
                title={() => 'Invoices'}
            />
        </div>
    );
};

export default InvoicesTable;
