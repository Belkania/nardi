// 1) create board 12 x 12 DONE
// 2) 6 and 7 horizontal ROW is for extra slots DONE
// 3) playes can take slots from top
// 4) from the begginins  after game starts , player can move slots one firection
// 5) 2 dice randomizer DONE
// 6) start pozitions for each slot DONE
// 7) when you have one slot on point its can be heated
// 8) need 15 black slot another 15 shite slots DONE
// 9) need start game DONE
// 10) when slot is dragged we can do it with multiple slots and for that need max avaliable vars for holding elements data

const board = document.querySelector(".mainScreen");
const eachSquare = document.getElementsByClassName("slot");
const dice1 = document.querySelector(".dice1");
const dice2 = document.querySelector(".dice2");
// const draggableElement1 = document.querySelector(".slotWhite");
// const draggableElement2 = document.querySelector(".slotBlack");
const apply = document.querySelector(".apply");
const cancel = document.querySelector(".cancel");
const p1 = document.querySelector(".p1");
const p2 = document.querySelector(".p2");

let whites = [0, 11, 12, 23, 35, 47, 59, 89, 101, 113, 115, 125, 127, 137, 139];
let blacks = [5, 7, 17, 19, 29, 31, 41, 53, 95, 107, 119, 120, 131, 132, 143];
let posX = 0;
let posY = 0;
let allow = true;
let moveCount = 2;
let topIndex = false;
let bottomIndex = false;
let dragged,
  dragged2,
  dragged3,
  dragged4,
  parent,
  parent2,
  parent3,
  parent4,
  prevParent,
  prevParent2,
  prevParent3,
  prevParent4 = null;

let player1 = {
  dir: "direct",
  active: true,
};

let player2 = {
  dir: "reverse",
  active: false,
};

const rollDice = () => {
  for (let i = 0; i < 2; i++) {
    let random = Math.floor(Math.random() * 6) + 1;
    if (i === 1) {
      num1 = random;
      dice1.innerHTML = num1;
    } else {
      num2 = random;
      dice2.innerHTML = num2;
    }
  }

  num1 === num2 ? moveCount = 4 : moveCount = 2;
};

dice1.addEventListener("click", rollDice);

const startGame = () => {
  board.innerHTML = "";
  p1.style.backgroundColor = "green";

  for (let i = 0; i < 144; i++) {
    const div = document.createElement("div");
    let imgClass = "triangle";
    let imgSrc = "img/triangle.svg";
    div.setAttribute("class", "slot");
    div.setAttribute("id", i);
    div.style.width = `${98 / 12}%`;
    div.style.height = `${100 / 12}%`;
    const img = document.createElement("img");
    img.style.height = `${100 * 5}%`;
    img.style.opacity = "0.7";

    if (i < 12) {
      div.appendChild(img);
      
      imgClass = "triangle";
      imgSrc = "img/triangle.svg";
    }

    if (i > 131) {
      div.appendChild(img);

      imgClass = "triangle2";
      imgSrc = "img/triangleRevert.svg";
    }

    if (i % 2 === 1) img.style.opacity = "0.35";

    img.setAttribute("src", imgSrc);
    img.setAttribute("class", imgClass);

    if (
      i === 5 ||
      i === 17 ||
      i === 29 ||
      i === 41 ||
      i === 53 ||
      i === 65 ||
      i === 77 ||
      i === 89 ||
      i === 101 ||
      i === 113 ||
      i === 125 ||
      i === 137
    )
      div.style.marginRight = "2%";

    board.appendChild(div);
  }

  const div2 = document.createElement("div");
  div2.setAttribute("class", "verticalLIne");
  board.appendChild(div2);

  placeSlots();
};

const init = () => {
  const div = document.createElement("div");
  div.setAttribute("class", "startBtn");
  div.textContent = "Start Game";
  div.addEventListener("click", startGame);
  board.appendChild(div);
};

