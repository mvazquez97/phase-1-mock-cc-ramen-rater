document.addEventListener("DOMContentLoaded", () => {
    displayRamens();
    addSubmitListener();
})


function displayRamens() {
    
    fetch("http://localhost:3000/ramens")
        .then(res => res.json())
        
        .then(ramens => {
            ramens.forEach(ramen => renderOneRamen(ramen))
            
            showRamenDetails(ramens[0]);
        })
}


function addSubmitListener() {
    const ramenForm = document.getElementById("new-ramen");

    ramenForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addNewRamen();
        ramenForm.reset();
    })
}


function renderOneRamen(ramen) {
    
    const ramenImg = document.createElement("img");
    const ramenDiv = document.createElement("div");
    const ramenMenu = document.getElementById("ramen-menu");
    
 
    ramenImg.src = ramen.image;

   
    ramenMenu.append(ramenDiv);
    ramenDiv.append(ramenImg);


    ramenImg.addEventListener("click", () => showRamenDetails(ramen));

  
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.className = "delete-btn";
    ramenDiv.append(deleteButton);

    
    deleteButton.addEventListener("click", () => deleteRamen(ramen.id, ramenDiv))
}


function showRamenDetails(ramen) {
    
    const detailImage = document.getElementById("detail-image");
    const detailName = document.getElementById("detail-name");
    const detailRestaurant = document.getElementById("detail-restaurant");
    const detailRating = document.getElementById("detail-rating");
    const detailComment = document.getElementById("detail-comment");


    
    detailImage.src = ramen.image;
    detailName.textContent = ramen.name;
    detailRestaurant.textContent = ramen.restaurant;
    detailRating.textContent = ramen.rating;
    detailComment.textContent = ramen.comment;
}   


function addNewRamen() {
   
    const newName = document.getElementById("new-name").value;
    const newRestaurant = document.getElementById("new-restaurant").value;
    const newImage = document.getElementById("new-image").value;
    const newRating = document.getElementById("new-rating").value;
    const newComment = document.getElementById("new-comment").value;

    const newRamen = {
        "name": newName,
        "restaurant": newRestaurant,
        "image": newImage,
        "rating": newRating,
        "comment": newComment
    }
    
    fetch("http://localhost:3000/ramens", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRamen)
    })

    
    renderOneRamen(newRamen);

    
    showRamenDetails(newRamen);
}


function deleteRamen(id, ramenDiv) {
    
    fetch(`http://localhost:3000/ramens/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    
    ramenDiv.remove();

    
    const placeholderInfo = {
        "name": "Click a ramen!",
        "restaurant": ":3",
        "image": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Wn3NuoGzrYA99hHdlJPyqgHaGH%26pid%3DApi&f=1&ipt=eed45238f4853904989af4839e855d4e6fe2094fd1b7640d14dd66bdb6a301da&ipo=images",
        "rating": "Select a ramen to display its rating!",
        "comment": "Same deal."
    }

    showRamenDetails(placeholderInfo);
}