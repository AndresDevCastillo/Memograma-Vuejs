var Game = new Vue({
    el: '#Game',
    data: {
        cartas: [
            { id: 1, src: "img/img1.jpg", volteada: false, acertada: false },
            { id: 2, src: "img/img2.jpg", volteada: false, acertada: false },
            { id: 3, src: "img/img3.jpg", volteada: false, acertada: false },
            { id: 4, src: "img/img4.jpg", volteada: false, acertada: false },
            { id: 5, src: "img/img5.jpg", volteada: false, acertada: false },
            { id: 6, src: "img/img6.jpg", volteada: false, acertada: false },
            { id: 7, src: "img/img7.jpg", volteada: false, acertada: false },
            { id: 8, src: "img/img8.jpg", volteada: false, acertada: false },
            { id: 1, src: "img/img1.jpg", volteada: false, acertada: false },
            { id: 2, src: "img/img2.jpg", volteada: false, acertada: false },
            { id: 3, src: "img/img3.jpg", volteada: false, acertada: false },
            { id: 4, src: "img/img4.jpg", volteada: false, acertada: false },
            { id: 5, src: "img/img5.jpg", volteada: false, acertada: false },
            { id: 6, src: "img/img6.jpg", volteada: false, acertada: false },
            { id: 7, src: "img/img7.jpg", volteada: false, acertada: false },
            { id: 8, src: "img/img8.jpg", volteada: false, acertada: false },
        ],
        cartaVolteada: [],
        cartasVolteadas: [],
        jugadores: [0, 0],
        turno: 0,
        JugadorActi: true,
        segundo: 0,

    },
    methods: {
        limpiar() {
            console.log(this.jugadores);
            console.log(this.turno);
            if (this.jugadores[0] == 0 && this.jugadores[1] == 0 && this.turno == 0) {
                swal("El juego esta limpio", "Continua jugando", "info");
            }
            else {
                swal({
                    title: "Estas seguro?",
                    text: "Se eliminaron todos los datos de la partida.",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            swal("Listo, Empieza el jugador 1", {
                                icon: "success",
                            });
                            this.revolverCartas();

                        } else {
                            swal("La partida continuara");
                        }
                    });
            }

        },
        revolverCartas() {
            // Copiamos el array de cartas
            const cartasRevueltas = [...this.cartas]
            // Las mezclamos aleatoriamente
            for (let i = cartasRevueltas.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                const temp = cartasRevueltas[i]
                cartasRevueltas[i] = cartasRevueltas[j]
                cartasRevueltas[j] = temp
            }
            // Actualizamos el array de cartas
            this.cartas = cartasRevueltas
            // Reiniciamos el juego
            this.cartas.forEach(carta => {
                carta.volteada = false
                carta.acertada = false
            })
            this.cartasVolteadas = []
            this.cartasAcertadas = []
            this.turno = 0;
            this.jugadores = [0, 0];
            this.RevisarTurno();
        },
        voltearCarta(index) {

            const carta = this.cartas[index]
            // Si la carta ya está volteada o ya fue acertada, no hacemos nada
            if (carta.volteada || carta.acertada) return
            // Volteamos la carta
            carta.volteada = true
            // Agregamos la carta al array de cartas volteadas
            this.cartasVolteadas.push(carta)
            // Si hay dos cartas volteadas, las comparamos
            if (this.cartasVolteadas.length === 2) {
                // Deshabilitamos el click en todas las cartas
                /*this.cartas.forEach(carta => {
                    carta.volteada = true
                })*/
                
                setTimeout(() => {
                    const carta1 = this.cartasVolteadas[0]
                    const carta2 = this.cartasVolteadas[1]
                    if (carta1.src === carta2.src) {
                        if ((this.jugadores[0] + this.jugadores[1]) == 8) {
                        }
                        else {
                            document.getElementById("sonido").play();
                            document.getElementById("sonido").currentTime=0.2;
                        }
                        
                        // Si las cartas son iguales, las marcamos como acertadas
                        carta1.acertada = true;
                        carta2.acertada = true;
                        this.jugadores[this.turno]++;
                        // Agregamos las cartas al array de cartas acertadas
                        this.cartasAcertadas.push(carta1, carta2);
                        
                    } else {
                        if (this.turno == 0) {
                            this.turno = 1;
                        }
                        else {
                            this.turno = 0;
                        }
                        // Si las cartas son distintas, las volteamos de nuevo
                        carta1.volteada = false
                        carta2.volteada = false
                    }
                    // Vaciamos el array de cartas volteadas
                    this.cartasVolteadas = []
                    // Habilitamos el click en todas las cartas
                    this.cartas.forEach(carta => {
                        if (!carta.acertada) {
                            carta.volteada = false
                        }

                        this.RevisarAcert();
                        this.RevisarTurno();
                    })
                }, 1000)
            }
        },
        RevisarAcert() {
            if ((this.jugadores[0] + this.jugadores[1]) == 8) {
                document.getElementById("win").play();
                if (this.jugadores[0] > this.jugadores[1]) {
                    
                    swal({
                        title: "Jugador 1",
                        text: "Felicitaciones por ganar!",
                        icon: "success",
                        button: "Reiniciar",
                    });
                    this.revolverCartas();

                }
                else if (this.jugadores[0] < this.jugadores[1]) {
                    swal({
                        title: "Jugador 2",
                        text: "Felicitaciones por ganar!",
                        icon: "success",
                        button: "Reiniciar",
                    });
                    this.revolverCartas();
                }
                else if (this.jugadores[0] == this.jugadores[1]) {
                    swal({
                        title: "¡Empate!",
                        text: "Una partida más",
                        icon: "success",
                        button: "Reiniciar",
                    });
                    this.revolverCartas();
                }
                this.jugadores = [0, 0];
            }
        },
        cambiarTurno() {
            if (this.turno == 0) {
                this.turno = 1;
            } else {
                this.turno = 0;
            }
            this.RevisarTurno();
        },
        RevisarTurno() {
            if (this.turno == 0) {
                this.JugadorActi = true;
            }
            if (this.turno == 1) {
                this.JugadorActi = false;
            }
        },
    },
    mounted: function () {
        this.revolverCartas();
      
    }
});

