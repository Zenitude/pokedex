// Récupération du body
const body = document.body;

// Création du titre Pokédex
const grandtitre = document.createElement('h1');
grandtitre.innerHTML = 'Pokédex'
body.appendChild(grandtitre);

// Création du container qui contiendra les cases des Pokémons
const container = document.createElement('div');
container.setAttribute('class', 'container');
body.appendChild(container);

// Création des variables de bases
let limitePokedex = '151'; 
let lienApi = `https://pokeapi.co/api/v2/pokemon?limit=${limitePokedex}`;

// Tableau des types
const types = 
{
    'rock' : 'ressources/roche.png',
    'water': 'ressources/eau.png', 
    'bug' : 'ressources/insecte.png',
    'steel' : 'ressources/acier.png',
    'grass' : 'ressources/plante.png',
    'ice' : 'ressources/glace.png',
    'fire' : 'ressources/feu.png',
    'fairy' : 'ressources/fee.png',
    'dragon' : 'ressources/dragon.png',
    'ground' : 'ressources/sol.png',
    'electric' : 'ressources/electric.png',
    'psychic' : 'ressources/psy.png',
    'dark' : 'ressources/tenebres.png',
    'fighting' : 'ressources/combat.png',
    'normal' : 'ressources/normal.png',
    'poison' : 'ressources/poison.png',
    'ghost' : 'ressources/spectre.png',
    'flying' : 'ressources/vol.png'
}

// Affichage des pokémons
recuperationDonnees(lienApi);

// Fonction qui récupère les données de l'API et affiche les pokémons
function recuperationDonnees(api)
{
    // Récupération des données de l'API
    fetch(api)
    .then(reponse => reponse.json())
    .then(donnees => 
    {
        // Création d'un tableau qui stockera provisoirement les pokémons
        let TousLesPkmn = [];
        TousLesPkmn.push(donnees.results);

        // Triage des pokémons pour qu'ils s'affichent dans l'ordre numérique
        let listeTriePkmn = TousLesPkmn.sort((a,b) => 
        {
          return a.id - b.id;
        });

        // Affichage des pokémons
        recuperationPokemon(listeTriePkmn[0]);
    });
}

// Fonction qui recupère les différentes informations sur les Pokémons
function recuperationPokemon(infosPkmn)
{
    // Récupération des données de chaque pokémon
    infosPkmn.forEach(donneePkmn => {
        fetch(donneePkmn.url)
        .then(reponsePkmn => reponsePkmn.json())
        .then(donneesPkmn => 
        {
            // Création de la case d'information du pokémon
            const casesPokedex = document.createElement('div');
            casesPokedex.setAttribute('class', 'cases');
	        casesPokedex.addEventListener('click', afficherShiny);
            container.appendChild(casesPokedex);

            // Création du container qui contiendra le(s) type(s)
            const containerTypes = document.createElement('div');
            containerTypes.setAttribute('class', 'containerTypes');
            casesPokedex.appendChild(containerTypes);

            // Récupération des types
            donneesPkmn.types.forEach(type =>
            {
                const imgType = document.createElement('img');
                imgType.setAttribute('src', `${types[type.type.name]}`);
                imgType.setAttribute('class', 'imgType');
                containerTypes.appendChild(imgType);
            })
            
            // Création de l'image du pokémon
            const imgPkmn = document.createElement('img');
            imgPkmn.setAttribute('src', `https://www.pokebip.com/pokedex-images/300/${donneesPkmn.id}.png`);
            casesPokedex.appendChild(imgPkmn);

            // Modifier l'image pour afficher la version shiny au clic sur la case et inversement
	        function afficherShiny()
            {
                if(imgPkmn.src === `https://www.pokebip.com/pokedex-images/300/${donneesPkmn.id}.png`)
                {
                    imgPkmn.setAttribute('src', `https://www.pokebip.com/pages/jeuxvideo/dossier_shasse/imagerie/home/${donneesPkmn.id}.png`);
                }
                else
                {
                    imgPkmn.setAttribute('src', `https://www.pokebip.com/pokedex-images/300/${donneesPkmn.id}.png`);
                }
            }

            /* Création du titre qui affichera le numéro du pokémon */
            const numPkmn = document.createElement('h5');

            if(donneesPkmn.id < 10)
            {
                numPkmn.innerHTML = `# 00${donneesPkmn.id}`;
            }
            else if (donneesPkmn.id < 100)
            {
                numPkmn.innerHTML = `# 0${donneesPkmn.id}`;
            }
            else
            {
                numPkmn.innerHTML = `# ${donneesPkmn.id}`;
            }

            casesPokedex.appendChild(numPkmn);
            
            /* Gestion de l'affichage du nom du pokémon en français*/
            let infoNomPkmn;

            // Récupération du nom du pokémon via son nom anglais
            fetch(donneesPkmn.species.url) 
            .then(responseSpecies => responseSpecies.json())
            .then(donneesSpecies =>
            {
                // Récupération du nom français
                infoNomPkmn = `${donneesSpecies.names[4].name}`;

                // Création du titre qui affichera le nom du pokémon
                const nomPkmn = document.createElement('h4');
                nomPkmn.innerHTML = infoNomPkmn;
                imgPkmn.setAttribute('alt', `image représentant ${infoNomPkmn}`)
                casesPokedex.appendChild(nomPkmn);
            });  
        });
    });
}
