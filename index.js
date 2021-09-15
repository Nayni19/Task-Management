let globalTaskData = []
taskContents = document.getElementById("taskContents");
const addCard = () => {
    const newTaskDetails = {
        id: `${Date.now()}`,
        url: document.getElementById("img-url").value,
        title: document.getElementById("task-title").value,
        type: document.getElementById("task-type").value,
        description: document.getElementById("task-desc").value
    };
    console.log(newTaskDetails);
    console.log(taskContents);
    taskContents.insertAdjacentHTML('beforeend', generateTaskCard(newTaskDetails));
    globalTaskData.push(newTaskDetails);
    saveToLocalStorage();
}

const generateTaskCard = ({ id, url, title, type, description }) => {
    return (`<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
    <div class="card">
        <div class="card-header">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-outline-dark"><i
                        class="bi bi-pencil-fill"></i></button>
                <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask(this)"><i
                        class="bi bi-trash-fill"></i></button>
            </div>
        </div>
            <img src=${url} class="card-img-top" alt="Image"/>
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <span class="badge bg-dark">${type}</span>
            </div>
        <div class="card-footer">
            <button type="button" class="btn btn-outline-dark float-end">OPEN TASK</button>
          </div>
    </div>
</div>`)
}

const saveToLocalStorage = ()=> {
    localStorage.setItem("tasky", JSON.stringify({tasks: globalTaskData}))
}
const reloadTaskCard = ()=> {
    const localStorageCopy = JSON.parse(localStorage.getItem("tasky"));
    if(localStorageCopy){
        globalTaskData = localStorageCopy["tasks"];
    }
    globalTaskData.map((cardData)=>{
        taskContents.insertAdjacentHTML('beforeend', generateTaskCard(cardData));
    }) 
}

const deleteTask = (e) => {
    const targetID = e.getAttribute("name");
    globalTaskData = globalTaskData.filter((cardData) => cardData.id!==targetID);
    saveToLocalStorage();
    window.location.reload();
}