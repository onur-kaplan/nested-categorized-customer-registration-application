import { DbManager} from "../models/dbManager";
import {AddNewVictimToList } from "../models/addNewVictimToList";
import { ResetValues } from "../models/resetValues";

export function eventsVictim(){
    const addNewVictimBtn = document.querySelector('[data-name="new-victim-btn"]');
    const addNewVictimName = document.querySelector('#victim-name');
    const addNewVictimLastName = document.querySelector('#victim-lastName');
    const addNewVictimAge = document.querySelector('#victim-age');
    const addNewVictimGender = document.querySelector('#victim-gender');
    const addNewVictimPhoto = document.querySelector('#victim-photo');
    const addNewVictimAdressBtn = document.querySelector('.btn-add-adress');

    const listContainer = document.querySelector("#customersListContainer");

    let selectedCustomerId;
    addNewVictimBtn.addEventListener('click',function(){
        const addNewVictimAdress = document.querySelectorAll('.victim-adress');
        let name = addNewVictimName.value;
        let lastName = addNewVictimLastName.value;
        let age = addNewVictimAge.value;
        let gender = addNewVictimGender.value;
        let photo = addNewVictimPhoto.value;
        let addresses = []
        addNewVictimAdress.forEach(item => {
            addresses.push(item.value);
        })
        const victim = {
            id: "v-" + new Date().getTime(),
            name: name,
            lastName: lastName,
            age: age,
            gender: gender,
            photo: photo,
            addresses: addresses,
            missionStatus: false
        }
        let db = new DbManager();
        let addVictim = new AddNewVictimToList();
        addVictim.addNew(victim, selectedCustomerId)
        db.addVictim(victim, selectedCustomerId);
        let reset = new ResetValues();
        reset.resetValues(addNewVictimName, addNewVictimLastName, addNewVictimAge, addNewVictimGender, addNewVictimPhoto, [addNewVictimAdress])
        addNewVictimAdress.forEach(item => {
            item.value="";
        })
    });

    addNewVictimAdressBtn.addEventListener("click", function(e){
        let victimAdressTemlate = `<input type="text" class="form-control victim-adress mb-2" placeholder="Adress...">`;
        e.target.parentElement.insertAdjacentHTML("beforeend", victimAdressTemlate)
        e.preventDefault();
    })

    listContainer.addEventListener("click", function(e){
        let targetElm = e.target;
        if(targetElm.classList.contains("add-victims-modal-btn")){
            selectedCustomerId = targetElm.parentElement.parentElement.getAttribute("id");
        }
        if(targetElm.classList.contains("victim-mission-complated-btn")){
            let selectedVictimId = targetElm.parentElement.getAttribute("id");
            let selectedCustomerId = targetElm.parentElement.parentElement.getAttribute("id");
            let victimBox = targetElm.parentElement;
            let db = new DbManager();
            if(db.cangeVictimStatus(selectedCustomerId, selectedVictimId)){
                victimBox.dataset.status = "true";
                return
            }
            victimBox.dataset.status="false";
        }

        if(targetElm.classList.contains("victim-remove-btn")){
            let selectedVictimId = targetElm.parentElement.getAttribute("id");
            let selectedCustomerId = targetElm.parentElement.parentElement.getAttribute("id");
            let db = new DbManager();
            targetElm.parentElement.remove();
            db.removeVictim(selectedCustomerId, selectedVictimId)
        }

    })

}
