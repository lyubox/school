// Zero Test - Add
document.body.innerHTML = `
   <h1>Christmas Gifts Delivery</h1>
    <div class="container">

        <section class="card">
            <h2>Add gifts</h2>
            <div>
                <input type="text" placeholder="Gift name" />
                <button>Add gift</button>
            </div>
        </section>
        <section class="card">
            <h2>List of gifts</h2>
            <ul>

            </ul>
        </section>
        <section class="card">
            <h2>Sent gifts</h2>
            <ul>

            </ul>
        </section>
        <section class="card">
            <h2>Discarded gifts</h2>
            <ul>

            </ul>
        </section>
    </div>
`;

result();

let sections = document.querySelectorAll('section');
let addBtn = sections[0].children[1].children[1];
let inputField = sections[0].children[1].children[0];

inputField.value = 'b';

addBtn.click();

let listOfGifts = sections[1].children[1].children;
assert.equal(listOfGifts.length, 1, 'list of gifts length is not correct');
assert.equal(listOfGifts[0].textContent, 'bSendDiscard', 'gift in not added correctly');
assert.equal(listOfGifts[0].children.length, 2, 'gift does not have buttons');
assert.equal(listOfGifts[0].children[0].tagName, 'BUTTON', 'gift does not have buttons');
assert.equal(listOfGifts[0].children[1].tagName, 'BUTTON', 'gift does not have buttons');

// sorting
inputField.value = 'a';
addBtn.click();
assert.equal(listOfGifts[0].textContent, 'aSendDiscard', 'gift in not added correctly');
assert.equal(listOfGifts[1].textContent, 'bSendDiscard', 'gift in not added correctly');
