const generarCodigo = () => {
    try {
        return Math.floor(100000 + Math.random() * 900000);

    } catch(error) {

        return null
        
    }
}


module.exports = {
    generarCodigo
}