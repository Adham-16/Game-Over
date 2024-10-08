
let displayContainer = document.getElementById("gameData");
let spinner = document.getElementById("spinner")
let details = document.getElementById("details")
let detailsContent = document.getElementById("detailsContent")


    class Display {
        constructor (Attribute){
            this.Attribute = Attribute
        }
        async DisplayCards() {
    try {
        const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${this.Attribute}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'YOUR_API_KEY',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const finalData = await response.json();
        showContent();

        const cards = finalData.map(game => `
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                <div class="body-card card" data-id="${game.id}">
                    <div class="image">
                        <img src="${game.thumbnail}" class="w-100" alt="image-game" />
                    </div>
                    <div class="text-game">
                        <div class="name-game d-flex justify-content-between">
                            <h3>${game.title}</h3>
                            <span>Free</span>
                        </div>
                        <p>${game.short_description}</p>
                        <div class="type d-flex justify-content-between">
                            <span>${game.genre}</span>
                            <span>${game.platform}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        displayContainer.innerHTML = cards;

        $(".body-card").click(e => {
            const id = e.target.closest(".body-card").getAttribute("data-id");
            const GameDetails = new Details(id);
            GameDetails.DisplayDetails();
            showDetails();
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        alert("Error!");
    }
}

    }
    class Details {
        constructor (id){
            this.id = id
        }
        async DisplayDetails() {
            var arrDetails = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${this.id}`,{
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '67ee09b6f7msh7ae579cd1d94411p140848jsn66ab464750fc',
                    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }})
            let finalDetails = await arrDetails.json();
            console.log(finalDetails);
        detailsContent.innerHTML = 
            `
        <div class="col-md-4">
            <img src="${finalDetails.thumbnail}" class="w-100" alt=" image-game" />
        </div>
        <div class="col-md-8">
            <div class="game-info text-white">
                <h3>Title: ${finalDetails.title}</h3>
                <p>
                    Category: <span class="badge text-bg-info"> ${finalDetails.genre} </span>
                </p>
                <p>Platform: <span class="badge text-bg-info"> ${finalDetails.platform} </span></p>
                <p>Status: <span class="badge text-bg-info"> Live </span></p>
                <p class="small">${finalDetails.description}</p>
                <a
                class="btn btn-outline-warning text-white"
                target="_blank"
                href="${finalDetails.game_url}"
                >Show Game</a>
            </div>
        </div>
            `
        }
    }
    $(".btn-close").click(function () {
        setTimeout(()=>{
            spinner.classList.add("d-none")
            details.classList.add("d-none")
        },500)
        $(".games").css("display","block")
        spinner.classList.remove("d-none")
    })
    
    const displayData = new Display("sports")
    $(".nav-item .nav-link").click( function (e) {
        displayContainer.innerHTML =""
        let gameAttribute = e.target.getAttribute("Games");
        const displayGames = new Display(gameAttribute) 
        displayGames.DisplayCards()
        $(".nav-item .nav-link").removeClass("active");
        $(this).addClass("active")
    }
    )

window.onload = displayData.DisplayCards();
    function showContent() {
        setTimeout(()=>{
        spinner.classList.add("d-none")
        $(".games").css("display","block")
        },500)
        $(".games").css("display","none")
        spinner.classList.remove("d-none")
    }
    function showDetails() {
        setTimeout(()=>{
        spinner.classList.add("d-none")
        details.classList.remove("d-none")
        },500)
        $(".games").css("display","none")
        spinner.classList.remove("d-none")
    }