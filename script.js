  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark')
}

var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
    
});

function capitalizeFirstLetter(str) {

    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
}


try{
    const getPokemon = async (e) =>{
        e.preventDefault();
        const PokeName = document.querySelector('#pokemon_Name').value
        const pokemonName = PokeName.toLowerCase();
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if(res.status === 404)
        {
            document.querySelector('#pokeBox').innerHTML = `
            <div class="flex flex-col items-center justify-center p-5">
                <div class="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
                    <span class="font-medium">Info alert!</span> Pokemon Not Found.
                </div>
            </div>
                `
            return;
        }
        const data = await res.json();
        const {name} = data;
        const type = data.types['0'].type.name;
        const image = data.sprites.other["official-artwork"].front_default;
        document.querySelector('#pokeBox').innerHTML = 
            ` <a href="#">
                <img class="p-8 rounded-t-lg" src=${image} id="pokemon_image" alt="pokemon image">
              </a>
            <div class="text-center px-5 pb-5">
                <a href="#"> 
                    <h5 id="pokemon_name" class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${capitalizeFirstLetter(name)}</h5>
                </a>
                <a href="#"> 
                <h5 id="pokemon_name" class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Type: ${capitalizeFirstLetter(type)}</h5>
            </a>
            </div>`
        // document.querySelector('#PokeWeight').innerHTML = weight;
        // document.querySelector('#PokeType').innerHTML = type;
    }
    
    document.querySelector('#pokeSearch').addEventListener("click",getPokemon)
} catch(error){
        console.log(error)
}


