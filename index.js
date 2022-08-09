class Data {
    #_id;
    index;
    balance;
    age;
    name;

    constructor(index, balance, age, name) {
        this.#_id = Math.round(Math.random() * 100000);
        this.index = index;
        this.balance = balance;
        this.age = age;
        this.name = name;
    }

    getId() {
        return this.#_id;
    }
}

Datas = [];

async function Create(data) {
    const promise = await new Promise((resolve, reject) => {
        try {
            Datas.push(data);
            resolve(data.getId());
        } catch (error) {
            reject(error);
        }
    }).then((sucess) => {
        console.log(`successfull add with id ${sucess} `);
    }).catch((error) => {
        console.log('could not create.');
    });
}

async function Read(_id) {
    const promise = await new Promise((resolve, reject) => {
        let isFound = false;
        Datas.forEach((elm) => {
            if (elm.getId() == _id) {
                isFound = true;
                resolve(elm);
            }
        });
        if (!isFound)
            reject('could not found.')
    }).then((sucess) => {
        console.log(sucess);
    }).catch((error) => {
        console.log(error);
    });
}

async function Update(_id, data) {
    const promise = await new Promise((resolve, reject) => {
        try {
            let isFound = false;
            Datas.forEach((elm, index) => {
                if (elm.getId() == _id) {
                    isFound = true;
                    Datas[index].index = data.index;
                    Datas[index].balance = data.balance;
                    Datas[index].age = data.age;
                    Datas[index].name = data.name;
                    resolve(elm.getId());
                }
            });
            if (!isFound)
                reject('could not found.')
        } catch (error) {
            reject(error);
        }
    }).then((sucess) => {
        console.log(`successfull update with id ${sucess} `);
    }).catch((error) => {
        console.log('could not update.');
    });
}

async function Delete(_id) {
    const promise = await new Promise((resolve, reject) => {
        let isFound = false;
        Datas.forEach((elm, index) => {
            if (elm.getId() == _id) {
                delete Datas[index];
                isFound = true;
                resolve('successful deleted');
            }
        });
        if (!isFound)
            reject('could not found.')
    }).then((sucess) => {
        console.log(sucess);
    }).catch((error) => {
        console.log(error);
    });
}


async function crud() {
    console.log('*****');
    await Create(new Data(0, "$1,714.03", 39, "Stella Fitzpatrick"));
    
    console.log('*****');
    await Read(Datas[0].getId());
    
    console.log('*****');
    await Update(Datas[0].getId(), new Data(3746, "$1,714.6465", 40, "Stella Fitzpatrick updated"));
    
    console.log('*****');
    await Read(Datas[0].getId());
    
    console.log('*****');
    await Delete(Datas[0].getId());
    
    console.log('*****');
    console.log(Datas);
}

crud();