

//mock functions to call server later
async function loginToServer(email, password){
    console.log('loginToServer:'+email+' '+password);
    //fetch back to check the user is student or teacher
    const response = $.post(
        '/api/users/login/', 
        {
            email: email, 
            password: password
        },
        function(data){
            location.reload(true);
        }
    ).fail(function(data) {
        console.error(data.responseJSON.message);
        $('#invalid').html(data.responseJSON.message);
        $('#invalid').show();
    });
}

function logout(){
    //fetch back to check the user is student or teacher
    const response = $.post(
        '/api/users/logout/', 
        {},
        function(data){
            location.href = "/";
        }
    );
}



async function checkRole(){
    //get fetch to checkback the role and decide go to which dashboard
    //get the userid and password from intput field
    var email = $('#email').val();
    var password = $('#password').val();
    if (email && password) {
        loginToServer(email, password);
    }

}

async function viewExercise(exerciseid){

    console.log(exerciseid);
    //get fetch to load exercise data


    
}

function changePage(pageName){
    console.debug('changePage: ' + pageName);
    pageData.page = pageName;
    $('#container').html('');
    switch(pageName){
        case "login":
           // $('#container').append(generateLoginPartial());
            break;
        case "signup":
            //$('#container').append(generateSignupPartial());
            break;    
        case "studentDashboard":
            //$('#container').append(generateStudentDashboardPartial());            
            break;           
        case "teacherDashboard":
            ///$('#container').append(generateTeacherDashboardPartial());            
            break;
        case "exercise":
            //$('#container').append(generateExercisePartial());
            initExercise();
            break;
    }
}

function loadExercise(id, userRole){
    //fetch to get data in json object get UserRole
    console.log("load exercise:"+ id + " " + userRole);
    const response = $.get(
        '/api/exercises/'+id,
        function(data){
            initExercise(data, userRole);
        }
    );
}

