// setInterval()은 계속적으로 첵크하므로 비효율적. 정확도 담보못함
// intersection observer

const cards = document.querySelectorAll(".card")
// only adding and removing the class (.show)
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        // isIntersecting 이 true면 show을 넣고, false 면 제거하고
        entry.target.classList.toggle("show", entry.isIntersecting)
        //  한번 viewport에 들어오면, 추가적인 애니메이션은 없음- unobserve 하므로
        // if(entry.isIntersecting) observer.unobserve(entry.target)
    })
    // console.log(entries)
},{
    // 전체가 다 들어오면, 진행
    // threshold: 1,
    // 절반만 들어오면 진행
    // threshold: 0.5,
    // 위 아래에 100px의 마진을 갖고 하므로 threshold가 필요없음
    // rootMargin: "-100px",

    // 100px 높이 만큼 미리 만들어 놓았다가, 보여줌. 
    // 즉 Elements 박스를 열어보면 새로운 div가 밑에 만들어져 있음.
    rootMargin: "100px"
})

// lasy loading
const lastCardObserver = new IntersectionObserver(entries => {
    const lastCard = entries[0]
    if (!lastCard.isIntersecting) return
    loadNewCards()
    lastCardObserver.unobserve(lastCard.target)
    lastCardObserver.observe(document.querySelector(".card:last-child"))
}, {})

lastCardObserver.observe(document.querySelector(".card:last-child"))

cards.forEach(card => {
    observer.observe(card)
})

const cardContainer = document.querySelector(".card-container");

function loadNewCards () {
    for (let i = 0; i < 10 ; i++) {
        const card = document.createElement("div")
        card.textContent = "New Card"
        card.classList.add("card")
        observer.observe(card)
        cardContainer.append(card)
    }
}