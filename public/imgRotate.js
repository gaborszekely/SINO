const colors = ["green", "blue", "red", "yellow"];
const images = [
  "https://picsum.photos/600/600",
  "https://picsum.photos/580/580",
  "https://picsum.photos/590/590",
  "https://picsum.photos/610/610"
];

let total = colors.length;
let stopRotate = false;
let div = document.getElementById("div");

window.addEventListener("load", startRotate);

// document
//   .getElementById("stop")
//   .addEventListener("click", () => (stopRotate = true));
document.getElementById("start").addEventListener("click", () => {
  stopRotate == true ? (stopRotate = false) : (stopRotate = true);
  startRotate();
});
// document.getElementById("start").addEventListener("click", () => {
//   stopRotate = false;
//   startRotate();
// });
// document.getElementById("one").addEventListener("click", () => {
//   total = 1;
//   startRotate();
// });
// document.getElementById("two").addEventListener("click", () => {
//   total = 2;
//   startRotate();
// });
// document.getElementById("three").addEventListener("click", () => {
//   total = 3;
//   startRotate();
// });
// document.getElementById("four").addEventListener("click", () => {
//   total = 4;
//   startRotate();
// });

function startRotate() {
  // const image = document.getElementById("image");
  if (stopRotate == false) {
    if (--total >= 0) {
      div.style.background = `url(${images[total]})`;
      console.log(`Count: ${total}`);
      setTimeout(() => startRotate(), 3000);
    } else {
      total = colors.length;
      startRotate();
    }
  }
}
