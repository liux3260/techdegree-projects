//global variables
const name = document.querySelector("#name");
const email = document.querySelector("#mail");
const title = document.querySelector("#title");
const design = document.querySelector("#design");
const color = document.querySelector("#color");
const activity = document.querySelector('.activities');
const activities = activity.querySelectorAll('input');
const payment = document.querySelector('#payment');
const cc_num = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const submit = document.querySelector("button[type ='submit']");
const JS_puns_values = ["cornflowerblue","darkslategrey","gold"];
const JS_values = ["tomato","steelblue","dimgrey"];
let total = 0;

//functions
/*
Hide Other textbox unless user select "Other"
*/
const hideOther = (title_element) =>{
    const other_title = document.querySelector("#other-title");
    showOrHide(title_element.value === "other",other_title);
}

/* 
Hide Color based on the selection of design
also hide color text and dropdown if no selection
*/
const hideColor = (design_element) =>{
    let first_available = true;
    const color_dropdown = document.querySelector("#colors-js-puns");
    showOrHide(design_element.value === "js puns" || design_element.value === "heart js",color_dropdown);

    for (let index = 0; index < color.length; index++) {
        if(design_element.value === "js puns"){
            showOrHide(JS_puns_values.includes(color[index].value),color[index]);
        }
        else if (design_element.value === "heart js"){
            showOrHide(JS_values.includes(color[index].value),color[index]);
        }
        if (first_available && color[index].style.display === "inherit") {
            color.value = color[index].value;
            first_available = false;
        }
        
    }
}
/*
Hide "Select theme" in the dropdown
Call hideColor method to hide Color text and the dropdown
*/
const hideDesign = () =>{
    showOrHide(false,design[0]);
    for (let index = 0; index < color.length; index++) {
        showOrHide(false,color[index]);
        
    }
    const option = document.createElement('option');
    option.text = "Please select a T-shirt theme";
    color.add(option,color[0]);
    color.value = option.text;
    hideColor(design[0]);
}

/*
disable the checkbox that's having the same time
add the cost to total cost
*/
const diableActivity = (activity_element) =>{
    //const activities = activity.querySelectorAll('input');
    const totalCost = activity.lastElementChild;
    for(let i = 0; i<activities.length; i++){
        if (activities[i].getAttribute('data-day-and-time') === activity_element.getAttribute('data-day-and-time') && activities[i] !== activity_element) {
            activities[i].disabled = activity_element.checked;
        }
        
    }
    if (activity_element.checked) {
        total += parseInt( activity_element.getAttribute('data-cost'));
    }
    else{
        total -= parseInt( activity_element.getAttribute('data-cost'));
    }
    totalCost.innerHTML = "Total: $" + total;
}

/*
hide payment class based on the payment selection
*/
const hidePayment = (payment_element) =>{
    const credit_card = document.querySelector('#credit-card');
    const paypal = document.querySelector('#paypal');
    const bitcoin = document.querySelector('#bitcoin');

    showOrHide(payment_element.value === "credit card",credit_card);
    showOrHide(payment_element.value === "paypal",paypal);
    showOrHide(payment_element.value === "bitcoin",bitcoin);
        

}

/*
add eventlistener for payment dropdown
*/
const addPaymentEvent = () =>{
    payment.addEventListener("change", createListener(hidePayment));
    showOrHide(false,payment.firstElementChild);
    payment.value = payment.options[1].value;
    hidePayment(payment);

}

/*
check if name is valid
*/
const isValidName = (name) =>{
    return errorIndication(name.value !== "",name,"Name cannot be empty.");
}

/*
check if email is valid
*/
const isValidEmail = (email) =>{
    if (email.value === "") {
        return errorIndication(false,email,"Please enter email.")
        
    }
    else{
        return errorIndication(/^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value),email,"Invalid email.");
    }

}

/*
check if credit card number is valid
*/
const isValidCreditCardNumber= (credit_card_number) =>{
    if (credit_card_number.value === "") {
        return errorIndication(false,credit_card_number,"Please enter credit card number.");
    }
    else{
        return errorIndication(/[0-9]{13,16}/.test(credit_card_number.value),credit_card_number,"Please enter a number that is between 13 and 16 digits long.");
    }

}

/*
check if zip code is valid
*/
const isValidZipCode = (zip) =>{
    if (zip.value == "") {
        return errorIndication(false,zip,"Please enter zip.");
    }
    else{
        return errorIndication(/[0-9]{5}/.test(zip.value),zip,"Please enter a 5 digits number.");
    }

}

/*
check if cvv is valid
*/
const isValidCVV = (cvv) =>{
    if (cvv.value === "") {
        return errorIndication(false,cvv,"Please enter cvv.");
    }
    else{
        return errorIndication(/[0-9]{3}/.test(cvv.value),cvv,"Please enter a 3 digits number.");
    }
}

/*
display error message (error_text) if the user input invalid data(error_condition) for element
*/
const errorIndication = (error_condition,element,error_text) =>{
    let span = element.nextElementSibling;
    if (span === null || span.nodeName != "SPAN") {
        span = document.createElement("span");
        span.style.color = "red";
        element.parentNode.insertBefore(span,element.nextElementSibling);
    }
    if (!error_condition) {
        element.style.borderColor = "red";
        span.innerHTML = error_text;
        //console.log(error_text);
        return false;
    }
    else{
        element.style.borderColor = "";
        span.innerHTML = "";
        return true;
    }
}

/*
check if at least one activities is selected
*/

const checkActivities = () =>{
    for(let i = 0; i<activities.length; i++){
        if (activities[i].checked) {
            activity.firstElementChild.style.color = "";
            return true;
        }
        
    }
    activity.firstElementChild.style.color = "red";
    return false;

}

/*
check all errors
*/
const checkErrors = () =>{
    if (payment.value === "credit card") {
        return (isValidCreditCardNumber(cc_num) & isValidZipCode(zip) & isValidCVV(cvv)& isValidName(name) & isValidEmail(email) & checkActivities());
        
    }
    else{
        return (isValidName(name) & isValidEmail(email) & checkActivities());
    }

}


/*
add event listener for activity checkbox
*/
const addActivityEvent = () =>{
    const totalCost = document.createElement("label");
    totalCost.innerHTML = "Total: $" + total;
    activity.appendChild(totalCost);
    const activities = activity.querySelectorAll('input');
    for(let i = 0; i<activities.length; i++){
        activities[i].addEventListener("change",createListener(diableActivity));
        
    }

}

/*
show/hide element text based on show condition
*/
const showOrHide = (show,element) =>{
    if(show){
        element.style.display = "inherit";
    }
    else{
        element.style.display = "none";
    }

}

/*
create event listener with function name
*/
const createListener = (function_name) =>{
    return e =>{
        function_name(e.target);

    };

}


//function calls
//document.querySelector("#name").focus();
title.addEventListener("change",createListener(hideOther));
hideOther(title);
design.addEventListener("change",createListener(hideColor));
hideDesign();
addActivityEvent();
addPaymentEvent();
/*
add event listener to "Submit" button so that the form won't get submitted if there is 
invalid data on the form
*/
submit.addEventListener("click", function (e) {
    if(!checkErrors()){
        e.preventDefault();
        return false;
    }
});
/**
 add keyup event listener to accomplish real-time validation
 */
name.addEventListener("keyup", createListener(isValidName));
name.focus();
email.addEventListener("keyup", createListener(isValidEmail));
cc_num.addEventListener("keyup", createListener(isValidCreditCardNumber));
zip.addEventListener("keyup", createListener(isValidZipCode));
cvv.addEventListener("keyup", createListener(isValidCVV));