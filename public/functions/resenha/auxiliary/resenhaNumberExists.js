module.exports = async function(number) {
    const register = require('../auxiliary/resenhaLoadList');
    let exists = false;
    register.forEach((element) => {
        if ( element.id === number ) {
            exists = true;
        }
    });
    return exists;
}