const criptografarSenha = (senha: string) => {
  return "zz" + senha.split("").reverse().join("") + "yy"
}

export default {
    criptografarSenha
}

// console.log(criptografarSenha("cubos"))