/* FUNZIONE CHE GENERA UN NUMERO UNICO CASUALE */
function generateUniqueNumber(array_bombs, num_cells){
    /* VARIABILE CHECK_NUMBER ASSEGNATA A FALSE */
    let check_number = false;
    /* VARIABILE RANDOMNUM A CUI ASSEGNEREMO UN VALORE CASUALE NEL CICLO WHILE */
    let randomNum;

    /* CICLO WHILE PER GENERARE NUMERI CASUALI */
    while(!check_number){
        randomNum = Math.floor(Math.random()*num_cells + 1);
        /* SE IL NUMERO é PRESENTE SI ESCE DALL'IF E SI GENERA ALTRI NUMERI */
        if(!array_bombs.includes(randomNum)){
            check_number = true;
        }
    }
    return randomNum;
}

/* FUNZIONE CHE GENERA LE BOMBE */
function generateBombs(n_of_bombs, num_cells){
    /* ARRAY BOMBS INIZIALIZZATO VUOTO */
    let bombs = [];
    /* CICLO FOR PER ANDARE A INSERIRE I NUMERI CASUALI, OVVERO LE BOMBE, NELL'ARRAY */
    for (let i=0; i<n_of_bombs; i++){
        let bomb_number = generateUniqueNumber(bombs, num_cells);
        bombs.push(bomb_number)
    }
    return bombs;
}




/* FUNZIONE CHE GENERA LA GRIGLIA */
function creazioneGriglia(num, side_cells){
    /* GENERO UN DIV */
    const elem_griglia = document.createElement(`div`);
    /* GLI ASSOCIO LA CLASS SQUARE */
    elem_griglia.classList.add(`square`);
    elem_griglia.style.width = `calc(100% / ${side_cells})`
    elem_griglia.style.height = `calc(100% / ${side_cells})`
    /* LO NUMERO */
    elem_griglia.innerText = num;
    /* RITORNO IL RISULTATO */
    return elem_griglia
}

/* VARIABILE BOTTONE CHE ANDRA A GENERARE LA GRIGLIA E LE CELLE */
let button = document.getElementById(`button`);

/* FUNZIONE GENERA CELLA */
function creazioneCella(){
    /* BOTTONE CON EVENTO CLICK */
    button.addEventListener(`click`, function(){
        /* PRENDIAMO LA GRIGLIA DAL DOM */
        let griglia = document.getElementById(`grid`);
        griglia.innerHTML = ""

        /* PRENDO L'INPUT DELL'UTENTE PER SELEZIONARE LA DIFFICOLTA */
        let livello = document.getElementById(`difficulty`);
        /* TRASFORMO L'INPUT IN UN VALORE */
        let difficolta = parseInt(livello.value);
        /* NUMERO DI BOMBE PRESENTI NELLA GRIGLIA */
        let number_of_bombs = 16;
        /* VALORE PUNTEGGIO GIOCATORE INIZIALIZZATO A 0 */
        let points = 0;
        /* DICHIARO LE CELLE A VALORE 0 */
        let num_cells;
        let side_cells;
        /* VARIABILE GAMEOVER SETTATA SU FALSE */
        let gameOver = false;
        switch(difficolta){
            /* PRIMO CASO: GRIGLIA 10x10 */
            case 1:
                num_cells = 100;
                side_cells = 10;
                break;
            /* SECONDO CASO: GRIGLIA 9x9 */
            case 2:
                num_cells = 81;
                side_cells = 9;
                break;
            case 3:
            /* TERZO CASO: GRIGLIA 7x7 */
                num_cells = 49;
                side_cells = 7
                break;     
            /* SE NON VIENE SELEZIONATO NESSUN VALORE SI CANCELLA LA GRIGLIA ATTUALE */
            default:
                alert("Seleziona un livello di difficolta")
                break;
        } 
        /* RICHIAMO FUNZIONE GENERA BOMBE */
        const bombs = generateBombs(number_of_bombs, num_cells)
        
        /* CICLO FOR PER CREARE I VARI QUADRATI */
        for(let i=0; i<num_cells; i++){
            /* RICHIAMO LA FUNZIONE creazioneGriglia */
            let square = creazioneGriglia(i+1, side_cells);
                
            /* EVENTO CAMBIO COLORE CELLA AL CLICK */
            square.addEventListener(`click`, function(){
                /* SE IL NUMERO CALPESTATO NON CORRISPONDE AD UNA BOMBA */
                if(!bombs.includes(i)){
                    this.classList.toggle(`cliccato`);
                    points++;
                    document.getElementById('punti').innerText = `Punti: ${points}`
                    console.log(`Hai cliccato la cella numero ${i+1}`)
                }else{ /* SE IL NUMERO CORRISPONDE AD UNA BOMBA */
                    this.classList.add(`bomb_clicked`);
                    alert("Mi dispiace hai calpestato una bomba! Clicca su gioca per iniziare una nuova partita")
                    griglia.innerHTML = ""
                }

            })
            /* APPENDO LO SQUARE ALLA GRIGLIA */
            griglia.appendChild(square);
            }    
    })
}
/* RICHIAMO FUNZIONE creazioneCella */
creazioneCella(button)