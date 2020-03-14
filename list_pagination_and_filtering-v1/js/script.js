/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 

***/
const list_item = document.querySelectorAll('li');
const items_per_page = 10;
const student_page = document.querySelector('div.page');


/*** 
   showPage function: hide all of the items in the 
   list except for the ten you want to show.

   Input: student list, page number
   Output: None
***/
const showPage = (list, page) => {
  const start_index = (page-1)*items_per_page;
  const end_index = page*items_per_page;
  for(let i=0;i<list.length;i++){
     if(i <end_index && i>=start_index){
        list[i].style.display = ""; // show
     }
     else{
      list[i].style.display = "none"; // hide
     }

  }
}



/*** 
   appendPageLinks function: generate, append, and add 
   functionality to the pagination buttons.
   Input: student list
   Output:None
***/
const appendPageLinks = (list) => {
   const pagination = document.querySelector('.pagination') ;
   if(pagination !== null){
      student_page.removeChild(pagination);

   }
   const number_of_pages = Math.ceil(list.length / items_per_page);
   const div = document.createElement('div');
   div.className = "pagination";
   student_page.appendChild(div);
   const ul = document.createElement('ul');
   div.appendChild(ul);
   for(let i =1;i<=number_of_pages;i++){
      const li = document.createElement('li');
      const a = document.createElement('a');
      let page_number = document.createTextNode(i);
      if(i === 1){
         a.className = 'active';
      }
      a.setAttribute("href","#");
      ul.appendChild(li);
      li.appendChild(a);
      a.appendChild(page_number);
      a.addEventListener("click", function(event){
         pageLinkEvent(list,event);
      });
   }
   showPage(list,1);

}

/*** 
   pageLinkEvent function: show the page after pagination based on page number 
   of the event
   Input: student list, event
   Output:None
***/
const pageLinkEvent= (list,event) =>{
   const pagination_list = document.querySelectorAll('div.pagination li');
   for(let j=0;j<pagination_list.length;j++){
   
      pagination_list[j].firstChild.classList.remove('active');
   }
   event.target.className = 'active';
   showPage(list,event.target.textContent);
}

/*** 
   addSearch function: generate, append, and add 
   functionality to the search input and button.
   Input: None
   Output:None
***/
const addSearch = () =>{
   const div = document.createElement('div');
   div.className = "student-search";
   document.querySelector('div.page-header.cf').appendChild(div);
   const input = document.createElement('input');
   const button = document.createElement('button');
   button.innerHTML = 'Search';
   input.placeholder = "Search for students...";
   
   input.addEventListener("keyup",function(){//Add keyup event for input
      searchEvent();
   })
   div.appendChild(input);
   div.appendChild(button);
   button.addEventListener("click",function(){
      searchEvent();
   })

}

/*** 
   searchEvent function: search for students, paginate and show student lists 
   Input: None
   Output:None
***/
const searchEvent = () =>{
   const input_text = document.querySelector('input').value;
   let search_list = searchComponent(list_item,input_text);
   handleSearchResult(search_list);
   appendPageLinks(search_list);
}

/*** 
   handleSearchResult function: Handle error with no results
   Input: student list
   Output:None
***/
const handleSearchResult = (list) =>{
   let noresult = student_page.querySelector('.noresult');
   if(list.length === 0 && noresult == null){//create no result condition
      noresult = document.createElement('h2');
      noresult.className = 'noresult';
      noresult.innerHTML = "No results found";
      student_page.appendChild(noresult);
   }
   else if (list.length !== 0 && noresult!== null){ //remove no result condition
      student_page.removeChild(noresult);

   }
}

/*** 
   searchComponent function: search for a list of students that has input text in their names
   Input: student list, input text
   Output: student list after search
***/
const searchComponent = (list, text) => {

   let search_list = [];
   const filter = text.toUpperCase();
   for(let i =0; i<list.length;i++){
      const h3_text = list[i].querySelector("h3").textContent;
      if(h3_text.toUpperCase().indexOf(filter) >-1){
         search_list.push(list[i]);
         list[i].style.display = ""; // show
      }
      else{
         list[i].style.display = "none"; // hide
      }
   }
   return search_list;
 }

 //Run the functions
appendPageLinks(list_item);
addSearch();
