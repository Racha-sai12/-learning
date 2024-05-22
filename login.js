// when you comme to login page all the session stoarage data is cleared 
// so that  a new user can log in 
document.addEventListener("DOMContentLoaded", function() {
  
  sessionStorage.setItem('IsStudent', false);
  sessionStorage.setItem('firstName', null);
  sessionStorage.setItem('middleName', null);
  sessionStorage.setItem('username', null);
  sessionStorage.setItem('password', null);
  sessionStorage.setItem('Level', null);
  sessionStorage.setItem('student', null);
  sessionStorage.setItem('teacher', null);
});




    var form = document.getElementById("LoginForm");

    var teacherSubmit = document.getElementById("teacherSubmit"); // teacher submit button
    var studentSubmit = document.getElementById("studentSubmit");

    // when the teacher submit button is clicked we look in local storage for the teacher that has the name and password entered by the user

    teacherSubmit.addEventListener("click", function(event) {
        event.preventDefault(); 
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        
        const teachers = JSON.parse(localStorage.getItem('teachers')) || [];

        var teacher =  teachers.find(teacher => teacher.username === username && teacher.password === password);
        
        if (teacher != null) {
        document.getElementById("Message").textContent = "Teacher login successful!";

        // if we find the teacher we store his informations in session storage
          sessionStorage.setItem('teacher', username);
          sessionStorage.setItem('IsStudent', false);
          sessionStorage.setItem('firstName', teacher.firstName);
          sessionStorage.setItem('middleName', teacher.middleName);
          sessionStorage.setItem('username', teacher.username);
          sessionStorage.setItem('password', teacher.password);
          sessionStorage.setItem('Level', teacher.subject);

        // then we go to the teacher page
        window.location.href = "./teacherpage.html";
        } else {
        document.getElementById("Message").textContent = "Invalid username or password.";
        }
    });



    studentSubmit.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent form submission
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        const students = JSON.parse(localStorage.getItem('students')) || [];

        
        var student = students.find(student => student.username === username && student.password === password);

        console.log(student);
        if (student) {
          document.getElementById("Message").textContent = "Student login successful!";
          sessionStorage.setItem('student', student.username);
    
          sessionStorage.setItem('IsStudent', true);
          sessionStorage.setItem('firstName', student.firstName);
          sessionStorage.setItem('middleName', student.middleName);
          sessionStorage.setItem('username', student.username);
          sessionStorage.setItem('password', student.password);
          sessionStorage.setItem('Level', student.academicLevel);

        // Redirect to student page after successful login
          window.location.href = "./studentpage.html";
        } else {
          document.getElementById("Message").textContent = "Invalid username or password.";
        }
    });


  
