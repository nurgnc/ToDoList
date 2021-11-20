const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

let LIST = [];
let id = 0;

//class names 
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";


// show date

const options = {weekday: "long" , month: "short", day: "numeric"};

const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    let elementId = element.id;
    LIST[elementId].done = !LIST[elementId].done;
}


function addToDo(toDo, id, done, trash) {
    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const text=`
    <li class="item">
        <i class="fa ${DONE}" job="complete" id="${id}"></i>
        <p class="text ${LINE}">${toDo}</p>
        <i class="de fa fa-trash-o" job="delete" id="${id}"></i>
    </li>`
    const position = "beforeend";

    list.insertAdjacentHTML(position, text);
}


function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

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
                }
            );
            input.value = "";
            id++;
        }
        
        }
    }
});


list.addEventListener("click", function (event) {
    let element = event.target; //<i class="de fa fa-trash-o" job="delete" id="0"></i>
    const elementJOB = event.target.attributes.job.value; // delete or complete
    console.log("element", element);
    console.log("elementJOB", elementJOB);
    if (elementJOB == "complete") {
        completeToDo(element);
    } else if(elementJOB == "delete") {
        removeToDo(element);
    }

})



let data = localStorage.getItem("TODO"); //restore our list array
if (data) {
    LIST = JSON.parse(data);
    loadToDo(LIST); // we load the list to the page
    id = LIST.length;
} else {
    LIST = [];
    id = 0;
}

function loadToDo(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    })
    
}

//clear and reload
clear.addEventListener("click", function(){
    localStorage.clear();
    localStorage.reload();
})


