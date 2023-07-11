const cpfEl = document.querySelector('#cpf')
const gerarCpfBtn = document.querySelector('#gerar-cpf')
const copiarCpfBtn = document.querySelector('#copiar-cpf')

//999.999.999-99
function gerarCPF(){
    let n = Math.floor(Math.random() * 999999999) + 1 //Para gerar um numero aleatorio para os 9 primeiros digitos
    let nStr = n.toString().padStart(9,"0") //Caso o numero gerado seja menor do que 9 digitos, ele irá acrescentar o 0
    let dv1 = calcularDV(nStr, 10)
    let dv2 = calcularDV(nStr + dv1, 11)

    cpfEl.innerHTML = formatarCPF(nStr + dv1 + dv2)
}

function calcularDV(numero, peso){
    let total = 0
    for(let i=0; i< numero.length; i++){
        total += parseInt(numero.charAt(i)) * peso--
    }
    let resto = total % 11
    return resto < 2 ? 0 : 11 - resto
}

function formatarCPF(cpf){
    const regex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/
    return cpf.replace(regex, "$1.$2.$3-$4") //999.999.999-99
}

function copiarCPF(){
    const cpf = cpfEl.innerText
    navigator.clipboard.writeText(cpf).then(()=>{
        alert(`CPF ${cpf} copiado para a área de transferência.`)
    },
    (err)=>{
        console.log("Erro ao copiar CPF")
    })
}

gerarCpfBtn.addEventListener('click', gerarCPF)
copiarCpfBtn.addEventListener('click', copiarCPF)