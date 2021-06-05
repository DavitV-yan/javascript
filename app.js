
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const backgroundImg = document.createElement("img");
backgroundImg.src = "files/gameBackground.jpg"

const heroImage = document.createElement("img");
heroImage.src = "files/hero.png";

const starImg = document.createElement("img");
starImg.src = "files/starIcon.webp";

const audio = document.createElement("audio");
audio.src = "files/starAudio.wav";

const mickyImage = document.createElement("img");
mickyImage.src = "files/micky.png";

const stabAudio = document.createElement("audio");
stabAudio.src = "files/audio2.mp3";

let data = {
  hero: {
    xDelta: 0,
    yDelta: 0,
    x: 15,
    y: 330,
    width: 110,
    height: 110,
  },
  bullets: [],
  mickyes: []

};

function intersect(rect1, rect2) {
  const x = Math.max(rect1.x, rect2.x),
    num1 = Math.min(rect1.x + rect1.width, rect2.x + rect2.width),
    y = Math.max(rect1.y, rect2.y),
    num2 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);
  return (num1 >= x && num2 >= y);
};

function update() {
  data.hero.x += data.hero.xDelta;
  data.hero.y += data.hero.yDelta;

  data.bullets.forEach(function (bullet) {
    data.mickyes.forEach(function (micky) {
      if (intersect(micky, bullet)) {
        stabAudio.currentTime = 0;
        stabAudio.play();
        bullet.deleteMe = true;
        micky.deleteMe = true;
      }
    });
  });

  data.bullets = data.bullets.filter(function (bullet) {
    return bullet.deleteMe !== true;
  });

  data.mickyes = data.mickyes.filter(function (micky) {
    return micky.deleteMe !== true;
  });

  data.bullets.forEach(function (bullet) {
    bullet.x += bullet.xDelta;
  });


  data.bullets = data.bullets.filter(function (bullet) {
    if (bullet.x > canvas.width) {
      return false;
    }
    return true;
  });

  data.mickyes.forEach(function (micky) {
    micky.x += micky.xDelta;
  });

  if (data.mickyes.length === 0) {
    data.mickyes.push({
      xDelta: -1,
      x: canvas.width - 100,
      y: data.hero.y,
      width: 100,
      height: 100
    });

  }

}

function drow() {

  context.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  context.drawImage(heroImage, data.hero.x, data.hero.y, data.hero.width, data.hero.height);

  data.bullets.forEach(function (bullet) {
    context.drawImage(starImg, bullet.x, bullet.y, bullet.width, bullet.height);

  });

  data.mickyes.forEach(function (micky) {
    context.drawImage(mickyImage, micky.x, micky.y, micky.width, micky.height);

  });

};

function loop() {
  requestAnimationFrame(loop);

  update();
  drow();
}
loop();

document.addEventListener("keydown", function (evt) {
  if (evt.code === "ArrowRight") {
    data.hero.xDelta = 1;
  } else if (evt.code === "ArrowLeft") {
    data.hero.xDelta = -1;
  } else {
    audio.currentTime = 0;
    audio.play();
    data.bullets.push(
      {
        xDelta: 5,
        x: data.hero.x,
        y: data.hero.y + 55,
        width: 20,
        height: 20
      }
    )
  }
});

document.addEventListener("keyup", function (evt) {
  data.hero.xDelta = 0;
});
