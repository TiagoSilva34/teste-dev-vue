// 00000-000
const validateCep = value => {
    return value.replace(/\D/g, "").replace(/^(\d{5})(\d{3})+?$/, "$1-$2")
}

export default validateCep;
