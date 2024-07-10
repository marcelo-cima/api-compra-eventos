export const criptografarSenha = (senha: string) => {
  return "zz" + senha.split("").reverse().join("") + "yy"
}

// console.log(criptografarSenha("cubos"))