const body = document.body;

const grandtitre = document.createElement('h1');
grandtitre.innerHTML = 'Pokédex'
body.appendChild(grandtitre);

const container = document.createElement('div');
container.setAttribute('class', 'container');
body.appendChild(container);

let limitePokedex = '151';
let lienApi = `https://pokeapi.co/api/v2/pokemon?limit=${limitePokedex}`;

function recuperationDonnees(api)
{
    fetch(api)
    .then(reponse => reponse.json())
    .then(donnees => 
    {
        recuperationPokemon(donnees);
    });
}

recuperationDonnees(lienApi);

function recuperationPokemon(infosPkmn)
{
    infosPkmn.results.forEach(donneePkmn => {
        fetch(donneePkmn.url)
        .then(reponsePkmn => reponsePkmn.json())
        .then(donneesPkmn => 
        {
            const casesPokedex = document.createElement('div');
            casesPokedex.setAttribute('class', 'cases');
            container.appendChild(casesPokedex);

            const containerTypes = document.createElement('div');
            containerTypes.setAttribute('class', 'containerTypes');
            casesPokedex.appendChild(containerTypes);

            if(donneesPkmn.types.length < 2)
            {
                let premierType = donneesPkmn.types[0].type.name;

                const imgPremierType = document.createElement('img');
                imgPremierType.setAttribute('src', `${types(premierType)}`);
                imgPremierType.setAttribute('class', 'imgType');
                containerTypes.appendChild(imgPremierType);
            }
            else
            {
                let premierType = donneesPkmn.types[0].type.name;

                const imgPremierType = document.createElement('img');
                imgPremierType.setAttribute('src', `${types(premierType)}`);
                imgPremierType.setAttribute('class', 'imgType');

                let secondType = donneesPkmn.types[1].type.name;

                const imgSecondType = document.createElement('img');
                imgSecondType.setAttribute('src', `${types(secondType)}`);
                imgSecondType.setAttribute('class', 'imgType');
                containerTypes.appendChild(imgPremierType);
                containerTypes.appendChild(imgSecondType);
                
            }
            
            const imgPkmn = document.createElement('img');
            imgPkmn.setAttribute('src', `${donneesPkmn.sprites.front_default}`);
            imgPkmn.setAttribute('alt', `image représentant ${"bulbizarre"}`)
            casesPokedex.appendChild(imgPkmn);

            let id;

            if(donneesPkmn.id < 10)
            {
                id = `# 00${donneesPkmn.id}`;
            }
            else if (donneesPkmn.id < 100)
            {
                id = `# 0${donneesPkmn.id}`;
            }
            else
            {
                id = `${donneesPkmn.id}`;
            }

            const numPkmn = document.createElement('h5');
            numPkmn.innerHTML = `${id}`;
            casesPokedex.appendChild(numPkmn);
            
            let infoNomPkmn;

            fetch(donneesPkmn.species.url) 
            .then(responseSpecies => responseSpecies.json())
            .then(donneesSpecies =>
            {
                infoNomPkmn = `${donneesSpecies.names[4].name}`;

                const nomPkmn = document.createElement('h4');
                nomPkmn.innerHTML = infoNomPkmn;
                casesPokedex.appendChild(nomPkmn);
            });
            
        });
    });
}

function types(type)
{
    switch(type)
    {
        case 'rock' :
            return 'ressources/roche.png';
            break;
        
        case 'water':
            return 'ressources/eau.png';
            break;
        
        case 'bug' :
            return 'ressources/insecte.png';
            break;

        case 'steel' :
            return 'ressources/acier.png';
            break;
        
        case 'grass' :
            return 'ressources/plante.png';
            break;
        
        case 'ice' :
            return 'ressources/glace.png';
            break;
        
        case 'fire' :
            return 'ressources/feu.png';
            break;
        
        case 'fairy' :
            return 'ressources/fee.png';
            break;
        
        case 'dragon' :
            return 'ressources/dragon.png';
            break;
        
        case 'ground' :
            return 'ressources/sol.png';
            break;
        
        case 'electric' :
            return 'ressources/electric.png';
            break;
        
        case 'psychic' :
            return 'ressources/psy.png';
            break;
        
        case 'dark' :
            return 'ressources/tenebres.png';
            break;

        case 'Fighting' :
            return 'ressources/combat.png';
            break;

        case 'normal' :
            return 'ressources/normal.png';
            break;
        
        case 'poison' :
            return 'ressources/poison.png';
            break;
        
        case 'ghost' :
            return 'ressources/spectre.png';
            break;

        case 'flying' :
            return 'ressources/vol.png';
            break;

        default :
            return 'ressources/inconnu.png';
    }
}
