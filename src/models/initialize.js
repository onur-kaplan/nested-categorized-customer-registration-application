import { DbManager } from "./dbManager";
import { AddNewCustomerToList } from "./addNewCustomerToList";

export class Initialize{
    init(){
        let db = new DbManager();
        let addToList = new AddNewCustomerToList()
        let people = db.getItem();
        people.forEach(person => {
            addToList.addNew(person)
        });
    }
}
