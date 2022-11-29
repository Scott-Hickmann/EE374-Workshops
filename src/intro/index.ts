import { Property, PropertyInterface } from "./property"
import { canonicalize } from 'json-canonicalize' 

let StanfordProperty = new Property("Stanford", "Santa Clara County", 100)

StanfordProperty.adjustValueByPercent(10)
StanfordProperty.adjustValueByPercent(-10)

const StanfordPropertyObject = StanfordProperty.objectForm()

// Object dereferencing
console.log("Name:")
console.log(StanfordPropertyObject.name)

function valueDoubler(prop: PropertyInterface): PropertyInterface {
    if (prop.value !== undefined) {
        // Also object dereferencing but in two different ways
        return {name: prop.name, location: prop['location'], value: 2*prop.value}
    }else {
        return {name: prop.name, location: prop['location']}
    }
}

// Can also explicitly extract desired parameters from object 
function valueHalver({name, location, value}: {name: string, location: string, value?: number}) {
    if (value !== undefined) {
        return {name: name, location: location, value: value/2}
    }else {
        return {name: name, location: location}
    }
}
console.log("\nValue-doubled object:")
console.log(valueDoubler(StanfordPropertyObject))

console.log("Value-halved object:")
console.log(valueHalver(StanfordPropertyObject))

console.log("\nOriginal property object:")
console.log(JSON.stringify(StanfordPropertyObject))
console.log("Canonicalized property object (always returns string!):")
console.log(canonicalize(StanfordPropertyObject))

