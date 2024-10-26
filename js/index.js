
/////////////////////////validations//////////////////////////////
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let passRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
let nameRegex = /^[a-zA-Z\s*]+$/;
let ageRegex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|120)$/;
let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

 


async function getMeal(){
    let mResponse = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s');
    let meals = await mResponse.json();
    console.log(meals);
    return meals;
}

async function getMealName(name){
    let mNResponse = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+name);
    let mealsN = await mNResponse.json();
    console.log(mealsN);
    return mealsN;
}



async function getCat(){
    let cResponse = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let cats = await cResponse.json();
    console.log(cats)
    return cats;
}


async function getArea(){
    let aResponse = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    let area = await aResponse.json();
    console.log(area)
    return area;
}

async function getFirstLitter(){
    let fResponse = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=f');
    let fLitter = await fResponse.json();
    console.log(fLitter)
}


async function getIngredients(){
    let iResponse = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    let ingredients = await iResponse.json();
    console.log(ingredients)
    return ingredients;
}

async function getApis(){
  await getMeal();
  await getArea();
  await getCat();
  await getIngredients();
  await getFirstLitter();
  getMealName();
}

getApis();


let elementW =  $('#sideNavBar').outerWidth(true);
console.log($('#navIcon'));
let navTop = $('#sideNavBar ul').css('top');
console.log(navTop);
$('#sideNavBar').css('left','-'+ elementW);


//open//////////////////////
$('#open').click(function open(){

    if($('#slideNavBar').css('left')=='0px'){
        $('#slideNavBar').animate({left: elementW});
        $('#sideNavBar').animate({left: '0px'});
        $('#navIcon').html(`<i class="fa-solid fa-xmark text-black"></i>`);
        
        for(let i =1 ; i<=5 ; i++){
          $('#nav'+i).animate({top: "-"+navTop},(i+5)*100)

        }

    }
    else{
      

        $('#slideNavBar').animate({left: '0px'});
        $('#sideNavBar').animate({left: '-'+elementW});
        $('#navIcon').html(`<i class="fa-solid fa-bars text-black"></i> `);

        for(let i =1 ; i<=5 ; i++){
          $('#nav'+i).animate({top: "0px"},(i+5)*100)

        }
    }


})


//close
$('#closeNav').click(function (){

    
        $('#slideNavBar').animate({left: '0px'});
        $('#sideNavBar').animate({left: '-'+elementW});
  $('#navIcon').html(`<i class="fa-solid fa-bars text-black"></i> `);

    })




function closeNav(){
  $('#slideNavBar').animate({left: '0px'});
  $('#sideNavBar').animate({left: '-'+elementW});
  $('#navIcon').html(`<i class="fa-solid fa-bars text-black"></i> `);


}






////////////////////////////////display meals////////////////////////////////////////


$(document).ready(function(){


  $('#searchB').slideDown(500);




  async function displayMeals(){
      let mealsData = await getMeal();
      let mealsDis = '';
      
      for(let i = 0 ; i< mealsData.meals.length;i++ ){
         mealsDis+=` <div class="col-md-3">
         <div onclick="displayMealDetails(`+ mealsData.meals[i].idMeal+`)"  class="rounded-3  overflow-hidden  mealCard position-relative">
           <img src="`+mealsData.meals[i].strMealThumb +`" class="img-fluid" alt="">
         <div class="caption d-flex align-items-center justify-content-start  p-3 ">
           <p class="">`+ mealsData.meals[i].strMeal +`</p>
         </div>
 
         </div>
       </div>`
          
      }
      $('#meal').html(mealsDis);
      $('#loadScreen').fadeOut(500,function(){$('#loadScreen').css('display' , 'none')} );
      $('body').css('overflow' , 'visible');
  }
  displayMeals();




})











// search by Name

function hideSection(){
  $('section').addClass('d-none');
}


