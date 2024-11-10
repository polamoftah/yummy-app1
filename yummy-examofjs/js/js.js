let rowdata=document.getElementById("rowdata");
letsearchcontainrer=document.getElementById("searchcontainrer")
let subbtn=document.getElementById("subbtn");

$(document).ready(() => {
   searchbyname("").then(()=>{
      $(".loading-screen").fadeOut(500);
      $("body").css("overflow","visible");
   })

});


function openslide(){
   $(".side-nav-menue").animate({left:0 },500);
   $(".open-close").removeClass("fa-x");
   $(".open-close").addClass("fa-align-justify ");
}

function closeslide(){
   let boxwidth=$(".side-nav-menue .nav-tab").outerWidth()
   $(".side-nav-menue").animate({left:-boxwidth},500);
   $(".open-close").removeClass("fa-align-justify");
   $(".open-close").addClass("fa-x");
   $(".list li").animate({top:300},500);
}
closeslide()
$("i.open-close ").on("click",function(){
 
  if($(".side-nav-menue").css("left")=="0px"){
   closeslide()
   
  }else{
   openslide()
   for(let i=0;i<5;i++){
      $(".list li").eq(i).animate({top:0},(i+5)*100);
   }
 

  }
 
})


function displaymeals(arr){
let cartona="";
for(let i=0;i<arr.length;i++){
   cartona+=`
   
    <div class="col-md-3">
            <div onclick="getmealditails('${arr[i].idMeal}')" class="mael position-relative overflow-hidden rounded-2 cursole-pointer">
                <img class="w-100 " src="${arr[i].strMealThumb}" alt="">
                <div class="mael-layer position-absolute d-flex align-items-center">
                    <h3 class="text-black">${arr[i].strMeal}</h3>
                </div>
            </div>
        </div>
   
   `
}
rowdata.innerHTML=cartona;
}
async function getCategory() {
   searchcontainrer.innerHTML="";
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
   response = await response.json();
   console.log(response.categories);
   
   displaycatygory(response.categories);
}

function displaycatygory(arr){
   let cartona="";
   for(let i=0;i<arr.length;i++){
      cartona+=`
      
       <div class="col-md-3 ">
               <div onclick="getcatygorymeal('${arr[i].strCategory}')" class="mael position-relative overflow-hidden rounded-2 cursole-pointer">
                   <img class="w-100 " src="${arr[i].strCategoryThumb}" alt="">
                   <div class="mael-layer position-absolute text-center">
                       <h3 class="text-black">${arr[i].strCategory}</h3>
                       <p>${arr[i].strCategoryDescription.substring(0,220)}</p>
                   </div>
               </div>
           </div>
      
      `
   }
   rowdata.innerHTML=cartona;
   }
