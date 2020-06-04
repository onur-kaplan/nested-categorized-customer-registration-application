export class ResetValues {
    resetValues(...args){
        args.forEach(item => {
            item.value = "";
        })
    }
}
