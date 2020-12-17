window.onload = () => {
    const amiiboData = (amiiboName) => {
        const apiURL = amiiboName 
        ? `https://www.amiiboapi.com/api/amiibo/?name=${amiiboName}` 
        : "https://www.amiiboapi.com/api/amiibo/";

        fetch("https://www.amiiboapi.com/api/amiibo/").then((response) => {
            return response.json();
        }).then(({amiibo}) => {
            const amiibosContainer = document.querySelector("div#amiibosContainer");
            //make the function pure
            amiibosContainer.innerHTML = "";

            const filteredAmiibo = amiibo.filter(({name}) => {
                if (!amiiboName){
                    return true;
                }
                if (name.toLowerCase().includes(amiiboName.toLowerCase())){
                    return true;
                }
                return false;
            }).map((element) => {
                return{
                   ...element,
                    price: Math.floor(Math.random()* 30 + 29)+ 0.99,
                }
            })

            filteredAmiibo.forEach(({name, gameSeries, image, release, price}) => {
                //create the card container
                const amiiboContainer = document.createElement("div");
                amiiboContainer.classList.add("amiiboContainer");
    
                //create card image
                const amiiboImage = document.createElement("img");
                amiiboImage.setAttribute("src", image);
                amiiboImage.setAttribute("alt", `${name}'s amiibo image`);
                amiiboImage.classList.add("amiiboImage");
    
                //create card name
                const amiiboName = document.createElement("div");
                amiiboName.classList.add("name");
                amiiboName.textContent = name;
    
                //create date
                const amiiboDate = document.createElement("div");
                amiiboDate.classList.add("date");
                const date = (release.au||release.eu||release.jp||release.na);
                amiiboDate.textContent = date.replace(/-/gi, "/")
    
                //create price
                const amiiboPrice = document.createElement("div");
                amiiboPrice.classList.add("price");
                amiiboPrice.textContent = `$${price}`;
    
                //create card gameseries
                const gameSeriess = document.createElement("div");
                gameSeriess.classList.add("gameSeries");
                gameSeriess.textContent = gameSeries;
    
                //creates heart
                const heart = document.createElement("img");
                heart.setAttribute("src", "assets/heart.svg");
                heart.classList.add("heart");
    
                const all = [amiiboImage, amiiboName, amiiboDate, amiiboPrice, gameSeriess, heart];
                
                //appends all items to amiiboContainer
                all.forEach((element) => {
                    amiiboContainer.appendChild(element);
                });
    
                //add amiiboContainer into amiibosContainer
                amiibosContainer.appendChild(amiiboContainer);
            });
        
            //number of amiibos filtered
            const displayNum = document.querySelector("div#modal > div.count > div.number");
            displayNum.textContent = filteredAmiibo.length + "/" + amiibo.length;

            //average price of filtered amiibos
            const avg = document.querySelector("div#modal > div.avgPrice > div.number");
            avg.textContent = "$" + filteredAmiibo.reduce((accumulator, current) => {
                return (accumulator + current.price/filteredAmiibo.length);
            }, 0).toFixed(2);

        }).catch((err) => {
            console.log(err);
        })
    } 

    const marioButton = document.querySelector("div#filterButtons > div.mario");
    marioButton.addEventListener("click", () => {
        amiiboData("mario");
    })
    const zeldaButton = document.querySelector("div#filterButtons > div.zelda");
    zeldaButton.addEventListener("click", () => {
        amiiboData("zelda");
    })
    const peachButton = document.querySelector("div#filterButtons > div.peach");
    peachButton.addEventListener("click", () => {
        amiiboData("peach");
    })
    const showAllButton = document.querySelector("div#filterButtons > div.showAll");
    showAllButton.addEventListener("click", () => {
        amiiboData();
    })
    const searchButton = document.querySelector("div#search > div.button");
    searchButton.addEventListener("click", () => {
        const search = document.querySelector("div#search > input#amiiboSearch");
        // populate based on search value
        amiiboData(search.value || null);
    })
    
    amiiboData();
}