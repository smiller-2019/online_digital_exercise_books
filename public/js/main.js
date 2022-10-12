const pageData = {
    page: "login",
    userId: ""    
};

const mockExercises = [{ exerciseId:1,
    date:'2021-10-09', 
    studentName: 'Alan',
    title:'living animals',
    grade:'A'},
   {exerciseId:2,
    date:'2021-10-10',  
    studentName: 'John',
    title:'living animals',
    grade:'A'},
   {exerciseId:3,
    date:'2021-10-11',  
    studentName: 'Sam',
    title:'living animals',
    grade:'A'},
   {exerciseId:4,
    date:'2021-10-12',  
    studentName: 'Leo',
    title:'livinganimals',
    grade:'A'}, 
   {exerciseId:5,
    date:'2021-10-13',  
    studentName: 'Peter',
    title:'livinganimals',
    grade:'A'},
   ];

//mock functions to call server later
function loginToServer(userId, password){
    /*
            //fetch back to check the user is student or teacher
            const response = await fetch('/api/users/login/', {
                method: 'POST',
                body: JSON.stringify({ userid, password }),
                headers: { 'Content-Type': 'application/json' },
                });
            
                //display fail to login
            if (response.ok){
                return response.json;
            }else{
                $('#invalid').show();
            }
    */
    if(userId === 'T001')
        return {userRole: 'teacher'};
    else if(userid === 'S001') 
        return {userRole: 'student'};
    else
        $('#invalid').show();
}

function getAllExercisesFromServer(userid){
    return mockExercises;
}

function getAllStudentExercisesFromServer(teacherUserid){
    return mockExercises;
}
//end mock

async function checkRole(){
    //get fetch to checkback the role and decide go to which dashboard
    //get the userid and password from intput field
    pageData.userId = $('#UserId').val();
    var password = $('#userPassword').val();
    if (pageData.userId && password) {
        var userObj = loginToServer(pageData.userId, password);
        if (userObj) {
                if(userObj.userRole==='student') {
                changePage('studentDashboard');
            } else if(userObj.userRole==='teacher') {
                changePage('teacherDashboard');
                } 
        } else {
            $('#invalid').show();
        }
    }
    //five latest article get data from database
}

function generateLoginPartial(){
    const loginPartial = `<div id="loginPartial" class="col col-6">
    <div class="m-3">
        <h2 class="shadow-none p-3 mb-3 bg-secondary rounded">Login</h2>
        <div class="form-floating">
            <input class="form-control mb-3  col-10 col-md-8 border" type="text" id="UserId" placeholder="UserId">
            <label for="UserId">User Id</label>
        </div>
        <div class="form-floating">
            <input class="form-control mb-3 col-10 col-md-8 border" type="password" id="userPassword" placeholder="Password">
            <label for="userPassword">Password</label>
        </div>
        <div>
            <button type="button" class="btn btn-primary my-3" id="login" onclick="checkRole()">Login</button>
            <button type="button" class="btn btn-primary m-3" id="CreateAccount" onclick="changePage('signup')">Create Account</button>                 
        </div> 
    </div>
    <div class="m-3" id="invalid" style="display: none">**Fail to Login to the System. Please contact system administrtor at admin@example.com.</div>
  </div>`;
  return loginPartial;
}

function generateStudentExerciseList(exercises){
    var tbodyContent = "";
    for(var i=0; i<exercises.length; i++){
        tbodyContent += `<tr>
            <td>`+(i+1)+`</th>
            <td>`+exercises[i].studentName+`</th>
            <td><a href="./exercisepage.html" >`+exercises[i].title+`</a></td>
            <td>`+exercises[i].grade+`</td>
        </tr>`;
    }
    return tbodyContent;
}

function generateTeacherDashboardPartial(){
    const exercises = getAllStudentExercisesFromServer(pageData.userId);
    const teacherDashboardPartial = `<div id="teacherDashboardPartial" class="col m-3 bg-light">
    <h2 class="shadow-none p-3 mb-3 bg-secondary rounded">Teacher Dashboards</h2>
    <div>
        <h3>Pending Latest Five Student Article</h3>
        <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Student name</th>
                <th scope="col">Title</th>
                <th scope="col">Grade</th>
              </tr>
            </thead>
            <tbody>`
            + generateStudentExerciseList(exercises) +
            `</tbody>
          </table>
    </div>
    <div>
        <button type="button m-3" class="btn btn-primary" id="viewAllPendingArticle">View All Pending Articles</button>
        <button type="button m-3" class="btn btn-primary" id="createNewClass">Create New Class</button>
    </div>
</div>`;
    return teacherDashboardPartial;
}

