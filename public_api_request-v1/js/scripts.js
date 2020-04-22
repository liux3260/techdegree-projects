const search_container = document.querySelector('.search-container');
const gallery = document.querySelector('.gallery');
const body = document.querySelector('body');
let userList;
let position;

search_container.innerHTML = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;

//Helper method to fetch data
function fetchData(url){
    return fetch(url)
             .then(checkStatus)
             .then(res =>res.json()) 
             .catch(error =>console.log('Error:',error))
   }
   
//helper method to check status of the return data
function checkStatus(response){
if(response.ok){
    return Promise.resolve(response);
}
else{
    return Promise.reject(new Error(response.statusText));
}
}

//Main method for getting data from api
function displayUsers(){
    Promise.all([
        fetchData('https://randomuser.me/api/?results=12&nat=us'),
    ])
        .then(data => {
        userList = data[0].results;
        generateCard(userList);
        
        })
}

//Function to generate card based on the number of results from api
function generateCard(data){
    for (let index = 0; index < data.length; index++) {
    
        let card = document.createElement("div");
        card.setAttribute("class","card");
        gallery.appendChild(card);

        let card_img = document.createElement("div");
        card_img.setAttribute("class","card-img-container");
        const img_html = `<img class="card-img" src='${data[index].picture.large}' "profile picture">`;
        card_img.innerHTML = img_html;
        card.appendChild(card_img);

        let card_info = document.createElement("div");
        card_info.setAttribute("class","card-info-container");
        const info_html = `<h3 id="name" class="card-name cap">${data[index].name.first} ${data[index].name.last}</h3>
        <p class="card-text">${data[index].email}</p>
        <p class="card-text cap">${data[index].location.city}, ${data[index].location.state}</p>`;
        card_info.innerHTML = info_html;
        card.appendChild(card_info);
        card.addEventListener("click",findModal);


    }

}

//Generate Modal based on the card that the user clicked
function findModal(e){
    let cardNode;
    switch(e.target.className){
        case "card-img-container":
        case "card-info-container":
            cardNode = e.target.parentNode;
            break;
        case "card":
            cardNode = e.target;
            break;
        default:
            cardNode = e.target.parentNode.parentNode;
            break;
    }
    const cards = document.querySelectorAll(".card");
    for (let index = 0; index < cards.length; index++) {
        if(cards[index].isSameNode(cardNode)){
            //console.log(index);
            generateModal(userList[index]);
            position = index;
        }
        
    }

}

//Searching function: display cards that contains search value
function searchName(){

    const searchValue = document.querySelector('.search-input').value;
    const cards = document.querySelectorAll(".card");
    for (let index = 0; index < cards.length; index++) {
        const name = cards[index].querySelector("#name").innerHTML;
        if (name.indexOf(searchValue)!=-1) {
            cards[index].style.display = "";
        }
        else{
            cards[index].style.display = "none";
        }
        
    }

}

//Function to go to previous card
function previousCard(e){
    //console.log("In the function");
    const cards = document.querySelectorAll(".card");
    if(position !=0){
        //console.log("In the statement");
        closeModal();
        cards[position-1].click();
    }
}

//Function to go to next card
function nextCard(e){
    //console.log("In the function");
    const cards = document.querySelectorAll(".card");
    if(position < userList.length-1){
        //console.log("In the statement");
        closeModal();
        cards[position+1].click();
    }
}

//Function for closing the modal
function closeModal(){
    let modal_container = document.querySelector(".modal-container");
    body.removeChild(modal_container);
}

//change date format
function changeDateFormat(date){
    const dateTime = new Date(date);
    let month = dateTime.getMonth() +1;
    let day = dateTime.getDate();
    let year = dateTime.getFullYear();
    return `${month}/${day}/${year}`
}

//Function for genrating modal based on the card
function generateModal(data){     
    
    let modal_container = document.createElement("div");
    modal_container.setAttribute("class","modal-container");
    body.appendChild(modal_container);
    
    let modal = document.createElement("div");
    modal.setAttribute("class","modal");
    modal_container.appendChild(modal);

    let button = document.createElement("button");
    button.setAttribute("type","button");
    button.setAttribute("id","modal-close-btn");
    button.setAttribute("class","modal-close-btn");
    button.innerHTML = "<strong>X</strong>";
    button.addEventListener("click",closeModal);
    modal.appendChild(button);

    let modal_info = document.createElement("div");
    modal_info.setAttribute("class","modal-info-container");

    const modal_html = `
        <img class="modal-img" src="${data.picture.large}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
        <p class="modal-text">${data.email}</p>
        <p class="modal-text cap">${data.location.city}</p>
        <hr>
        <p class="modal-text">${data.phone}</p>
        <p class="modal-text">${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.location.state} ${data.location.postcode}</p>
        <p class="modal-text">Birthday: ${changeDateFormat(data.dob.date)}</p>`;

    modal_info.innerHTML = modal_html;
    modal.appendChild(modal_info);

    let modal_btn = document.createElement("div");
    modal_btn.setAttribute("class","modal-btn-container");
    modal_container.appendChild(modal_btn);

    let prev_button = document.createElement("button");
    prev_button.setAttribute("type","button");
    prev_button.setAttribute("id","modal-prev");
    prev_button.setAttribute("class","modal-prev btn");
    prev_button.innerHTML = "Prev";
    prev_button.addEventListener("click",previousCard);
    modal_btn.appendChild(prev_button);

    let next_button = document.createElement("button");
    next_button.setAttribute("type","button");
    next_button.setAttribute("id","modal-next");
    next_button.setAttribute("class","modal-next btn");
    next_button.innerHTML = "Next";
    next_button.addEventListener("click",nextCard);
    modal_btn.appendChild(next_button);
}

displayUsers();
document.querySelector('.search-submit').addEventListener("click",searchName);
