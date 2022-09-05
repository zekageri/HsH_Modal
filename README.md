# HsH_Modal
This is a custom HTML element which will simplify the modal creation

- Created only with pure javascript. ( No dependency except the stlyesheet )
- Handles the open and close events automatically. ( Must create open button separately )
  - Can be closed with the close button or outside click ( or programmatically )
- on("open"), on("close") and on("save") event callback handle
- Header opacity adjust on modal body scroll if needed.
- Programmatically close or open
- Setter / getter for title.
- Getter for objectified form values if the body contains a form.
- Mobile friendly and fully responsive

Feature goals:
- Parse the inner form data ( if it has a form ) which can be called with a getter

Opener button format:
- It must have a target attribute with the id of the modal

HTML: 
```
<button class="hs-Modal-Btn open" target="#testModal">Open Modal</button>
```

Modal format:
 - It must use the following classes:
  - hs-Modal-Outer
  - hs-Modal-Inner
  - hs-Modal-Header
  - hs-Modal-Title
  - hs-Modal-Btn close
  - hs-Modal-body
  
  
  Test:

```JS
// Get the elements
let testModal = document.querySelector("#testModal");
let testModal2 = document.querySelector("#testModal2");

// Add open and close events
testModal.on("open", function (id) {
    console.log(`Modal opened with id: ${id}`);
});
testModal.on("close", function (id) {
    console.log(`Modal closed with id: ${id}`);
});

// Test non existent event
testModal.on("noSuchEvent", function (id) {
    //no such event
});

// Programmatically open and close the modal.
testModal.open();
setTimeout(function () {
    testModal.close();
}, 1500);

// Save event and data retrive in an object form if body contains a form element. ( elements must have a name attribute )
testModal2.on("save",function( data ){
    console.log("modalFormData: ", data);
    testModal2.resetForm();
});

// Get the objectified form regardless of the save button press.
let modalFormData = testModal2.getForm();
console.log("modalFormData: ", modalFormData);
```


HTML Format:

```HTML
<button class="hs-Modal-Btn open" target="#testModal">Open Modal</button>
<hs-modal class="hs-Modal-Outer" id="testModal">
    <div class="hs-Modal-Inner">
        <div class="hs-Modal-Header">
            <span class="hs-Modal-Title"> A test modal </span>
            <div class="hs-Modal-Button-Container">
                <!-- SAVE BUTTON AND THE BUTTON CONTAINER IS OPTIONAL -->
                <!-- <button class="hs-Modal-Btn save">Save</button> -->
                <button class="hs-Modal-Btn close">X</button>
            </div>
        </div>
        <div class="hs-Modal-body">
          <!-- HERE IS THE USER CONTENT -->
          <!-- MUST STYLE THIS SEPARATELLY, BASED ON USER WILL -->
        </div>
    </div>
</hs-modal>
```
