function SmartContract(chainId: number, contractAddress: string) {
    return function(target: any): any {
        const oriConstructor = target;
        const newConstructor = function(...args: any[]) {
            const instance = new oriConstructor(...args);
            instance.inj_chainId = chainId;
            instance.inj_contractAddress = contractAddress;
            return instance;
        }

        newConstructor.prototype = oriConstructor.prototype;
        return newConstructor;
    }
}

function FunctionCall<T>(name: string, output: T) {
    return function (target: any): any {
        const o = function(...args: any[]) {
            const instance = new target(...args);
            instance.__metadata__ = {
                name: name,
                output: output,
            }
            return instance;
        }
        o.prototype = target.prototype;
        return o;
    }
}

function FunctionParameter(order: number, name: string, types: string | Function) {
    return function (target: any, propertyKey: string): any {
        target[`__metadata__function_parameter}`] = {
            name: name,
            types: types,
        };
    }
}


