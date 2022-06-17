const nedb =  require('nedb-promise')
const userDatabase = new nedb({filename: 'userdatabase.db', autoload: true})
const orderDatabase = new nedb({filename: 'orderdatabase.db', autoload: true})
const menuDatabase = new nedb({filename: 'menuedatabase.db', autoload: true})

function addToMenu(credentials) {
    const result = menuDatabase.insert({ id: credentials.id, title: credentials.title, desc: credentials.desc, price: credentials.price });
    return result;
}

function checkMenu(credentials) {
    const result = menuDatabase.find({ $or: [{id: credentials.id}, {title: credentials.title} ]})
    return result
}

function getMenu(){
    const result = menuDatabase.find({});
    return result
}

function removeProduct(id) {
    const result = menuDatabase.remove({ id: Number(id) });
    return result
}

function checkAccount(credentials){
    const result = userDatabase.find({ $or: [ {email: credentials.email}, {username: credentials.username} ] })
    return result
}

function createAccount(credentials){
    const result = userDatabase.insert({ email: credentials.email , username: credentials.username, password: credentials.password })
    return result
}

function loginAccount(credentials){
    const result = userDatabase.find({$and: [{username: credentials.username}, {password: credentials.password}] })
    return result
}

function findOrders(credentials){
    const result = orderDatabase.find({username: credentials })
    return result

}



function createOrder(credentials){
    const orderTime = new Date().toLocaleTimeString();
    const timeStamp = Date.now();
    const orderTimeTemp = new Date();
    const ETAnumber = Math.floor(Math.random() * 10) + 1;
    ETAminutes = new Date ( orderTimeTemp );
    ETAminutes.setMinutes ( orderTimeTemp.getMinutes() + ETAnumber );
    const toLocaleETA = ETAminutes.toLocaleTimeString();
    const etaTimeStamp = Date.now() + (ETAnumber * 60000);


    const result = orderDatabase.insert({username: credentials.username, order: credentials.cart, orderTime: orderTime, ETA: toLocaleETA , timeStamp: timeStamp,
                    etaTimeStamp: etaTimeStamp })
    return result
}

module.exports = { getMenu, checkAccount, createAccount, loginAccount, createOrder, findOrders, addToMenu,
                checkMenu, removeProduct }
