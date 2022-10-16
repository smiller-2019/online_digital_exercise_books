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

function createNewExercise(){
    location.href = "/newExercise";
}

function createAccount(){
    console.log('createaccount');
    location.href ="/signup";
}

function backToLogin(){
    location.href ="/";
}

function signup(){
    var email = $('#email').val();
    var first_name = $('#firstName').val();
    var last_name=$('#lasttName').val();
    var password = $('#password').val();
    var role=$('input[name=Role]:checked').val();
    
    
    console.log("signup button pressed");
    console.log(role);
    console.log(email);
    
    
    if (password.length<8){
        $('#invalidPassword').show();
        return;
    }


    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validRegex)){
        $('#invalidemail').show();
        return;
    }
    const response = $.post(
        '/api/users/',   {
            email: email, 
            password: password,
            first_name:first_name,
            last_name: last_name,
            role:role
        },
        function(data){
            console.log('updated database successfully');
            location.href = "/";
        }).fail(function(data){
            console.error(data.responseJSON.message);
            alert(data.responseJSON.message);
        });


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

function loadExercise(id, userRole){
    //fetch to get data in json object get UserRole
    console.log("load exercise:"+ id + " " + userRole);
    if(id>0){
        const response = $.get(
            '/api/exercises/'+id,
            function(data){
                initExercise(data, userRole);
            }
        );
    }else if(userRole=='student'){
        newExercise();
    }
}
