
//create a first button
const button1 = document.getElementById('button1');
button1.addEventListener('click', () => {
  button1.classList.add('clicked');
});

const button2 = document.getElementById('button2');
//Button1 a second button
button2.addEventListener('click', () => {
  button2.classList.add('clicked');
})
