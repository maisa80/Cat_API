/**Cat API https://docs.thecatapi.com/
 * Paginating through Search results:
 *This Example requests https://api.thecatapi.com/v1/images/search?limit=3&page=100&order=DESC
 *Breed Selection
 *It populates the Select Dropdown with https://api.thecatapi.com/v1/breeds
 *Requests a new Image with https://api.thecatapi.com/images/search?breed_id={{selected_breed.id}} when you change Breed
 */
let previousBtn = document.getElementById('previous');
let nextBtn = document.getElementById('next');
let image = document.getElementById('image');
let list = document.getElementById('list');
let content = document.getElementById('content');
let more = document.getElementById('more');
let details = document.getElementById('details');
let catImage = document.getElementById('catImage');
let limitList = document.getElementById('limit');
let number = 0;
let selectedLimit = limitList.value;



fetchData();
fetchAllData(selectedLimit, number);


var limitOptions = limitList.querySelectorAll("#limit option");
limitList.addEventListener('change', function (e) {
  e.preventDefault();
  catImage.innerHTML = ''
  selectedLimit = limitList.value;
  fetchAllData(selectedLimit, number);
});
nextBtn.addEventListener('click', function (e) {
  e.preventDefault();
  catImage.innerHTML = ''
  number = number + 1;
  console.log(number);
  if (number > 10) number = 0;
  console.log(number);

  fetchAllData(selectedLimit, number);
})
previousBtn.addEventListener('click', function (e) {
  e.preventDefault();
  catImage.innerHTML = ''
  number = number - 1;
  console.log(number);
  if (number < 0) number = 10;
  console.log(number);

//   fetchAllData(selectedLimit, number);
})


async function fetchData(e) {

  try {
    let response = await fetch('https://api.thecatapi.com/v1/breeds')

    if (!response.ok) {
      throw new Error('Something went wrong with the server');
    }

    let breeds = await response.json();


    let optionItemsHTML = `<option>Select a breed</option>`;


    for (let breed of breeds) {


      optionItemsHTML += `<option id=${breed.id}>${breed.name}</option>`

     
    }


    list.innerHTML = optionItemsHTML;
  
    list.addEventListener('change', function () {

      var options = list.querySelectorAll("#list option");

      for (let option of options) {
        var selectedBreedId = option.id;
        details.className = 'show';
        if (list.value !== 'Select a breed') {
          if (list.value === option.value) {

            fetchDataByBreedId(selectedBreedId);
           
            
          }
        }
        else {
          details.innerHTML = '';
          details.className = 'hide';
        }


      }

    });


  } catch (error) {
    console.log(error);
  }
}

async function fetchAllData(selectedLimit, number) {

    try {
      let URL = `https://api.thecatapi.com/v1/images/search?limit=${selectedLimit}&page=${number}`;
      let response = await fetch(URL, {
        method: "GET",
        headers: {
          'x-api-key': '93c56b63-d3ca-4ebd-905e-7a0df717877f'
        }
      })
      console.log(URL);
      if (!response.ok) {
        throw new Error('Something went wrong with the server');
      }
  
      let catsImageUrl = ''
      let pages = await response.json();
  
      for (let page of pages) {
  
        catsImageUrl = page.url;
        catImage.innerHTML += `
    
        <div class="col-lg-3 col-md-4 col-6">
        
          <a href="#" class="d-block mb-4 h-100">
            <img class="img-thumbnail rounded " src="${catsImageUrl}" alt="">
          </a>
        </div>
        
        `
  
      }
  
  
  
  
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchDataByBreedId(selectedBreedId) {
  
   
    try {
      let response = await fetch('https://api.thecatapi.com/v1/breeds/' + selectedBreedId, {
        method: "GET",
        withCredentials: true,
        headers: {
          'X-Api-Key': '93c56b63-d3ca-4ebd-905e-7a0df717877f'
        }
      })
  
      if (!response.ok) {
        throw new Error('Something went wrong with the server');
      }
  
      let breeds = await response.json();
  
      let HTMLContent = ''
      HTMLContent += `
  
      <a href="#" class="d-block mb-4 h-100" ><h3 id=${breeds.id}>${breeds.name}</h3></a>
        <i><b>Origin: </b>${breeds.origin}</i>
        <i class="left-indent"><b>Temperament: </b>${breeds.temperament}</i>  
        <hr class="mt-1 mb-3">
  
  
  `
  
  
      details.innerHTML = HTMLContent;
      let title = document.querySelector('#details a h3 ');
  
      title.addEventListener('click', function (e) {
        e.preventDefault();
        let theClickedPostLink = e.target;
        selectedBreedId = theClickedPostLink.id;
        // console.log(selectedBreedId);
        let moreContent = theClickedPostLink.parentNode.parentNode.parentNode.nextElementSibling;
        // console.log(moreContent);
        fetchDataByBreedId(selectedBreedId);
  
  
        moreContent.innerHTML = `
          <p><b>Description:</b> ${breeds.description}</p>
          <p id="rating">${getAdaptability(breeds.adaptability)}</p>
          <p id="rating">${getGrooming(breeds.grooming)}</p>
          <p id="rating">${getIndoor(breeds.indoor)}</p>
         
       `
        moreContent.classList.toggle('show');
      })
    }
  
  
    catch (error) {
      console.log(error);
    }
  }
  
  function getAdaptability(adaptability) {
    switch (adaptability) {
      case 0:
  
        return `Adaptability<br><span class="rating-static rating-10"></span>`;
        break;
      case 1:
        return `Adaptability<br><span class="rating-static rating-10"></span>`;
  
        break;
      case 2:
        return `Adaptability:<span class="rating-static rating-20"></span>`;
  
        break;
      case 3:
        return `Adaptability:<span class="rating-static rating-30"></span>`;
  
        break;
      case 4:
        return `Adaptability:<span class="rating-static rating-40"></span>`;
  
        break;
      case 5:
        return `Adaptability: <span class="rating-static rating-50"></span>`;
  
        break;
      default:
      // code block
    }
  
  
  }
  function getGrooming(grooming) {
    switch (grooming) {
      case 0:
  
        return `Grooming: <span class="rating-static rating-0"></span>`;
        break;
      case 1:
  
        return `Grooming: <span class="rating-static rating-10"></span>`;
        break;
      case 2:
  
        return `Grooming: <span class="rating-static rating-20"></span>`;
        break;
      case 3:
  
        return `Grooming: <span class="rating-static rating-30"></span>`;
        break;
      case 4:
  
        return `Grooming: <span class="rating-static rating-40"></span>`;
        break;
      case 5:
        return `Grooming: <span class="rating-static rating-50"></span>`;
        break;
      default:
      // code block
    }
  }
  function getIndoor(indoor) {
    switch (indoor) {
      case 0:
  
        return `Indoor: <span class="rating-static rating-0"></span>`;
        break;
      case 1:
  
        return `Indoor: <span class="rating-static rating-10"></span>`;
        break;
      case 2:
  
        return `Indoor: <span class="rating-static rating-20"></span>`;
        break;
      case 3:
  
        return `Indoor: <span class="rating-static rating-30"></span>`;
        break;
      case 4:
  
        return `Indoor: <span class="rating-static rating-40"></span>`;
        break;
      case 5:
        return `Indoor: <span class="rating-static rating-50"></span>`;
        break;
      default:
      // code block
    }
  }