const placeSlots = () => {
  for (let i = 0; i < 144; i++) {
    let slotDiv = document.createElement("div");
    let slotClass = "whiteSlot";

    if (
      i === 0 ||
      i === 11 ||
      i === 12 ||
      i === 23 ||
      i === 35 ||
      i === 47 ||
      i === 59 ||
      i === 89 ||
      i === 101 ||
      i === 113 ||
      i === 115 ||
      i === 125 ||
      i === 127 ||
      i === 137 ||
      i === 139
    ) {
      slotDiv.setAttribute("id", i);
      eachSquare[i].appendChild(slotDiv);
    }

    if (
      i === 5 ||
      i === 7 ||
      i === 17 ||
      i === 19 ||
      i === 29 ||
      i === 31 ||
      i === 41 ||
      i === 53 ||
      i === 95 ||
      i === 107 ||
      i === 119 ||
      i === 120 ||
      i === 131 ||
      i === 132 ||
      i === 143
    ) {
      slotDiv.setAttribute("id", i);
      eachSquare[i].appendChild(slotDiv);
      slotClass = "blackSlot";
    }

    slotDiv.setAttribute("class", slotClass);
    slotDiv.setAttribute("draggable", "true");

    slotDiv.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", ""); // Required for Firefox
      // You can add additional data if needed using setData
      // e.dataTransfer.setData('text/plain', 'some custom data');
      //   console.log("start", e);
    });

    slotDiv.addEventListener("drag", (e) => {
      if (e.screenX > 0 || e.screenY > 0) {
        if (!dragged && allow) {
          dragged = e.target;
          allow = false;
        }

        if (!dragged2 && allow) {
          dragged2 = e.target;
          allow = false;
        }

        if (!dragged3 && allow) {
          dragged3 = e.target;
          allow = false;
        }

        if (!dragged4 && allow) {
          dragged4 = e.target;
          allow = false;
        }

        if (!parent && allow) {
          parent = e.target.parentNode;
          allow = false;
        }

        if (!parent2 && allow) {
          parent2 = e.target.parentNode;
          allow = false;
        }

        if (!parent3 && allow) {
          parent3 = e.target.parentNode;
          allow = false;
        }

        if (!parent4 && allow) {
          parent4 = e.target.parentNode;
          allow = false;
        }

        posX = e.clientX;
        posY = e.clientY;
      }
    });

    slotDiv.addEventListener("dragend", (e) => {
      if (moveCount > 0) {
        let slotWidth = board.getBoundingClientRect().width / 12;
        let slotHeight = board.getBoundingClientRect().height / 12;
        let slotIndex = null;
        let slots = whites;
        let draggedId = parseInt(
          dragged4
            ? dragged4.id
            : dragged3
            ? dragged3.id
            : dragged2
            ? dragged2.id
            : dragged.id
        );

        if (player2.active) slots = blacks;

        for (let i = 0; i < eachSquare.length; i++) {
          let current = eachSquare[i].getBoundingClientRect();

          if (
            posX > current.left &&
            posX < current.left + slotWidth &&
            posY > current.top &&
            posY < current.top + slotHeight
          ) {
            slotIndex = i;
          }
        }

        if (slotIndex < 72) topIndex = slotIndex - 24;
        if (slotIndex > 71) bottomIndex = slotIndex + 24;

        console.log(topIndex, bottomIndex)

        while (slotIndex > 12) {
          slotIndex -= 12;
        }

        for (let k = 0; k < 12; k++) {
          let curEl = eachSquare[slotIndex];
          slotIndex += 12;
          
          for (let i = 0; i < curEl.children.length; i++) {
            if (
              (curEl.children[i].classList.contains("whiteSlot") ||
              curEl.children[i].classList.contains("blackSlot")) &&
              curEl.children[i]?.nodeName !== "IMG" &&
              curEl.children[i].length
            ) {
              let curId = parseInt(curEl.id);
              console.log('lala2')
              if (!prevParent && dragged) prevParent = eachSquare[curId + 12];
              if (!prevParent2 && dragged2)
                prevParent2 = eachSquare[curId + 12];
              if (!prevParent3 && dragged3)
                prevParent3 = eachSquare[curId + 12];
              if (!prevParent4 && dragged4)
                prevParent4 = eachSquare[curId + 12];
              break;
            }
            
            if (
              !curEl.children[i].length ||
              curEl.children[i]?.nodeName === "IMG"
            ) {
              console.log('lala')
              if (!prevParent && dragged) prevParent = eachSquare[topIndex ? topIndex : bottomIndex];
              if (!prevParent2 && dragged2) prevParent2 = eachSquare[topIndex ? topIndex : bottomIndex];
              if (!prevParent3 && dragged3) prevParent3 = eachSquare[topIndex ? topIndex : bottomIndex];
              if (!prevParent4 && dragged4) prevParent4 = eachSquare[topIndex ? topIndex : bottomIndex];
            }
          }
        }
        // continue from : we cannot catch childrens !!
        for (let j = 0; j < slots.length; j++) {
          if (draggedId === slots[j]) {
            if (prevParent4) {
              prevParent4.appendChild(dragged4);
            } else if (prevParent3) {
              prevParent3.appendChild(dragged3);
            } else if (prevParent2) {
              prevParent2.appendChild(dragged2);
            } else {
              prevParent.appendChild(dragged);
            }
          }
        }

        allow = true;
        moveCount--;
        topIndex = false;
        bottomIndex = false;
      }
    });
  }
};

const handleApply = () => {
  player1.active = !player1.active;
  player2.active = !player2.active;
  p1.style.backgroundColor = player1.active ? "green" : "white";
  p2.style.backgroundColor = player2.active ? "green" : "white";
  parent = null;
  parent2 = null;
  parent3 = null;
  parent4 = null;
  prevParent = null;
  prevParent2 = null;
  prevParent3 = null;
  prevParent4 = null;
  dragged = null;
  dragged2 = null;
  dragged3 = null;
  dragged4 = null;
  allow = true;
};

const handleCancel = () => {
  if (parent && prevParent && dragged) {
    parent.appendChild(dragged);
  }
};

const moveSlot = () => {};

// Calling functions
apply.addEventListener("click", handleApply);
cancel.addEventListener("click", handleCancel);

init();