function searchF(){
  $('#searchLoadScreen').css('display' , 'flex');


    $('#view').html(` 
    
    <div id="varContent" class="bg-black overflow-auto">
    <div div id="" class=" container bg-black justify-content-center   py-4 ">
    <div class="row g-3">

      <div class="col-md-6">
        <input type="text" placeholder="Search By Name"  class="form-control bg-black search text-white" id="searchN" onkeyup="searchByName()">

      </div>
      <div class="col-md-6">
    <input type="text" placeholder="Search By First Letter" class="form-control bg-black search text-white mb-4" id="searchL" maxlength="1" onkeyup="searchByLetter()">

      </div>
    </div>

    <div class="row g-3 mt-4" id="mealSearch">


  </div>
  </div>
    </div>
    `)
  $('#view').addClass('bg-black');
  $('#searchLoadScreen').fadeOut(500,function(){$('#searchLoadScreen').css('display' , 'none')} );

  
    
  

    
}

async function searchByName(){
  $('#searchLoadScreen').css('display' , 'flex');

let searchN = document.getElementById('searchN');

    let searchNInput = searchN.value;
   let mealNameData = await getMealName(searchNInput);
   
    if(mealNameData.meals!=null){

        console.log(mealNameData);
        let mealsNDis = '';
        for(let i = 0 ; i< mealNameData.meals.length;i++ ){
            mealsNDis +=` <div class="col-md-3">
            <div onclick="displayMealDetails(`+ mealNameData.meals[i].idMeal+`)"  class="rounded-3  overflow-hidden  mealCard position-relative">
              <img src="`+mealNameData.meals[i].strMealThumb +`" class="img-fluid" alt="">
            <div class="caption d-flex align-items-center justify-content-start  p-3 ">
              <p class="">`+ mealNameData.meals[i].strMeal +`</p>
            </div>
    
            </div>
          </div>`
             
         }
         $('#mealSearch').html(mealsNDis);
         $('#searchLoadScreen').fadeOut(500,function(){$('#searchLoadScreen').css('display' , 'none')} );

    }

 

}




async function searchByLetter(){
  $('#searchLoadScreen').css('display' , 'flex');

let searchL = document.getElementById('searchL');

    let searchLInput = searchL.value;
   let mealLetterData = await getMealName(searchLInput);
   
    if(mealLetterData.meals!=null){

        console.log(mealLetterData);
        let mealsLDis = '';
        for(let i = 0 ; i< mealLetterData.meals.length;i++ ){
            mealsLDis +=` <div class="col-md-3">
            <div onclick="displayMealDetails(`+ mealLetterData.meals[i].idMeal+`)"  class="rounded-3  overflow-hidden  mealCard position-relative">
              <img src="`+mealLetterData.meals[i].strMealThumb +`" class="img-fluid" alt="">
            <div class="caption d-flex align-items-center justify-content-start  p-3 ">
              <p class="">`+ mealLetterData.meals[i].strMeal +`</p>
            </div>
    
            </div>
          </div>`
             
         }
         $('#mealSearch').html(mealsLDis); 
         $('#searchLoadScreen').fadeOut(500,function(){$('#searchLoadScreen').css('display' , 'none')} );

         
    }

 

}



//display  Details



async function displayMealDetails(i){

  $('#loadScreen').css('display' , 'flex');

  
    console.log(i)
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+i)
    response= await response.json();
    console.log(response);



    let ingredientsCont = '';
    let tags = [];
    if(response.meals[0].strTags==null){tags=[];} 
   else{
    tags = response.meals[0].strTags.split(',');
   }  
    let tagsContent = '';
    console.log(tags);
    for(let i = 1 ; i <= 20 ; i++){

        if(response.meals[0][`strIngredient${i}`]!=""&&response.meals[0][`strIngredient${i}`]!=null &&response.meals[0][`strIngredient${i}`]!=undefined)
        {
            ingredientsCont+=`<div class="ingredient mb-3 p-1 ">${response.meals[0][`strMeasure${i}`]}${response.meals[0][`strIngredient${i}`]}</div>` 

        }
       
    }


    for(let i = 0 ; i < tags.length ; i++){

        if(tags[i]!=""&&tags[i]!=null &&tags[i]!=undefined)
        {
            tagsContent+=` <p class="tag p-1"> ${tags[i]}</p>` 

        }
       
    }

