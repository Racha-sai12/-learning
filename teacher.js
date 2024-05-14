

document.addEventListener("DOMContentLoaded", function() {
  // Fetch data from JSON file
  loadCoursesFromLocalStorage()

});

document.addEventListener("DOMContentLoaded", function() {
  // Function to open modal

  function openModal() {
      document.getElementById('modal').style.display = 'block';
  }

  // Function to close modal
  function closeModal() {
      document.getElementById('modal').style.display = 'none';
  }
  var addButton = document.getElementById("addCourseItem");
  var imageUrl;
  // Event listener for Add Course button
  addButton.addEventListener('click', openModal);

  // Event listener for close button in modal
  document.getElementsByClassName('close')[0].addEventListener('click', closeModal);

  var imageInput = document.getElementById("imageInput");


  document.getElementById('imageInput').addEventListener('change', function(event) {

    const file = event.target.files[0];
    if (file) {
        // Create a FileReader object
        const reader = new FileReader();
        
        // Set up the FileReader to load the selected image
        reader.onload = function(e) {

          imageUrl = e.target.result;
        };
        
        reader.readAsDataURL(file);
    }
  });
  // Event listener for form submission
  document.getElementById('addCourseForm').addEventListener('submit', function(event) {
      event.preventDefault();

      // Get form values
      const id = generateUniqueId();
      const titleValue = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const priceValue = document.getElementById('price').value;

  
      const teacherName = sessionStorage.getItem('teacher');


 
      //Create new course object
      const newCourse = {
          id: id,
          title: titleValue,
          description: description,
          image: imageUrl,
          price: priceValue,
          teacher: teacherName
      };

      // // Add the new course to localStorage
       addCourseToLocalStorage(newCourse);

      // // // Update the UI by dynamically adding the course to the container
      updateCourseContainer(newCourse);

      // // Close modal
      closeModal();
  });

  // Function to add course to localStorage
  function addCourseToLocalStorage(course) {
    
    let courses = [];
    const storedCourses = localStorage.getItem('courses');
    
    if (storedCourses) {
        try {
            courses = JSON.parse(storedCourses);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            // Handle the error, such as setting courses to an empty array
        }
    }
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
  }

  // Function to update the UI by dynamically adding the course to the container
 

  // Load courses from localStorage on page load
  // loadCoursesFromLocalStorage();
});

function generateUniqueId() {
  const timestamp = Date.now().toString(36); // Convert timestamp to base36 string
  const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string
  return timestamp + '-' + randomString; // Concatenate timestamp and random string
}

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

  var deleteBtn = courseItem.querySelector(".delete-btn");
  deleteBtn.setAttribute('courseId', id)
  deleteBtn.addEventListener("click", deleteCourse)


  
  var href = "CourseDetail.html?id=" + id;
  navigationBtn.setAttribute('href', href);

  //     // Append the cloned course item to the gallery container
  galleryContainer.appendChild(courseItem);
}
function deleteCourse(event) {
  const courseId = event.target.getAttribute('courseId');

  var coursesJSON = localStorage.getItem("courses");
  var courses = JSON.parse(coursesJSON);
        
  // Find the index of the course with the specified ID
  var index = courses.findIndex(function(course) {
      return course.id === courseId;
  });
  
  // If the course is found, remove it from the array
  if (index !== -1) {
      courses.splice(index, 1);
      
      // Update the local storage with the modified array
      localStorage.setItem("courses", JSON.stringify(courses));
      
      console.log("Course with ID " + courseId + " has been deleted.");
  } 
  loadCoursesFromLocalStorage();
  location.reload();
}


// Function to load courses from localStorage on page load
function loadCoursesFromLocalStorage() {
  const teacherName = sessionStorage.getItem('teacher');

  const courses = JSON.parse(localStorage.getItem('courses')) || [];
  const coursesForTeacher = courses.filter(course => course.teacher === teacherName);

  coursesForTeacher.forEach(course => {
      updateCourseContainer(course);
  });
}