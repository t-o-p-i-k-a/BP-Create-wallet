function(properties, context) {
// Создание экземпляра TronWeb с помощью API ключа из кабинета https://www.trongrid.io/
const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
    headers: { "TRON-PRO-API-KEY": '053d5230-a8eb-4efa-99f7-f448330ab107'},
})

  //Load any data 

const createWallet = async () => {
try {
const account = await tronWeb.createAccount();
      console.log("Адрес кошелька: ", account.address.base58);
	  console.log("Приватный ключ", account.privateKey)
}
    catch(error) {
console.log("Ошибка: ", error);
}
}
}