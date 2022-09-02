class hsModal extends HTMLElement {
    openBtn = null;
    closeBtn = null;
    id = null;
    closeCb = null;
    openCb = null;
    innerDiv = null;

    lastScrollPos = 0;
    MAX_SCROLL_POS = 150;

    connectedCallback() {
        this.id = this.getAttribute("id");
        if (!this.id) {
            console.error("[HSH-Modal] - Modal should have an ID.");
            return;
        }
        
        this.openBtn    = document.querySelector(`.hs-Modal-Btn.open[target="#${this.id}"]`);
        this.closeBtn   = this.querySelector(`.hs-Modal-Btn.close`);
        this.innerDiv   = this.querySelector(".hs-Modal-Inner");
        this.title      = this.querySelector(".hs-Modal-Title").innerHTML;

        this.openEvtHandler();
        this.closeEvtHandler();
        this.scrollEvtHandler();
    }

    scrollEvtHandler() {
        let headNav = this.querySelector(".hs-Modal-Header");
        let self = this;
        this.innerDiv.addEventListener("scroll", function (e) {
            let scrollTop = this.scrollTop;
            if (scrollTop >= self.MAX_SCROLL_POS) {
                if (scrollTop < self.lastScrollPos) {
                    headNav.classList.remove("scrolled");
                } else if (!headNav.classList.contains("scrolled")) {
                    headNav.classList.add("scrolled");
                }
            } else if (scrollTop < self.MAX_SCROLL_POS) {
                headNav.classList.remove("scrolled");
            }
            self.lastScrollPos = scrollTop;
        });
    };

    on(type, callback) {
        if (type == "close") {
            this.closeCb = callback;
        } else if (type == "open") {
            this.openCb = callback;
        } else {
            console.warn(`[HSH-Modal] - No such event type on HsH Modal. Event: ${type}`);
        }
    }

    openEvtHandler() {
        let self = this;
        this.openBtn.addEventListener("click", function (e) {
            e.preventDefault();
            self.open();
        });
    }

    closeEvtHandler() {
        let self = this;
        // Close if close button clicked.
        this.closeBtn.addEventListener("click", function (e) {
            e.preventDefault();
            self.close();
        });
        // Close if clicked outside the modal
        this.addEventListener("click", function (e) {
            let modalInner = e.target.closest(".hs-Modal-Inner");
            if (!modalInner) {
                self.close();
            }
        });
    }

    // Setters
    close(shouldCB = true) {
        if (this.closeCb && shouldCB) { this.closeCb(this.id); }
        this.classList.remove("open");
    }

    open(shouldCB = true) {
        if (this.openCb && shouldCB) { this.openCb(this.id); }
        this.classList.add("open");
    }

    setTitle( title ){
        let titleElem       = this.querySelector(".hs-Modal-Title");
        titleElem.innerHTML = title;
        this.title          = title;
        return title;
    }

    // Getters

    getTitle(){
        return this.title;
    }

    getID(){
        return this.id;
    }
};
customElements.define('hs-modal', hsModal);


/************************* TEST BELOW *************************
 
let testModal = document.querySelector("#testModal");
 
testModal.on("open",function(id){
  console.log(`Modal opened with id: ${id}`);
});
testModal.on("close",function(id){
  console.log(`Modal closed with id: ${id}`);
});
 
testModal.on("noSuchEvent",function(id){
  //no such event
});
 
testModal.open();
setTimeout(function(){
  testModal.close();
}, 3000);
 
 
console.log( `Modal title: ${testModal.getTitle()}` );
testModal.setTitle("A new title with horses");
console.log( `Modal title: ${testModal.getTitle()}` );

*/
