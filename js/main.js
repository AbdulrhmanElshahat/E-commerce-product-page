// elements
let 
openMenuBtn = document.querySelector('.menu'),
closeMenuBtn = document.querySelectorAll('.close'),
menu = document.querySelector('.list'),
overLay =document.querySelector('.over-lay'),
overLayPhoto =document.querySelector('.over-lay-photo'),
cartIcon = document.querySelector('.icon-cart'),
cart = document.querySelector('.cart'),
bigPhoto = document.querySelector('.product .product-1'),
smallPhotoActive= document.querySelector('.product .small .active'),
smallPhoto = Array.from(document.querySelectorAll('.product .small div')),
bigPhotoOver = document.querySelector('.over-lay-photo .product-1'),
smallPhotoActiveOver= document.querySelector('.over-lay-photo.small .active'),
smallPhotoOver = Array.from(document.querySelectorAll('.over-lay-photo .small div')),
nextBtn = document.querySelectorAll('.next'),
previoustBtn = document.querySelectorAll('.previous'),
minusPlusBtn= document.querySelectorAll('.count img'),
counterValue= document.querySelector('.much'),
addBtn = document.querySelector('.add'),
notification = document.querySelector('.notification'),
empty = document.querySelector('.empty'),
cartContent =document.querySelector('.cart-content'),
many = document.querySelector('.many'),
price = document.querySelector('.value-mony'),
deleteBtn = document.querySelector('.delete'),
checkoutBtn = document.querySelector('.check')
photoSrc = [
    'images/image-product-1.jpg',
    'images/image-product-2.jpg',
    'images/image-product-3.jpg',
    'images/image-product-4.jpg',
];
// Star elements status in locale storage

// menu
if(localStorage.menuStatus){
    showElement(overLay)
    showElement(menu)
}
// cart
if(localStorage.cartStatus > 1){cart.classList.add('show')}
// big photo
if(localStorage.bigPhoto){ activeTheBigPhoto(smallPhoto , bigPhoto)}
if(localStorage.bigPhoto){ activeTheBigPhoto(smallPhotoOver , bigPhotoOver)}
// over-lay-photo
if(localStorage.overBig){
    showElement(overLayPhoto)
    showElement(overLayPhoto)
}

if(localStorage.items>= 1){
    localStorage.count = 0
    hidElement(empty)
    showElement(notification)
    notification.textContent = localStorage.items
    showElement(cartContent)
    many.textContent = localStorage.items
    price.textContent = `$${localStorage.items * 125}.00`
    showElement(checkoutBtn)
}
// End elements status in locale storage

// Open menu
openMenuBtn.addEventListener('click', _=>{
    showElement(overLay)
    showElement(menu)
    setLocal('menuStatus' , 'flex')
})
// close menu
closeMenuBtn.forEach(ele =>{
    ele.addEventListener('click', (e)=>{
        hidElement(overLay)
    if(e.target.alt === 'close-menu'){
        hidElement(menu)
        removeLocal('menuStatus')
    }else{
     hidElement(overLayPhoto)
     activeTheBigPhoto(smallPhoto , bigPhoto)
     removeLocal('overBig')
    }
})
})
// open and close cart 
cartIcon.onclick = _=> toggleCart()
notification.onclick = _=> toggleCart()
// small photo when click
smallPhoto.forEach((ele , index) => clickActive(ele , smallPhoto , bigPhoto , index));
smallPhotoOver.forEach((ele , index) => clickActive(ele , smallPhotoOver , bigPhotoOver , index));

// open over lay Photo
bigPhoto.onclick = function(){
    if(window.innerWidth > 1024){
        showElement(overLayPhoto)
        showElement(overLay)
        setLocal('overBig', 'flex')
    }
}
nextPrevious(nextBtn)
nextPrevious(previoustBtn)

minusPlusBtn.forEach(ele =>{
    ele.addEventListener('click', (e)=>{
        let counterValueToNum = parseFloat(counterValue.textContent) //convert to number
        if(e.target.classList.contains('minus') && counterValueToNum >= 1){
            counterValue.textContent = counterValueToNum - 1
        }
        if(e.target.classList.contains('plus')){
            counterValue.textContent = counterValueToNum + 1
        }
    })
})
// add to cart method
addBtn.onclick = function(){
    setLocal('count' , counterValue.textContent);
    if(localStorage.count >= 1){
        hidElement(empty)
        showElement(notification)
        notification.textContent = localStorage.count //count of sneaker
        showElement(cartContent)
        many.textContent = localStorage.count
        price.textContent = `$${many.textContent * 125}.00`
        showElement(checkoutBtn)
        counterValue.textContent = 0;
        setLocal('items' , notification.textContent)
    }
}
// delete method
deleteBtn.onclick = function(){
    showElement(empty)
    hidElement(notification)
    hidElement(cartContent)
    hidElement(checkoutBtn)
    removeLocal('items')
}
// next and previous button
function nextPrevious(btn){
    btn.forEach(ele =>{
        ele.addEventListener('click', _=>{
            let x = parseFloat(localStorage.bigPhoto) ; 
            if(btn === nextBtn){x +=1; }else{x-=1;}
            if(x >= 0  && x<= photoSrc.length -1){ //not first photo or not last photo
                localStorage.bigPhoto = x
                activeTheBigPhoto (smallPhotoOver , bigPhotoOver)
                activeTheBigPhoto (smallPhoto, bigPhoto)
            }
        })
    })}

//Active clicked  
function clickActive(e , rem , big , i){
    e.addEventListener('click' , _=>{
        rem.forEach(photo =>{photo.classList.remove('active')})
        e.classList.add('active')
        big.src = photoSrc[i]
        setLocal('bigPhoto' , i)
    })
}
// toggleCart
function toggleCart(){
    cart.classList.toggle('show')
    setLocal('cartStatus' , cart.classList.length)
}
// set in local
function setLocal(theKey, val){ localStorage.setItem(theKey,val)}
//remove from local
function removeLocal(theKey){ localStorage.removeItem(theKey) }
// hide element
function hidElement(ele){ ele.style.display = 'none'}
// show element
function showElement(ele){ele.style.display = 'flex'}
// active local
function activeTheBigPhoto (small , big){
    small.forEach(ele => ele.classList.remove('active'))
    big.src = photoSrc[localStorage.bigPhoto]
    small[localStorage.bigPhoto].classList.add('active')
}
