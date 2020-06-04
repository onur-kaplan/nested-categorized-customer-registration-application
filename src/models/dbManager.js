export class DbManager {
    constructor() {
        this.dbName = "hit-man";
    }

    getItem(){
        let people;
        if(localStorage.getItem(this.dbName)===null){
            people=[];
            return people;
        }
        people = JSON.parse(localStorage.getItem(this.dbName));
        return people;
    }

    setItem(person){
        let people = this.getItem();
        people.push(person);
        this.updateItem(people);
    }

    updateItem(data){
        localStorage.setItem(this.dbName, JSON.stringify(data));
    }

    addVictim(victim, selectedCustomerId){
        let people = this.getItem()
        let cIndex = people.findIndex(item => item.id === selectedCustomerId);
        people[cIndex].victims.push(victim)
        this.updateItem(people);
    }

    cangeVictimStatus(selectedCustomerId, selectedVictimId){
        let people = this.getItem()
        let cIndex = people.findIndex(item => item.id === selectedCustomerId);
        let vIndex = people[cIndex].victims.findIndex(item => item.id === selectedVictimId);
        people[cIndex].victims[vIndex].missionStatus = !people[cIndex].victims[vIndex].missionStatus;
        this.updateItem(people);
        return people[cIndex].victims[vIndex].missionStatus;
    }

    removeCustomer(selectedCustomerId){
        let people = this.getItem()
        let cIndex = people.findIndex(item => item.id === selectedCustomerId);
        people.splice(people[cIndex],1);
        this.updateItem(people);
    }

    removeVictim(selectedCustomerId, selectedVictimId){
        let people = this.getItem()
        let cIndex = people.findIndex(item => item.id === selectedCustomerId);
        let vIndex = people[cIndex].victims.findIndex(item => item.id === selectedVictimId);
        people[cIndex].victims.splice([vIndex], 1);
        this.updateItem(people);
    }

}