console.log(tagsContent);


    $('#view').html(`
    <div class="container mx-auto px-5">
    <div class="row g-3">
      <div class="col-md-4 ">
        <div class="rounded-3 overflow-hidden  ">
          <img src="`+ response.meals[0].strMealThumb+`" class="img-fluid" alt="">
          

        </div>
        <h2 class="text-white text-start mt-3"> `+ response.meals[0].strMeal+ `</h2>
      </div>
      <div class="col-md-8">
        <div class="d-flex flex-column gap-2 align-items-start instructions">
          <h2 class="text-white">Instructions</h2>
          <p class="text-start text-white">`+ response.meals[0].strInstructions+`</p>
            <h2 class="text-white">Area : `+ response.meals[0].strArea+`</h2>
            <h2 class="text-white">Category : `+response.meals[0].strCategory +`</h2>
            <h2 class="text-white ">Recipes :</h2>

            <div class="d-flex flex-wrap gap-2 " >`
            + ingredientsCont+`
              


            </div>
            <h2 class="text-white">Tags :</h2>
            
            <div class="d-flex gap-2">
            `+tagsContent+`
            </div>
            
        <div class="d-flex gap-2">

        <button onclick="javascript:window.open('`+response.meals[0].strSource +`', '_blank');" class="btn btn-success p-1"> Source</button>
        <button onclick="javascript:window.open('`+response.meals[0].strYoutube +`', '_blank');" class="btn btn-danger p-1"> Youtube</button>
        </div>

        
        </div>
      </div>

    </div>
  </div>`)

  $('#meal').addClass('d-none');

  $('#loadScreen').fadeOut(500,function(){$('#loadScreen').css('display' , 'none')} );


}

//display categorries

async function displayCat(){
  $('#loadScreen').css('display' , 'flex');



  $('#view').html(`<div  id="varContent" class="bg-black overflow-auto">
  <div class="container ">
    <div id="catSearch" class="row g-3 py-4 " >
      
  </div>

  </div>

 </div>`)

let catData = await getCat();
console.log(catData);
display(catData);

}


function display(arr){
  let content = '';

  for(i=0 ; i<arr.categories.length ; i++){

let discription = arr.categories[i].strCategoryDescription.split(' ');
discription = discription.slice(0,10);
discription = discription.join(' ');


content +=`<div class="col-md-3  ">
<div onclick="DisplayCatMeals('`+arr.categories[i].strCategory +`')" class="rounded-3 overflow-hidden  mealCard position-relative">
  <img src="`+ arr.categories[i].strCategoryThumb+`" class="w-100" alt="">



<div class="caption d-flex flex-column align-items-center justify-content-start gap-0  p-1 ">
  <p class=" mb-0">`+arr.categories[i].strCategory+`</p>

  <p class="text-center fs-6 fw-light">`+discription +`</p>
</div>

</div>
</div>

</div>`


  }



$('#catSearch').html(content);
$('#loadScreen').fadeOut(500,function(){$('#loadScreen').css('display' , 'none')} );


}

