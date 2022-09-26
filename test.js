let testModal = document.querySelector("#testModal");
let testModal2 = document.querySelector("#testModal2");

testModal.on("open", function (id) {
    console.log(`Modal opened with id: ${id}`);
});
testModal.on("close", function (id) {
    console.log(`Modal closed with id: ${id}`);
});

testModal.on("noSuchEvent", function (id) {
    //no such event
});

testModal.open();
setTimeout(function () {
    testModal.close();
}, 1500);

testModal2.on("save", function (data) {
    console.log("modalFormData: ", data);
    testModal2.resetForm();
});
let modalFormData = testModal2.getForm();
console.log("modalFormData: ", modalFormData);


/* test dynamic btn modal */

setTimeout(() => {
    let body = document.querySelector("body");
    body.insertAdjacentHTML("beforeend",`<button class="hs-Modal-Btn open" target="#dynamicBtnModal">Open dynamic modal</button>`);
}, 1500);