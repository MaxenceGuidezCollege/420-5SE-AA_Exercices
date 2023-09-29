
const users = [
    {
        id: 10,
        name: 'Joe'
    },
    {
        id: 11,
        name: 'John'
    },
    {
        id: 12,
        name: 'Jack'
    },
];

// const ids = [];
// for(let user of users){
//     ids.push(user.id);
// }

const ids = users.map(user=>{
    return user.id;
})

const idx = {
};

for(let user of users){
    idx[user.name] = users;
}

//in permet d'itérer à travers les propriétés d'un objet
for(let name in idx){
    console.log(name)
}

// idx est un objet et est donc non itérable
// for(let name of idx){
//     console.log(name)
// }

//fait itérer les indexes du tableau 0,1,2,...,n
for(let elem in users){
    console.log(elem)
}

const ints = [0,1,2,3,4,5,6,7];
ints.push(8, 9);

let othersInts = [11,12,13];

// ints.push(others[0], others[1], others[2]);
ints.push(...othersInts);

// const a = ints[0];
// const b = ints[1];
// const c = ints[2];
// const others = ints.slice(3);

const [a ,b ,c ,...others] = ints;

const user1 = {
    id: 123,
    name: 'Joe',
    city: 'Alma'
};

// const user2 = {
//     id: user1.id,
//     name: user1.name,
//     city: user1.city,
//     age: 54
// };

const user2 = {
    ...user1,
    city: 'Paris',
    age: 54
};

// On peut exploiter le principe de déconstruction pour appliquer des valeurs par défaut
function maFonction(options = {}){
    let optionsEffectives = {
        optionA: 'valeur1',
        optionB: 'valeur2',
        optionC: 'valeur3',
        ...options
    };

    //On utilise les options effectives
    console.log(optionsEffectives.optionA);
    console.log(optionsEffectives.optionB);
    console.log(optionsEffectives.optionC);
}

maFonction();

const options = {
    optionA: 'valeur1',
    optionB: 'valeur2',
    optionC: 'valeur3',
    optionD: 'valeur4',
    optionE: 'valeur5',
    optionF: 'valeur5',
};

// const optionA = options.optionA;
// const optionB = options.optionB;
const {
    optionA,
    optionB,
    optionF = 'valeur100',
    ...autresOptions
} = options;

const trouve1 = users.find(user=> user.name === 'joe');
const trouve2 = users.filter(user=> user.name.startsWith('jo'));

console.log(Object.keys(idx));
console.log(Object.values(idx));

Object.keys(idx).filter(x=> x>10);
