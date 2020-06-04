import { DbManager} from "../models/dbManager";
import { AddNewCustomerToList } from "../models/addNewCustomerToList";
import {ResetValues} from "../models/resetValues";

export function eventsCustomer(){
    const addNewCustomerBtn = document.querySelector('[data-name="new-customer-btn"]');
    const addNewCustomerName = document.querySelector('#customer-name');
    const addNewCustomerLastName = document.querySelector('#customer-lastName');
    const addNewCustomerPhone = document.querySelector('#customer-phone');
    const listContainer = document.querySelector("#customersListContainer");

    addNewCustomerBtn.addEventListener('click',function(){
        let name = addNewCustomerName.value;
        let lastName = addNewCustomerLastName.value;
        let phone = addNewCustomerPhone.value;
        const customer = {
            id: "c-" + new Date().getTime(),
            name: name,
            lastName: lastName,
            phone: phone,
            victims: []
        }
        let db = new DbManager();
        let addCustomer = new AddNewCustomerToList();
        addCustomer.addNew(customer);
        db.setItem(customer);
        let reset = new ResetValues();
        reset.resetValues(addNewCustomerName, addNewCustomerLastName, addNewCustomerPhone)
    });

    listContainer.addEventListener("click", function (e) {
        let targetElm = e.target;
        if(targetElm.classList.contains("customer-remove-btn")){
            let selectedCustomerId = targetElm.parentElement.getAttribute("data-customerid");
            let db = new DbManager();
            db.removeCustomer(selectedCustomerId)
            targetElm.parentElement.remove();
        }
    })


}
