import './bootstrap';
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('HMR sonrası bu fonksiyon çalıştırıldı!');
    // Burada çalıştırmak istediğiniz diğer işlemler
    myFunctionAfterHMR();
  });
}

function myFunctionAfterHMR() {
	console.log('Her sayfa render edildiğinde bu çalışır');
	window.app.mount("#app");

  // Burada çalıştırmak istediğiniz diğer işlemler
}

// myFunctionAfterHMR();