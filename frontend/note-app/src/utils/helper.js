export const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}
export const validatePassword = (password) => {
    return password.length > 6;
    }
export const getinitals = (name) => {
    return name.split(' ').map((n)=>n[0]).join('')
}
