export function makePerson(name: string, age: number) {
    return {name: name, age: age}
}

export function testMakePerson() {
    console.log(
        makePerson('react', 23),
        makePerson('node', 54)
    );
}