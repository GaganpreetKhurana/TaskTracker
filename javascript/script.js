function addTask() {
    let taskToBeAdded = document.getElementById("taskToBeAdded").value
    let deadline = new Date(document.getElementById("deadline").value)
    if (taskToBeAdded === "" || !(deadline.getTime() === deadline.getTime())) {
        alert("Invalid Data")
        setMinDate()
        return
    }
    let now = new Date
    if (deadline.getTime() <= now.getTime()) {
        alert("Enter Future Time")
        setMinDate()
        return
    }

    let tr = document.createElement("TR")
    tr.setAttribute("name", taskToBeAdded)

    let checkBox = document.createElement("input")
    checkBox.setAttribute("type", "checkbox")
    checkBox.setAttribute("class", "toDoCheckBox")

    let taskName = document.createTextNode(taskToBeAdded)
    deadline = deadline.toString().split(" ")

    deadline = deadline[0] + " " + deadline[1] + " " + deadline[2] + " " + deadline[3] + " " + deadline[4]
    let deadlineTag = document.createTextNode(deadline)

    let td = []
    for (let i = 0; i < 4; i++) {
        td.push(document.createElement("TD"))
    }
    td[1].appendChild(checkBox)
    td[2].appendChild(taskName)
    td[3].appendChild(deadlineTag)
    for (let i = 0; i < 4; i++) {
        tr.appendChild(td[i])
    }

    document.getElementById("toDo").appendChild(tr)
    document.getElementById("addTaskForm").reset()
    setMinDate()
    alert("Task Added")
}

function setMinDate() {
    let present = new Date
    document.getElementById("deadline").setAttribute("min", present.toISOString().split('Z')[0])
    document.getElementById("deadline").setAttribute("value", present.toISOString().split('Z')[0])
}

function markLate() {
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
    let confirmation = confirm("Are you sure you?")
    if (!confirmation) {
        return
    }
    let tasks = document.getElementsByClassName(sourceCheckBox)
    let completed = []
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].checked) {
            completed.push(tasks[i].parentNode.parentNode)
            tasks[i].parentNode.parentNode.parentNode.removeChild(tasks[i].parentNode.parentNode)
            i--
        }
    }
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
    let confirmation = confirm("Are you sure you want to delete?")
    if (!confirmation) {
        return
    }
    let tasks = document.getElementsByClassName(className)
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].checked) {
            tasks[i].parentNode.parentNode.parentNode.removeChild(tasks[i].parentNode.parentNode)
            i--
        }
    }
}

setMinDate()
setInterval(markLate, 60000)