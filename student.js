document.addEventListener("DOMContentLoaded", function() {
    // Fetch data from JSON file
    loadCoursesFromLocalStorage();

    const modal = document.getElementById('enrollModal');

    // Get the button that opens the modal
    const enrollButtons = document.querySelectorAll('.enroll-button');

    // Get the <span> element that closes the modal
    const closeBtn = document.getElementsByClassName('close')[0];

    const paymentOptionSelect = document.getElementById('paymentOption');

    // Get the credit card field div
    const creditCardDiv = document.getElementById('creditCardDiv');

    // Function to handle payment option change
    function handlePaymentOptionChange() {
        if (paymentOptionSelect.value === 'credit_card') {
            creditCardDiv.style.display = 'block';
        } else {
            creditCardDiv.style.display = 'none';
        }
    }

    function closeModal() {
        document.getElementById('enrollModal').style.display = 'none';
    }


    

    // When the user clicks on <span> (x), close the modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    

    paymentOptionSelect.addEventListener('change', handlePaymentOptionChange);


    function updateCourseContainer(course) {
        const id = course.id;
        const titleValue = course.title
        const description = course.description;
        const priceValue = course.price;
        const imgValue = course.image;
      
        var galleryContainer = document.getElementById("container");
        
      
        var courseItem = document.querySelector(".course-item").cloneNode(true);
        courseItem.style.display = 'block';
      
        var image = courseItem.querySelector(".img-fluid");
        image.src = imgValue ; // Replace "new_image.jpg" with the path to your new image
        
        // Change the price
        var price = courseItem.querySelector("h3");
        price.textContent = priceValue;
      
        var title = courseItem.querySelector("h5");
        title.textContent = titleValue;
      
        var navigationBtn = courseItem.querySelector(".navigation-btn");
        navigationBtn.setAttribute('data-course-id', id)
      
        var href = "CourseDetail.html?id=" + id;
        navigationBtn.setAttribute('href', href);

        var studentName = sessionStorage.getItem("student");
        var isEnrolled = isStudentEnrolled(studentName, course.id);
        console.log("isenrolled", isEnrolled);

        if(isEnrolled){
            var enrollButton = courseItem.querySelector(".enroll-button");
            enrollButton.textContent = "Quit"
            enrollButton.style = "border-radius: 0px 30px 30px 0px; background-color: #e74c3c; border-color: #e74c3c; b"
            enrollButton.setAttribute('id', id)
    
            enrollButton.addEventListener('click', deleteEnrollment);
        }else{
            var enrollButton = courseItem.querySelector(".enroll-button");
            enrollButton.setAttribute('id', id)
    
            enrollButton.addEventListener('click', enrollCourse);
        }
       

      
        //     // Append the cloned course item to the gallery container
        galleryContainer.appendChild(courseItem);
      }
    
    function addEnrollementToLocalStorage(enrollement) {
        let enrollements = JSON.parse(localStorage.getItem('enrollements')) || [];
        enrollements.push(enrollement);
        localStorage.setItem('enrollement', JSON.stringify(enrollements));
    }
      
      // Function to load courses from localStorage on page load
      function loadCoursesFromLocalStorage() {
        const courses = JSON.parse(localStorage.getItem('courses')) || [];
        courses.forEach(course => {
            updateCourseContainer(course);
        });
      }


      function isStudentEnrolled(studentName, courseId) {
        // Retrieve enrollments from local storage
        var enrollmentsJSON = localStorage.getItem("enrollments");
        
        // Check if enrollments exist in local storage
        if (enrollmentsJSON) {
            // Parse the JSON string to an array of enrollments
            var enrollments = JSON.parse(enrollmentsJSON);
            
            // Check each enrollment for a match
            for (var i = 0; i < enrollments.length; i++) {
                var enrollment = enrollments[i];
                // Check if the enrollment matches the student and course ID
                if (enrollment.student === studentName && enrollment.courseId === courseId) {
                    return true; // Student is enrolled in the course
                }
            }
        }
        
        return false; // Student is not enrolled in the course or no enrollments found
    }
    
    function enrollCourse(event) {
    const courseId = event.target.getAttribute('id');
    modal.style.display = 'block';

    document.getElementById('enrollmentForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form values
        // const name = document.getElementById('name').value;
        // const address = document.getElementById('address').value;
        const motivation = document.getElementById('motivation').value;
        const paymentOption = document.getElementById('paymentOption').value;
        const session = document.getElementById('session').value;



        if (paymentOption === 'credit_card') {
            const cardNumber = document.getElementById('cardNumber').value;
            const expirationDate = document.getElementById('expirationDate').value;
            const cvv = document.getElementById('cvv').value;
            const cardholderName = document.getElementById('cardholderName').value;
        }

        const studentName = sessionStorage.getItem('student');
        const newEnrollement = {
            courseId: courseId,
            student: studentName,
            paymentOption: paymentOption,
            session: session,
            motication :motivation
        };
        addEnrollementToLocalStorage(newEnrollement);
        closeModal();
        loadCoursesFromLocalStorage();
        location.reload();
        
    });


}  

function deleteEnrollment(event) {
    const courseId = event.target.getAttribute('id');
    const enrollments = JSON.parse(localStorage.getItem('enrollments')) || [];
    const filteredEnrollments = enrollments.filter(enrollment => enrollment.courseId !== courseId);
    localStorage.setItem('enrollments', JSON.stringify(filteredEnrollments));
        loadCoursesFromLocalStorage();
        location.reload();
}  
function addEnrollementToLocalStorage(enrollement) {
    let enrollements = JSON.parse(localStorage.getItem('enrollments')) || [];
    enrollements.push(enrollement);
    localStorage.setItem('enrollments', JSON.stringify(enrollements));
}

});



