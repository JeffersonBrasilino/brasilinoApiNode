
export default class DataValidator{

    required(value){
        let retorno;
        if (value == undefined || value == {} || value == [] || value == '' || value == null) {
            retorno = 'is Required';
        }
        return retorno;
    }

    minLength(value, length){
        let retorno;
        if(value.length < length){
            retorno = 'min length is '+length;
        }
        return retorno;
    }

    maxLength(value, length){
        let retorno;
        if(value.length > length){
            retorno = 'max length is '+length;
        }
        return retorno;
    }

    validateGroupData(rules,data){
        let retorno = {valid:true,errors:{}};
        for(let fields in rules){
            for(let rule in rules[fields]){
                if(rules[fields][rule] != false){

                    let status;
                    if(typeof rules[fields][rule] == "boolean")
                        status = this[rule](data[fields]);
                    else
                        status = this[rule](data[fields], rules[fields][rule]);

                    if(status != undefined){
                        retorno.valid = false;
                        retorno.errors[fields] = status;
                    }

                }
            }
        }
        return retorno;
    }
}
