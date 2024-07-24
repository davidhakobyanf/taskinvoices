import React, {useContext, useState} from 'react';
import {NameContext} from "../context/NameContext";
import Navbar from "./Navbar/Navbar";
import InvoicesTable from "./InvoicesTable/InvoicesTable";
import InvoiceLines from "./InvoiceLines/InvoiceLines";

const Profile = () => {
    const [selectedInvoiceIds, setSelectedInvoiceIds] = useState([]);
    const [totalAmountArray,setTotalAmountArray] = useState([])
    const NameFromLocalStorage = localStorage.getItem('Name');
    const UserIdFromLocalStorage = localStorage.getItem('UserId');
    console.log(NameFromLocalStorage, UserIdFromLocalStorage)

    return (
        <div>
            <Navbar name={NameFromLocalStorage}/>
            <InvoicesTable userIdFromLocalStorage={UserIdFromLocalStorage} setSelectedInvoiceIds={setSelectedInvoiceIds}
                           selectedInvoiceIds={selectedInvoiceIds}  totalAmountArray={totalAmountArray}/>
            <InvoiceLines selectedInvoiceIds={selectedInvoiceIds} setTotalAmountArray={setTotalAmountArray} />
        </div>
    );
};

export default Profile;