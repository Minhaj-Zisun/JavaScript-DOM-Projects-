// Get Pockomon ----------

async function fetchData(){
    try {
        const pockoName = document.getElementById('Pockomon').value.toLowerCase();

        const response =await fetch(`https://pokeapi.co/api/v2/pokemon/${pockoName}`);

        if(!response.ok){
            throw new Error('Error Cought')
        }
        const data =await response.json();
        console.log(data);
        const PockomonSprite = data.sprites.front_default;
        // console.log(PockomonSprite);
        const image = document.getElementById('img');
        image.src = PockomonSprite;
        image.style.display = "block";
        
    } catch (error) {
        console.log(error);
        
    }
}
