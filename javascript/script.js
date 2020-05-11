function addTask() {
    /*
    To add a new task
     */

    //Retrieve data from form
    let taskToBeAdded = document.getElementById("taskToBeAdded").value
    let deadline = new Date(document.getElementById("deadline").value)

    //Check data validity
    if (taskToBeAdded === "" || !(deadline.getTime() === deadline.getTime())) {
        alert("Invalid Data")
        setMinDate()
        return
    }

    //Check if event to be added is Future Event
    let now = new Date
    if (deadline.getTime() <= now.getTime()) {
        alert("Enter Future Time")
        setMinDate()
        return
    }
    //Create Row
    let tr = document.createElement("TR")
    tr.setAttribute("name", taskToBeAdded)

    //Create CheckBox
    let checkBox = document.createElement("input")
    checkBox.setAttribute("type", "checkbox")
    checkBox.setAttribute("class", "toDoCheckBox")

    //Create task textNode
    let taskName = document.createTextNode(taskToBeAdded)

    //Create deadline textNode
    deadline = deadline.toString().split(" ")
    deadline = deadline[0] + " " + deadline[1] + " " + deadline[2] + " " + deadline[3] + " " + deadline[4]
    let deadlineTag = document.createTextNode(deadline)

    let td = [] //Column List(ROW)
    for (let i = 0; i < 4; i++) {
        td.push(document.createElement("TD"))
    }
    td[1].appendChild(checkBox)
    td[2].appendChild(taskName)
    td[3].appendChild(deadlineTag)
    for (let i = 0; i < 4; i++) {
        tr.appendChild(td[i])
    }
    //Insert into HTML
    document.getElementById("toDo").appendChild(tr)

    //Reset Form
    document.getElementById("addTaskForm").reset()
    setMinDate()

    alert("Task Added")
}

function setMinDate() {
    /*
    To set min attribute of deadline input
     */

    let present = new Date

    //Set min date and default data
    document.getElementById("deadline").setAttribute("min", present.toISOString().split('Z')[0])
    document.getElementById("deadline").setAttribute("value", present.toISOString().split('Z')[0])
}

function markLate() {
    /*
    To mark a task Late
     */
    let present = new Date
    let toDoTable = document.getElementById("toDo").children
    for (let i = 1; i < toDoTable.length; i++) {
        let deadline = toDoTable[i].children
        deadline = deadline[3].innerHTML
        deadline = new Date(deadline)
        if (deadline.getTime() < present.getTime()) {
            toDoTable[i].style.color = "#ff0000"
        }
    }
}


function completeTask(sourceCheckBox, destinationTable, destinationCheckBox) {
    /*
    sourceCheckBox:class of source checkBox
    destinationTable: class of destination Table
    destinationCheckBox:class of destination CheckBox to be set
     */

    //Confirmation
    let confirmation = confirm("Are you sure you?")
    if (!confirmation) {
        return
    }
    let tasks = document.getElementsByClassName(sourceCheckBox)
    let completed = [] //List of elements to be moved
    for (let i = 0; i < tasks.length; i++) {
        //If checked
        if (tasks[i].checked) {
            completed.push(tasks[i].parentNode.parentNode)
            tasks[i].parentNode.parentNode.parentNode.removeChild(tasks[i].parentNode.parentNode)
            i--
        }
    }

    //To move elements to destination
    for (let i = 0; i < completed.length; i++) {
        let temp = completed[i].getElementsByTagName("input")
        for (let j = 0; j < temp.length; j++) {
            temp[j].setAttribute("class", destinationCheckBox)
            temp[j].checked = false
        }
        document.getElementById(destinationTable).appendChild(completed[i])
    }

}

function DeleteTask(className) {
    /*
    Deleted checked tasks
    className : class of tasks to be deleted
     */

    //Confirmation
    let confirmation = confirm("Are you sure you want to delete?")
    if (!confirmation) {
        return
    }

    //Remove checked tasks
    let tasks = document.getElementsByClassName(className)
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].checked) {
            tasks[i].parentNode.parentNode.parentNode.removeChild(tasks[i].parentNode.parentNode)
            i--
        }
    }
}

setMinDate() //set min,value of deadline at load
setInterval(markLate, 60000) //call markLate every minute