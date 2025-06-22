const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();

upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});

img.onload = () => {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  applyFilters();
};

const brightness = document.getElementById("brightness");
const contrast = document.getElementById("contrast");
const blur = document.getElementById("blur");
const sharpness = document.getElementById("sharpness");

[brightness, contrast, blur, sharpness].forEach((input) => {
  input.addEventListener("input", applyFilters);
});

function applyFilters() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.filter = `
    brightness(${brightness.value}%)
    contrast(${contrast.value}%)
    blur(${blur.value}px)
  `;
  ctx.drawImage(img, 0, 0);
}

document.getElementById("download").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "refaced-image.png";
  link.href = canvas.toDataURL();
  link.click();
});
