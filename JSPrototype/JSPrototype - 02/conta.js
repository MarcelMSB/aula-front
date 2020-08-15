	// Instancias
	var $ = document;
	var conta = new contaBancaria();	
	var demonstra = new demonstraSaldo();
	var mov = new movimentacao();
	// Configurações
	demonstra.SUCESSO = "Operacao realizada com sucesso";
	demonstra.SEMSALDO = "Sem saldo na Conta para realizar a operacao";	
	conta.saldo = 0;
	conta.limite = -200;
	// Classes
	function contaBancaria() {
		this.deposito = function(valor) {
			this.saldo += parseFloat(valor);		
			mov.insereMov("Deposito",valor);
			demonstra.demonstra(this.saldo, demonstra.SUCESSO);
		}
		this.saque = function(valor) {
			if (!this.excedeLimite(valor)) {
				this.saldo -= parseFloat(valor);
				mov.insereMov("Saque",valor);
				demonstra.demonstra(this.saldo,demonstra.SUCESSO);				
			} else {
				demonstra.demonstra(this.saldo,demonstra.SEMSALDO);
			}
		}
		this.excedeLimite = function(valorSaque) {
			return (this.saldo-parseFloat(valorSaque) >= this.limite) ? false : true;		
		}		
	}
	function movimentacao() {
		this.mov = [];					
		this.insereMov = function(tipo,valor) {
			var data = new Date();
			var str_data = data.getDate() + '/' + (data.getMonth()+1) + '/' + data.getFullYear();
			var str_hora = data.getHours() + ':' +data.getMinutes() + ':' + data.getSeconds();
			this.mov[this.mov.length] = [str_data + ' as ' + str_hora,tipo,valor];
			demonstra.demonstraMov();
		}
	}
	function demonstraSaldo(){			
		this.demonstra = function(valor,mensagem) {		
			$.getElementById("saldo").innerHTML = valor;
			$.getElementById("mensagem").innerHTML = mensagem;
			$.getElementById("valor").value = 0;
		}
		this.demonstraMov = function() {
			var text = "";
			for	(var i=0; i< mov.mov.length; i++) {
				text += "<br/>"+mov.mov[i];
			}
			$.getElementById("movimentacao").innerHTML = text;
		}
	}	
	