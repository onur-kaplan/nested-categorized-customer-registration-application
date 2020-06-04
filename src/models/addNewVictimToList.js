import { victimTemplate } from "../views/victimTemplate";
export class AddNewVictimToList{
    addNew(victim, selectedCustomerId){
        const victimsListContainer = document.querySelector(`#${selectedCustomerId}`);
        let adressIndex = 0;
        let victimView = victimTemplate
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
        victimsListContainer.insertAdjacentHTML('afterbegin', victimView);
    }
}