async function getarea(){
   searchcontainrer.innerHTML="";
   let response=await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
   response =await response.json();
   console.log(response.meals);
   
   displayarea(response.meals)
}
function displayarea(arr){
   let cartona="";
   for(let i=0;i<arr.length;i++){
      cartona+=`
      
       <div class="col-md-3">
               <div onclick="getareameal('${arr[i].strArea}')" class="rounded-2 cursole-pointer">
                 <i class="fa-solid fa-house"></i>
                
                       <h3 class="">${arr[i].strArea}</h3>
                     
                   
               </div>
           </div>
      
      `
   }
   rowdata.innerHTML=cartona;
}
async function getIngredients(){
   searchcontainrer.innerHTML="";
   let response=await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
   response =await response.json();
   console.log(response.meals);
   
   displayIngredients(response.meals.slice(0,20))
}
function displayIngredients(arr){
   let cartona="";
   for(let i=0;i<arr.length;i++){
      cartona+=`
      
       <div class="col-md-3">
               <div onclick="getIngredientsmeal('${arr[i].strIngredient}')" class="rounded-2 text-center cursole-pointer">
                 <i class="fa-solid fa-cheese fa-3x"></i>
                
                       <h3 class="">${arr[i].strIngredient}</h3>
                     
                   <p class="text-center"> ${arr[i].strDescription.substring(0,220)}</p>
               </div>
           </div>
      
      `
   }
   rowdata.innerHTML=cartona;
}
async function getcatygorymeal(categories){
let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories}`);
response=await response.json();
console.log(response);
displaymeals(response.meals.slice(0,20))
}
async function getareameal(area){
   let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
   response=await response.json();
   console.log(response);
   displaymeals(response.meals.slice(0,20))
   }
   async function getIngredientsmeal(ingredients){
      let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
      response=await response.json();
      console.log(response);
      displaymeals(response.meals.slice(0,20))
      }
      

 async function getmealditails(mealId){
   searchcontainrer.innerHTML=""
   let response=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
   response= await response.json();
 
   displaymealditails(response.meals[0])
}

 function displaymealditails(meal) {
   searchcontainrer.innerHTML="";
   let ingridians = ``;

   for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
         ingridians += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
      }
   }



      let tags = meal.strTags?.split(",");
      if(!tags) tags=[]
      let tagsstr = '';
      for (let i = 0; i < tags.length; i++) {
         tagsstr += `<li class="alert alert-info m-2 p-1">${tags[i]}</li>`;
      }
   
            
      let cartona=`
         <div class="col-md-4">
        <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt=""> 
        <h2>${meal.strMeal}</h2>
       </div>
      <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${meal.strInstructions} </p>
    <h3><span class="border">Area</span>: ${meal.strArea}</h3>
    <h3><span class="border">Category </span>: ${meal.strCategory}</h3>
  <h3>Recipes :</h3>
  <ul class="list-unstyled d-flex g-2 flex-wrap">
   
${ ingridians}
  </ul>
  <h3>tags :</h3>
  <ul class="list-unstyled d-flex g-2 flex-wrap">
  ${tagsstr}
  </ul>
  <a href="" class="btn btn-success">source</a>
  <a href="${meal.strYoutube}"  class="btn btn-danger mx-3">youtube</a>
    </div>
    </div>
      `
      rowdata.innerHTML=cartona;
      ;
   
   
}

function showsearchinput(){
   searchcontainrer.innerHTML=` 
    <div class="row py-4">
        <div class="col-md-6 text-white">
            <input onkeyup="searchbyname(this.value)" class="form-control bg-transparent text-white" placeholder="search by name" type="text">
        </div>
        <div class="col-md-6 text-white">
            <input onkeyup="searchbyfirstlitter(this.value)"maxlength="1" class="form-control bg-transparent text-white" placeholder="search by first litter" type="text">
        </div>
    </div>
`
rowdata.innerHTML=""
}
async function searchbyname(term) {
   let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
   response= await response.json();

 
response.meals? displaymeals(response.meals):displaymeals([]);
} 
async function searchbyfirstlitter(term) {
   term==""? term="a":"";
   let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
   response= await response.json();

 
response.meals? displaymeals(response.meals):displaymeals([]);
} 
function showContacts(){
   rowdata.innerHTML=`
   <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
<div class="container w-75 text-center " >
   <div class="row g-4">
    <div class="col-md-6">
        <input id="nameinput" inputsvalidation() onkeyup="inputsvalidation()" type="text"class="form-control" placeholder="Enter your name">
    <div  id="name1" class="alert alert-danger w-100 mt-2 d-none ">
        special char and numbers not allowed
    </div>
    </div>

    <div class="col-md-6">
        <input id="emailinput" onkeyup="inputsvalidation()"  inputsvalidation() type="email"class="form-control" placeholder="Enter your email">
        <div  id="email1" class="alert alert-danger w-100 mt-2 d-none ">
          email not valid ****example@gmail.com
        </div>
    </div>
    <div class="col-md-6">
        <input id="phoneinput" onkeyup="inputsvalidation()"  inputsvalidation() type="text"class="form-control" placeholder="Enter your phone">
        <div  id="phone1" class="alert alert-danger w-100 mt-2 d-none ">
           enter valid phone
          </div>
    </div>
    <div class="col-md-6">
       
     <input id="ageinput" onkeyup="inputsvalidation()"   inputsvalidation() type="number"class="form-control" placeholder="Enter your age">
     <div  id="age1" class="alert alert-danger w-100 mt-2 d-none ">
        enter vaild age
      </div>
    </div>
    <div class="col-md-6">
        <input id="passwordinput" onkeyup="inputsvalidation()"  inputsvalidation() type="password"class="form-control" placeholder="Enter your password">
        <div  id="password1" class="alert alert-danger w-100 mt-2 d-none ">
          enter valid password
          </div>
    </div>
    <div class="col-md-6">
        <input id="repasseordinput" onkeyup="inputsvalidation()"  inputsvalidation() type="password"class="form-control" placeholder="Enter your REpassword">
        <div  id="repassword1" class="alert alert-danger w-100 mt-2 d-none ">
            enter same password
          </div>
    </div>
   </div>
    <button id="subbtn" disabled class="my-5 btn btn-outline-danger">submit</button>
