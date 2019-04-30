function viewMyPetsLength(pets) {
    let mySection = $('#my-pets');
    mySection.empty();
    mySection.append($('<h1>My Pets</h1>'));

    let ul = $('<ul class="my-pets-list">');
    let section = $('<section class="myPet">');

    for (let pet of pets) {
         //console.log(pet);
        let h3 = $(`<h3>Name: ${pet.name}</h3>`);
        let para = $(`<p>Category: ${pet.category}</p>`);
        let pImage = $(`<p class="img"><img src=${pet.imageURL}></p>`);
        let p2 = $(`<p class="description">${pet.description}</p>`);

        let div = $(`<div class="pet-info">`);
        div.append($(`<a href="#"><button class="button">Details</button></a>`).on('click', function () {
            editDetailsMyPet(pet, pet._id)
        }));
        div.append($(`<a href="#"><button class="button">Delete</button></a>`).on('click', function () {
           let id = pet._id;
            deleteMyPet(id);
        }));
        div.append($(`<i class="fas fa-heart"></i> <span>5</span>`));
        section.append(h3, para, pImage, p2, div);
        ul.append(section);
    }
    mySection.append(ul);
    mySection.show();
}

function deleteMyPet(id) {
    kinvyRequester.removeMyPet(id);
}

function editDetailsMyPet(pet, id) {
    $('#my-pets').hide();
    $('#detailsMyPet').empty();

    let main = $('#detailsMyPet');
    let h3 = $(`<h3>${pet.name}</h3>`);
    let pLike = $(`<p>Pet counter: <i class="fas fa-heart"></i> 6</p>`);
    let pImage = $(`<p class="img"><img src=${pet.imageURL}></p>`);

    let form = $(`<form action="#" id="form" method="POST">`);
    form.append($(`<textarea type="text" name="description">${pet.description}</textarea>`));
    let button = $(`<button class="button"> Save</button>`).on('click', function (event) {
        event.preventDefault();
        saveEdit(pet, pet._id)
    });
    form.append(button);
    main.append(h3, pLike, pImage, form);
    main.show();

}

function saveEdit(pet, id) {
    let description = $("#detailsMyPet textarea[name='description']").val();
    let name = pet.name;
    let imageURL = pet.imageURL;
    let category = pet.category;

    //let likes = pet.likes;
    //     if (likes === undefined) {
    //         likes = 0;
    //     }
    //     // console.log(description);
   // $("#first-barId a:eq(1)").trigger('click');
   kinvyRequester.putMyPet(id, description, name, imageURL, category)

}
