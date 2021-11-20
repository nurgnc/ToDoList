const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//variables
let LIST = [];
let id = 0;

//class names 
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

//get item from localstorage
let data = localStorage.getItem("TODO"); //restore our list array

//check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; //set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
    
} else {
    // if data isn't empty
    LIST = [];
    id = 0;
}

//load items to the user's interface
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    })
}

// //clear and reload localstorage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})

// show todays date

const options = {weekday: "long" , month: "short", day: "numeric"};

const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);


// add todo function
function addToDo(toDo, id, done, trash) {
    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const text=`
                <li class="item">
                    <i class="co far ${DONE}" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="de fa fa-trash-alt" job="delete" id="${id}"></i>
                </li>`
    const position = "beforeend";

    list.insertAdjacentHTML(position, text);
}

//add an item to the list user the enter key
document.addEventListener("keyup", function(event){
    if (event.key == "Enter") {
        const toDo = input.value;
        if (toDo) { {
            addToDo(toDo, id, false, false);
            LIST.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                });
            // add item to localStorage (this code must be added where the LIST array updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
        }
    }
});

//complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    let elementId = element.id;
    LIST[elementId].done = !LIST[elementId].done;
}

//remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}



//target the items created dynamically
list.addEventListener("click", function (event) {
    const element = event.target; //return the clicked element inside list
    const elementJOB = element.attributes.job.value; // delete or complete
    if (elementJOB == "complete") {
        completeToDo(element);
    } else if(elementJOB == "delete") {
        removeToDo(element);
    }

    // add item to localStorage (this code must be added where the LIST array updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
})

