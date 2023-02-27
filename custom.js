const gameStart = () => {
  let game = document.querySelector(".game");
  let basket = document.querySelector(".basket");
  let fruitsParent = document.querySelector(".fruits");
  let basketLeft = parseInt(
    window.getComputedStyle(basket).getPropertyValue("left")
  );
  let basketBottom = parseInt(
    window.getComputedStyle(basket).getPropertyValue("bottom")
  );
  const gameOverText = document.querySelector(".gameOver-text");
  const reloadIcon = document.querySelector(".reload");
  const scoreCount = document.querySelector(".score");
  const allFruits = document.querySelectorAll(".fruit");

  if (allFruits != null || allFruits != undefined) {
    fruitsParent.textContent = "";
  }

  gameOverText.classList.add("hidden");
  reloadIcon.classList.add("hidden");
  document.querySelector(".restart").style = "display: none";

  let score = 0;
  let gameOver = false;
  scoreCount.innerText = `score: ${score}`;

  if (document.getElementById("gameOverContainer")) {
    game.removeChild(gameOverContainer);
    game.removeChild(reload);
  }

  const moveBasketLeft = () => {
    if (basketLeft > 10) {
      basketLeft -= 16;
      basket.style.left = basketLeft + "px";
    }
  };

  const moveBasketRight = () => {
    if (basketLeft < 620) {
      basketLeft += 16;
      basket.style.left = basketLeft + "px";
    }
  };

  const control = (e) => {
    if (e.key === "ArrowLeft") {
      moveBasketLeft();
    }
    if (e.key === "ArrowRight") {
      moveBasketRight();
    }
  };

  const generateFruites = () => {
    let fruitBottom = 400;
    let fruitLeft = Math.floor(Math.random() * 620);

    let fruit = document.createElement("div");
    fruit.setAttribute("class", "fruit");
    fruitsParent.appendChild(fruit);
    let appleImage = document.createElement("img");
    appleImage.setAttribute("class", "appleImage");
    appleImage.setAttribute("src", "./apple.svg");
    fruit.appendChild(appleImage);
    fruit.style.left = fruitLeft + "px";

    const fallDownFruits = () => {
      if (
        fruitBottom < basketBottom + 50 &&
        fruitBottom > basketBottom &&
        fruitLeft > basketLeft - 30 &&
        fruitLeft < basketLeft + 80
      ) {
        fruitsParent.removeChild(fruit);
        clearInterval(fallingInterval);
        score++;
        if (gameOver === false) scoreCount.innerText = `score: ${score}`;
      }
      if (fruitBottom < basketBottom) {
        clearInterval(fallingInterval);
        clearInterval(fruitTimeout);
        gameOverText.classList.remove("hidden");
        reloadIcon.classList.remove("hidden");
        scoreCount.innerText = `score: ${score}`;
        gameOver = true;
        document.querySelector(".restart").style = "display: block";
      }

      fruitBottom -= 4;
      fruit.style.bottom = fruitBottom + "px";
    };

    const fallingInterval = setInterval(fallDownFruits, 20);
  };

  const fruitTimeout = setInterval(generateFruites, 1300);

  document.addEventListener("keydown", control);

  game.addEventListener("click", gameStart);
};

gameStart();
