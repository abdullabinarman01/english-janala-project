const loadLesson = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data))
}

const loadLevelWord = (id) =>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res) => res.json())
    .then((json) => displayLevelWord(json.data))
}

const displayLevelWord = (words) =>{
    const wordContainer = document.getElementById("word-container");
    // wordContainer.innerHTML = ""

    words.forEach((word) => {
        console.log(word)
        const card = document.createElement("div")
        card.innerHTML=`
        <p>cat</p>
        `
        wordContainer.append(card)
    });
}

const displayLesson = (lessons) =>{
    //1.get container and empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";


    //2. get into every lesson
    for( let lesson of lessons){
        //3.Create element
        const btnDiv = document.createElement("div");
        
        btnDiv.innerHTML = `
        <button class="btn btn-soft btn-primary" onclick="loadLevelWord(${lesson.level_no})">
        <i class="fa-solid fa-book-open"></i>Lesson -${lesson.level_no}</button>
        `
        //4.append into container
        levelContainer.append(btnDiv)
    }
}
loadLesson()
