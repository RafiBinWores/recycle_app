// user profile picture update button function start

const defaultBtn = document.querySelector("#default-btn");
const customBtn = document.querySelector("#custom-btn");
    function defaultBtnActive(){
        defaultBtn.click();
    }

// user profile picture update button function end


// product page image changing click function start

function clickimg(smallImg) {
    var fullImg = document.getElementById("coverImg");
    fullImg.src = smallImg.src;
}

// product page image changing click function end


// logout function start

function UserLogout() {
    fetch("/", {
      method: "DELETE",
    });

    setTimeout(() => {
      window.location.replace("/");
    }, 1000);
  }

  // logout function end