</div>

</div>
   
   `


 subbtn=document.getElementById("subbtn")





 document.getElementById("name1").addEventListener("focus",()=>{nameinputtouched=true});
 document.getElementById("email1").addEventListener("focus",()=>{emailinputtouched=true});
 document.getElementById("phone1").addEventListener("focus",()=>{phoneinputtouched=true});
 document.getElementById("password1").addEventListener("focus",()=>{passwordinputtouched=true});
 document.getElementById("age1").addEventListener("focus",()=>{ageinputtouched=true});
 document.getElementById("repassword1").addEventListener("focus",()=>{repasswordinputtouched=true});
 
 
 

}

 
let nameinputtouched=false;
let emailinputtouched=false;
let ageinputtouched=false;
let passwordinputtouched=false;
let repasswordinputtouched=false;
let phoneinputtouched=false;



function inputsvalidation() {
   if (nameinputtouched) {
      if (namevalidation()) {
         document.getElementById("name1").classList.remove("d-block");
         document.getElementById("name1").classList.add("d-none");
      } else {
         document.getElementById("name1").classList.remove("d-none");
         document.getElementById("name1").classList.add("d-block");
      }
   }

   if (emailinputtouched) {
      if (emailvalidation()) {
         document.getElementById("email1").classList.remove("d-block");
         document.getElementById("email1").classList.add("d-none");
      } else {
         document.getElementById("email1").classList.remove("d-none");
         document.getElementById("email1").classList.add("d-block");
      }
   }

   if (phoneinputtouched) {
      if (phonevalidation()) {
         document.getElementById("phone1").classList.remove("d-block");
         document.getElementById("phone1").classList.add("d-none");
      } else {
         document.getElementById("phone1").classList.remove("d-none");
         document.getElementById("phone1").classList.add("d-block");
      }
   }

   if (passwordinputtouched) {
      if (passwordvalidation()) {
         document.getElementById("passworda1").classList.remove("d-block");
         document.getElementById("passworda1").classList.add("d-none");
      } else {
         document.getElementById("passworda1").classList.remove("d-none");
         document.getElementById("passworda1").classList.add("d-block");
      }
   }

   if (ageinputtouched) {
      if (agevalidation()) {
         document.getElementById("age1").classList.remove("d-block");
         document.getElementById("age1").classList.add("d-none");
      } else {
         document.getElementById("age1").classList.remove("d-none");
         document.getElementById("age1").classList.add("d-block");
      }
   }

   if (namevalidation() &&
       emailvalidation() &&
       phonevalidation() &&
       agevalidation() &&
       passwordvalidation() &&
       repasswordvalidation()) {
      subbtn.removeAttribute("disabled");
   } else {
      subbtn.setAttribute("disabled", true);
   }
}

function namevalidation(){
   return(/^[a-zA-Z ]+$/.test(document.getElementById("nameinput").value))
}
function emailvalidation(){
   return(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(document.getElementById("emailinput").value))
}
function phonevalidation(){
   return(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test(document.getElementById("phoneinput").value))
}

function agevalidation(){
   return(/^(1[89]|[2-9]\d)$|100$/.test(document.getElementById("ageinput").value))
}


function passwordvalidation(){
   return(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(document.getElementById("passwordinput").value))
}


function repasswordvalidation(){
   return document.getElementById("repasseordinput").value==document.getElementById("passwordinput").value
}

