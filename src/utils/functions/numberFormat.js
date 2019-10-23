
class NumberFormat {
    constructor(value) {
        //this.value = value ? value : 0;
    }//constructor


    addSemicolon = (value) => {
        let n = value.toString()
        let number = "";
        for(let i=0; i<n.length; i++){
            if((n%3)=0){
                number +=',';
            }
        }
        return number;
    }
   
}


export { NumberFormat }