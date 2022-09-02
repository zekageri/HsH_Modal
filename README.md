# HsH_Modal
This is a custom HTML element which will simplify the modal creation

- Created only with pure javascript. ( No dependency except the stlyesheet )
- Handles the open and close events automatically. ( Must create open button separately )
  - Can be closed with the close button or outside click ( or programmatically )
- on("open") and on("close") callback handle
- Header opacity adjust on modal body scroll if needed.
- Programmatically close or open
- Setter / getter for title.

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
let testModal = document.querySelector("#testModal");
 
testModal.on("open",function(id){
  console.log(`Modal opened with id: ${id}`);
});
testModal.on("close",function(id){
  console.log(`Modal closed with id: ${id}`);
});
 
 // Test non existent events ( Throws console error )
testModal.on("noSuchEvent",function(id){
  //no such event
});
 
testModal.open();
setTimeout(function(){
  testModal.close();
}, 3000);
```


HTML Format:

```HTML
<button class="hs-Modal-Btn open" target="#testModal">Open Modal</button>
<hs-modal class="hs-Modal-Outer" id="testModal">
    <div class="hs-Modal-Inner">
        <div class="hs-Modal-Header">
            <span class="hs-Modal-Title"> A test modal </span>
            <button class="hs-Modal-Btn close">X</button>
        </div>
        <div class="hs-Modal-body">
        </div>
    </div>
</hs-modal>
```
