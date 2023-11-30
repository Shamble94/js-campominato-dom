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

        /* DICHIARO LE CELLE A VALORE 0 */
        let num_cells;
        let side_cells;

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

        /* CICLO FOR PER CREARE I VARI QUADRATI */
        for(let i=0; i<num_cells; i++){
            /* RICHIAMO LA FUNZIONE creazioneGriglia */
            let square = creazioneGriglia(i+1, side_cells);
                
            /* EVENTO CAMBIO COLORE CELLA AL CLICK */
            square.addEventListener(`click`, function(){
                this.classList.toggle(`cliccato`);
                console.log(`Hai cliccato la cella numero ${i+1}`)
            })
            /* APPENDO LO SQUARE ALLA GRIGLIA */
            griglia.appendChild(square);
            }    
    })
}
/* RICHIAMO FUNZIONE creazioneCella */
creazioneCella(button)