// Display Catigory 
async function DisplayCatMeals(arr){  
  $('#loadScreen').css('display' , 'flex');


  
  let response = (await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c='+arr));
  response = await response.json();
  console.log(response);
  let content = '';
  for(let i = 0 ; i< response.meals.length;i++ ){
    content+=` <div class="col-md-3">
    <div onclick="displayMealDetails(`+ response.meals[i].idMeal+`)"  class="rounded-3  overflow-hidden  mealCard position-relative">
      <img src="`+response.meals[i].strMealThumb +`" class="w-100" alt="">
    <div class="caption d-flex align-items-center justify-content-start   p-3 ">
      <p class="">`+ response.meals[i].strMeal +`</p>
    </div>

    </div>
  </div>`
     
 }
 $('#catSearch').html(content);
 $('#loadScreen').fadeOut(500,function(){$('#loadScreen').css('display' , 'none')} );

}


//display 

async function displayArea(){
  $('#loadScreen').css('display' , 'flex');


  $('#view').html(`<div  id="varContent" class="bg-black overflow-auto">
  <div class="container ">
    <div id="catSearch" class="row g-3 py-4 " >

      
      
  </div>
  </div>
  

 </div>`)

let areaData = await getArea();

let content = '';

  for(i=0 ; i<areaData.meals.length ; i++){




content +=`<div class="col-md-3">
<div onclick="displayAreaMeals('${areaData.meals[i].strArea}')" class="d-flex pointer flex-column justify-content-center align-items-center areaCard">
  <i class="fa-solid fa-house-laptop"></i>
  <p>`+areaData.meals[i].strArea+`</p>

</div>
</div>
`


  }


$('#catSearch').html(content);
$('#loadScreen').fadeOut(500,function(){$('#loadScreen').css('display' , 'none')} );



}
//Display Area 

async function displayAreaMeals(arr){
  $('#loadScreen').css('display' , 'flex');

  
  let response = (await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a='+arr));
  response = await response.json();
  let content = '';
  for(let i = 0 ; i< response.meals.length;i++ ){
    content+=` <div class="col-md-3">
    <div onclick="displayMealDetails(`+ response.meals[i].idMeal+`)"  class="rounded-3  overflow-hidden  mealCard position-relative">
      <img src="`+response.meals[i].strMealThumb +`" class="img-fluid" alt="">
    <div class="caption d-flex align-items-center justify-content-start  p-3 ">
      <p class="">`+ response.meals[i].strMeal +`</p>
    </div>

    </div>
  </div>`
     
 }
 $('#catSearch').html(content);
 $('#loadScreen').fadeOut(500,function(){$('#loadScreen').css('display' , 'none')} );

}
//display ingredients



async function displayingredients(){

  $('#loadScreen').css('display' , 'flex');


  $('#view').html(`<div  id="varContent" class="bg-black overflow-auto">
  <div class="container ">
    <div id="catSearch" class="row g-3 py-4 " >

      
      
  </div>
  </div>
  

 </div>`)



let ingredientsData = await getIngredients();
console.log(ingredientsData);


let content = '';

  for(i=0 ; i<24 ; i++){

    let discription = ingredientsData.meals[i].strDescription.split(' ');
discription = discription.slice(0,10);
discription = discription.join(' ');

content +=`<div class="col-md-3">
<div onclick="displayIngredientsMeals('${ingredientsData.meals[i].strIngredient}')" class="d-flex pointer flex-column justify-content-center align-items-center areaCard">
  <i class="fa-solid fa-house-laptop"></i>
  <p>`+ingredientsData.meals[i].strIngredient+`</p>
  <p class="text-center fs-5 fw-light">`+discription +`</p>

</div>
</div>
`


  }


$('#catSearch').html(content);
$('#loadScreen').fadeOut(500,function(){$('#loadScreen').css('display' , 'none')} );



}
//display ingredients meals

async function displayIngredientsMeals(arr){
  $('#loadScreen').css('display' , 'flex');

  arr = arr.split(' ');
  arr = arr.join('_');
  console.log(arr);
  let response = (await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i='+arr));
  response = await response.json();
  let content = '';
   for(let i = 0 ; i< response.meals.length;i++ ){
     content+=` <div class="col-md-3">
     <div onclick="displayMealDetails(`+ response.meals[i].idMeal+`)"  class=" overflow-hidden rounded-3    mealCard position-relative">
       <img src="`+response.meals[i].strMealThumb +`" class="img-fluid" alt="">
     <div class="caption d-flex justify-content-start align-items-center   p-3 ">
       <p class="">`+ response.meals[i].strMeal +`</p>
     </div>

     </div>
   </div>`
     
  }
  $('#catSearch').html(content);

  $('#loadScreen').fadeOut(500,function(){$('#loadScreen').css('display' , 'none')} );

}
//contact

function openContact(){
  $('#view').html(`<div id="varContent" class="bg-black overflow-x-hidden overflow-auto  d-flex align-items-center">

        
  <div id="" class=" container  bg-black py-4 justify-content-center align-items-center w-50   ">
    
    <div class="row g-4">

      <div class="col-md-6">
        <input onfocus="inName()" type="text" onkeyup=" validation()" id="uName"  placeholder="Enter Your Name"  class="form-control bg-white text-black" >

        <div class="alert alert-danger d-none mt-2">      
        Enter valid name*
      </div>

      </div>
      <div class="col-md-6">
    <input onfocus="inEmail()" type="email" onkeyup=" validation()" id="uEmail" placeholder="Enter Your Email" class="form-control bg-white  text-black "   >

    <div class="alert alert-danger d-none mt-2">      
    Email not valid *exemple@yyy.zzz
      </div>
  </div>
    <div class="col-md-6">
        <input onfocus="inPhone()" type="tel" id="uPhone" onkeyup=" validation()" placeholder="Enter Your Phone"  class="form-control bg-white text-black" >

        <div class="alert alert-danger d-none mt-2">      
        Enter valid phone number*
      </div>

      </div>
      <div class="col-md-6">
    <input onfocus="inAge()" type="number" id="uAge" onkeyup=" validation()" placeholder="Enter Your Age" class="form-control bg-white  text-black "   >

    <div class="alert alert-danger d-none mt-2">      
        Enter valid age*
      </div>
  </div>
    <div class="col-md-6">
        <input onfocus="inPass()" type="password" id="uPass" onkeyup=" validation()" placeholder="Enter Your Password"  class="form-control bg-white text-black" >
        <div class="alert alert-danger d-none mt-2">      
        Enter valid password *Minimum eight characters, at least one letter, number and one special character :*
      </div>
      </div>
      <div class="col-md-6">
    <input onfocus="inRePass()" type="password" id="uRePass" onkeyup=" validation()" placeholder="Repassword" class="form-control bg-white  text-black"   >

    <div class="alert alert-danger d-none mt-2">      
        Enter the same password*
      </div>
  </div>


      </div>
      <button  onclick="clearInputs()"  class=" btn btn-outline-danger align-self-center px-2  mt-3" id="submit" >Submit</button>




</div>

<div class="row g-3" id="mealSearch">


</div>
</div>
</div>  
</div>`)

let uPhone = document.getElementById('uPhone');
let uAge = document.getElementById('uAge');
let uName = document.getElementById('uName');
let uEmail = document.getElementById('uEmail');
let uPass = document.getElementById('uPass');
let uRePass = document.getElementById('uRePass');
}


let nameStatus = false;
let emailStatus = false;
let ageStatus = false;
let phoneStatus = false;
let passStatus = false;
let rePassStatus = false;


function inName(){
  nameStatus = true;
  return nameStatus;
}


function inEmail(){
  emailStatus = true;
  return emailStatus;
}
function inPhone(){
  phoneStatus = true;
  return phoneStatus;
}
function inAge(){
  ageStatus = true;
  return ageStatus;
}
function inPass(){
  passStatus = true;
  return passStatus;
}
function inRePass(){
  rePassStatus = true;
  return rePassStatus;
}


function validation(){
  if(nameStatus){
    if(nameRegex.test(uName.value)){
      document.querySelector("#uName + div").classList.replace("d-block", "d-none");
    }
    else{
      document.querySelector("#uName + div").classList.replace("d-none", "d-block");
    
    }
  }

if(emailStatus){
  if(emailRegex.test(uEmail.value)){
    document.querySelector("#uEmail + div").classList.replace("d-block", "d-none");
  }
  else{
    document.querySelector("#uEmail + div").classList.replace("d-none", "d-block");
  
  }
}
if(phoneStatus){
  if(phoneRegex.test(uPhone.value)){
    document.querySelector("#uPhone + div").classList.replace("d-block", "d-none");
  }
  else{
    document.querySelector("#uPhone + div").classList.replace("d-none", "d-block");
  
  }
}

if(ageStatus){
  if(ageRegex.test(uAge.value)){
    document.querySelector("#uAge + div").classList.replace("d-block", "d-none");
  }
  else{
    document.querySelector("#uAge + div").classList.replace("d-none", "d-block");
  
  }
}

if(passStatus){
  if(passRegex.test(uPass.value)){
    document.querySelector("#uPass + div").classList.replace("d-block", "d-none");
  }
  else{
    document.querySelector("#uPass + div").classList.replace("d-none", "d-block");
  
  }
}

if(rePassStatus){
  if(uPass.value == uRePass.value){
    document.querySelector("#uRePass + div").classList.replace("d-block", "d-none");
  }
  else{
    document.querySelector("#uRePass + div").classList.replace("d-none", "d-block");
  
  }
}

if(passRegex.test(uPass.value) &&uPass.value == uRePass.value && ageRegex.test(uAge.value) && phoneRegex.test(uPhone.value) && emailRegex.test(uEmail.value) &&nameRegex.test(uName.value)  ){

  $('#submit').removeAttr('disabled');
}


}

function clearInputs() { 

   document.getElementById('uName').value = null;
   document.getElementById('uEmail').value = null;
   document.getElementById('uPhone').value = null;
   document.getElementById('uAge').value = null;
   document.getElementById('uPass').value = null;
   document.getElementById('uRePass').value = null;
}

