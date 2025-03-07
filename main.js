const items = document.querySelectorAll('.item');

console.log(items);

items.forEach(item=>{
    const decrementButton = item.querySelector('.decrement');
    const numberSpan = item.querySelector('.number');
    const incrementButton = item.querySelector('.increment');

    console.log(item, decrementButton, numberSpan, incrementButton); // デバッグ用

    let number = 0;

    decrementButton.addEventListener('click',()=>{
        if(number>0){
            number --;
            numberSpan.textContent = number;
        }
    });

    incrementButton.addEventListener('click',()=>{
            number ++;
            numberSpan.textContent = number;

    });
});