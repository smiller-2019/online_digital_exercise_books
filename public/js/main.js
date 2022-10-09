

function goToSignUpPage(){
    // get fetch to server side to render another body
    location.href="./signuppage.html";

}

function checkRole(){
//get fetch to checkback the role and decide go to which dashboard

location.href="./studentdashboard.html";

location.href="./teachdashboard.html";

}

function goToExercisePage(){
    //get fetch server to load data 
    location.href="./exercisepage.html";

}

function init(){
    //get fetch server to get the loginpage

}




init();
$('#CreateAccount').click(goToSignUpPage);
$('#Login').click(checkRole);
$('#createNewArticle').click(goToExercisePage);