function generateStudentDashboardPartial(){   
    const exercises = getAllExercisesFromServer(pageData.userId); 
    const studentDashboardPartial = `<div id="studentDashboardPartial" class="col m-3 bg-light">
        <h2 class="shadow-none p-3 mb-3 bg-secondary rounded">Student Dashboards</h2>
        <div>
            <h3>Latest Five Article</h3>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Grade</th>
                    <th scope="col">Updated Date</th>
                </tr>
                </thead>
                <tbody id="dashboardcontent">`
                + generateExerciseList(exercises) +
                `</tbody>
            </table>
        </div>
        <div>
            <button type="button m-3" class="btn btn-primary" id="viewAllArticle">View All Articles</button>
            <button type="button m-3" class="btn btn-primary" id="createNewArticle" onclick="changePage('exercise')">Create New Article</button>
        </div>
    </div>`;
    return studentDashboardPartial;
}

function generateExerciseList(exercises){
    var tbodyContent = '';
    for(i=0; i< exercises.length;i++){
        tbodyContent += `<tr>
            <td>`+(i+1)+`</td>
            <td><button type='button' class='btn btn-link' onclick='viewExercise(`+exercises[i].exerciseId+`)'>`+exercises[i].title+`</button></td>
            <td>`+exercises[i].grade+`</td>
            <td>`+exercises[i].date+`</td>
        </tr>`;        
    }
    return tbodyContent;
}

function generateExercisePartial(){
    var exercisePartial = `<div class="col exercise-book"><form>
        <div class="row">
            <div class="col">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control topic" id="topic" placeholder="Input topic">
                    <label for="topic">Topic</label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-8 student-section" id="student-section">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-primary" onclick="addNoteblockTextarea()">Add Text</button>
                    <button type="button" class="btn btn-primary" onclick="addNoteblockImage()">Add Image</button>
                    <button type="button" class="btn btn-primary" disabled>Add Drawing</button>
                </div>
            </div>
            <div class="col-3 teacher-section">
                <h2>Teacher Feedbacks</h2>
                <p id="teacher-feedback-displaytext"></p>
                <textarea id="teacher-feedback-textarea" style="width: 100%;"></textarea>
                <label for="teacher-grade" class="form-label">Grade</label>
                <select id="teacher-grade" class="form-select">
                    <option selected>Please select the grade</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                </select>
                <button type="button" class="teacher-button teacher-button-save" onclick="saveTeacherFeedback()"></button>
                <button type="button" class="teacher-button teacher-button-cancel" onclick="cancelTeacherFeedback()"></button>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <button id="studentModeBtn" type="button" class="btn btn-link" onclick="changeMode('student')">Change to 'Student' mode</button>
                <button id="teacherModeBtn" type="button" class="btn btn-link" onclick="changeMode('teacher')">Change to 'Teacher' mode</button>
                <button id="exportExerciseBtn" type="button" class="btn btn-info" onclick="exportExercise()">Export Exercise</button>
            </div>
        </div>
    </form></div>
    </div>`;
    return exercisePartial;
}

function generateSignupPartial(){
    var signUpPartial = `<div class="col m-3">
    <h2 class="shadow-none p-3 mb-3 bg-secondary rounded">Student/Teacher Sign Up</h2>
    <div class="form-floating">
        <input class="form-control col-10 border mb-3" type="text" id="UserId" placeholder="User Id">
        <label for="UserId">User Id</label>
    </div>
    <div class="form-floating">
        <input class="form-control col-10 border mb-3" type="text" id="firstName" placeholder="first name">
        <label for="userFirstName">First Name</label>
    </div>
    <div class="form-floating">
        <input class="form-control col-10 border mb-3" type="text" id="lasttName" placeholder="last name">
        <label for="userLastName">Last Name</label>
    </div>
    <div class="form-floating"> 
        <input class="form-control col-10 border mb-3" type="password" id="password" placeholder="password">
        <label for="Password">Password</label>
    </div>
    <div class="form-floating"> 
        <input class="form-control col-10 border mb-3" type="email" id="email" placeholder="email">
        <label for="email">Email address</label>
    </div>

    <div class="row">
        <div class="form-check m-3">
            <input class="form-check-input" type="radio" name="Role" id="Student" checked>
            <label class="form-check-label" for="Student">
            Student
            </label>
        </div>
        
        <div class="form-check m-3">
            <input class="form-check-input" type="radio" name="Role" id="Teacher" >
            <label class="form-check-label" for="Teacher">
            Teacher
            </label>
        </div>
    </div>

    <button type="button m-3" class="btn btn-primary">Sign Up</button>
    <button type="button" class="btn btn-primary m-3" id="login" onclick="changePage('login')">Login with Existing Account</button>                 
</div>`;
    return signUpPartial; 
}

function changePage(pageName){
    console.debug('changePage: ' + pageName);
    pageData.page = pageName;
    $('#container').html('');
    switch(pageName){
        case "login":
            $('#container').append(generateLoginPartial());
            break;
        case "signup":
            $('#container').append(generateSignupPartial());
            break;    
        case "studentDashboard":
            $('#container').append(generateStudentDashboardPartial());            
            break;           
        case "teacherDashboard":
            $('#container').append(generateTeacherDashboardPartial());            
            break;
        case "exercise":
            $('#container').append(generateExercisePartial());
            initExercise();
            break;
    }
}

$(function(){
    changePage('login');
});