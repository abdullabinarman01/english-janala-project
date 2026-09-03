const createElements = (arr) =>{
    const htmlElements = arr.map ((el) => `<span class="btn">${el}</span>`) 
    console.log(htmlElements)
    const htmltag= htmlElements.join(" ")
    console.log(htmltag);
    return htmltag
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) =>{
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("word-container").classList.add("hidden")
    }else{
        document.getElementById("word-container").classList.remove("hidden")
        document.getElementById("spinner").classList.add("hidden")
    }
}

const loadLesson = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data))
}

const removeActiveClass = () =>{
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    lessonButtons.forEach((btn) => btn.classList.remove("active"));
}

const loadLevelWord = (id) =>{
    manageSpinner(true)
    // const clickBtn = document.getElementById(`Btn-lesson-${id}`)
    //     clickBtn.classList.add("active")
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res) => res.json())
    .then((json) => {
        removeActiveClass()//remove active class
        const clickBtn = document.getElementById(`Btn-lesson-${id}`)
        clickBtn.classList.add("active") //adding active class
        displayLevelWord(json.data)
    })
}

const loadWordDetails = async (id) =>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data)
}

// "data": {
// "word": "Eager",
// "meaning": "আগ্রহী",
// "pronunciation": "ইগার",
// "level": 1,
// "sentence": "The kids were eager to open their gifts.",
// "points": 1,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "enthusiastic",
// "excited",
// "keen"
// ],
// "id": 5
// }

const displayWordDetails = (word) => {
    // console.log(word)
    const detailBox = document.getElementById("details-container")
    detailBox.innerHTML=`
    <div class="">
        <h2 class="text-2xl font-bold">
          ${word.word}(<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})
        </h2>
      </div>
      <div class="">
        <h2 class="font-bold">
          Meaning
        </h2>
        <p>${word.meaning}</p>
      </div>
      <div class="">
        <h2 class="font-bold">Example</h2>
        <p>${word.sentence}</p>
      </div>
      <div>
        <h2 class="font-bold">Synonym</h2>
        <div>
         ${createElements(word.synonyms)}
      </div>
      </div>
    `
    document.getElementById("word_modal").showModal()
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
    if(words.length == 0){
        wordContainer.innerHTML = `
        
        <div class="text-center col-span-full py-10 space-y-4  font-bangla">
        <img src="./assets/alert-error.png" class="mx-auto" alt=""/>
        <p class="font-medium text-gray-500 text-xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি</p>
        <h1 class="font-bold text-4xl">নেক্সট Lesson এ যান</h1>
       </div>
        `
        manageSpinner(false)
        return
    }

    words.forEach((word) => {
        console.log(word)
        const card = document.createElement("div")
        card.innerHTML=`
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-2">
          <h2 class="font-bold text-2xl">${word.word? word.word : "Could't find word"}</h2>
          <p class="font-semibold">Meaning /Pronounciation</p>
          <div class="font-medium text-2xl font-bangla">${word.meaning? word.meaning:"can't find meaning"}/ ${word.pronunciation ? word.pronunciation:"can't find pronunciation"}</div>
          <div class="flex justify-between items-center">
            <button class="btn bg-[#1A91FF12] hover:bg-[#1A91FF80]"onclick="loadWordDetails(${word.id})"><i class="fa-solid fa-circle-info"></i></button>
            <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF12] hover:bg-[#1A91FF80]
            "><i class="fa-solid fa-volume"></i></button>
          </div>
       </div>
        `
        wordContainer.append(card)
    });
    manageSpinner(false)
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
        <button class="btn btn-soft btn-primary lesson-btn" id="Btn-lesson-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})">
        <i class="fa-solid fa-book-open"></i>Lesson -${lesson.level_no}</button>
        `
        //4.append into container
        levelContainer.append(btnDiv)
    }
    
}
loadLesson()

document.getElementById("btn-search").addEventListener("click",() =>{
    removeActiveClass()
    const input = document.getElementById("input-search")
    const inputValue = input.value.trim().toLowerCase()
    console.log(inputValue)

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) =>{
        const allWords = data.data
        console.log(allWords)
        const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(inputValue)
    )
    displayLevelWord(filterWords)
    })
})
