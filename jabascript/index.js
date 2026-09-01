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
// {
//     "id": 5,
//     "level": 1,
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার"
// }
const displayLevelWord = (words) =>{
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = ""

    words.forEach((word) => {
        console.log(word)
        const card = document.createElement("div")
        card.innerHTML=`
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-2">
          <h2 class="font-bold text-2xl">${word.word}</h2>
          <p class="font-semibold">Meaning /Pronounciation</p>
          <div class="font-medium text-2xl font-bangla">"${word.meaning}/ ${word.pronunciation}"</div>
          <div class="flex justify-between items-center">
            <button class="btn bg-[#1A91FF12] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1A91FF12] hover:bg-[#1A91FF80
            ]"><i class="fa-solid fa-volume"></i></button>
          </div>
       </div>
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
