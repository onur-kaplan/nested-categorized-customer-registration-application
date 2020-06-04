import {victimTemplate} from "../views/victimTemplate";

export class AddNewCustomerToList{
    addNew(customer){
        const customersListContainer = document.querySelector("#customersListContainer");
        let adressIndex = 0;
        let customerTemplate = `
    <div class="card" data-customerid="${customer.id}">
        <button class="btn btn-outline-danger btn-sm ml-auto text-right customer-remove-btn" type="button">
               <i class="fas fa-trash-alt"></i>
        </button>
        <div id="customer-${customer.id}" class="card-header d-flex align-items-center"  data-toggle="collapse" data-target="#${customer.id}">
            <i class="fas fa-chevron-down"></i> 
            <div class="col mr-5"><i class="fas fa-user-secret"></i> <span data-name="customer-name">${customer.name}</span> <span data-name="customer-surname">${customer.lastName}</span></div>
            <div class="col mr-5">${customer.phone}</div>
        </div>
        <div id="${customer.id}" class="collapse" data-parent="#customersListContainer" >
         ${customer.victims.reduce((carry, victim) => {
            return carry + victimTemplate
                .replace(/__STATUS__/, victim.missionStatus)
                .replace(/__ID__/, victim.id)
                .replace(/__PHOTO__/, victim.photo)
                .replace(/__NAME__/, victim.name)
                .replace(/__LASTNAME__/, victim.lastName)
                .replace(/__GENDER__/, victim.gender)
                .replace(/__AGE__/, victim.age)
                .replace(/__ADDRESSES__/, victim.addresses.map(item => {
                    adressIndex++
                    return `<div>Adres ${adressIndex}: ${item}</div>`
                }).join(""));
        }, '')}
         
            <div class="d-flex mt-2 px-3 pb-2">
                <button type="button" class="btn btn-danger ml-auto btn-sm add-victims-modal-btn" data-toggle="modal" data-target="#victimRegisterForm">Add Victim <i class="fas fa-user-plus"></i></button>
            </div>
        </div>
    </div>
`;
        customersListContainer.innerHTML += customerTemplate;
    }
}
