class hsModal extends HTMLElement {
    openBtn     = null;
    closeBtn    = null;
    id          = null;
    closeCb     = null;
    openCb      = null;
    saveCb      = null;
    innerDiv    = null;
    form        = false;

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
        this.saveBtn    = this.querySelector(`.hs-Modal-Btn.save`);

        this.innerDiv   = this.querySelector(".hs-Modal-Inner");
        this.title      = this.querySelector(".hs-Modal-Title").innerHTML;

        this.form       = this.hasForm();

        this.openEvtHandler();
        this.closeEvtHandler();
        this.saveEvtHandler();
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
        } else if ( type == "open" ) {
            this.openCb = callback;
        } else if( type == "save" ){
            this.saveCb = callback;
        }else {
            console.warn(`[HSH-Modal] - No such event type on HsH Modal. Event: ${type}`);
        }
    }

    openEvtHandler() {
        let self = this;
        if( this.openBtn ){
            this.openBtn.addEventListener("click", function (e) {
                e.preventDefault();
                self.open();
            });
        }else{
            this.addGlobalOpenHandler( self );
        }
    }

    addGlobalOpenHandler( self ){
        document.addEventListener('click', function(e){
            let buttonEl = e.target.closest(`.hs-Modal-Btn.open[target="#${self.id}"]`);
            if( buttonEl ){
                self.open();
                return false;
            }
        }, false);
    }

    saveEvtHandler(){
        if( !this.saveBtn ){return;}
        let self = this;
        this.saveBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if( !self.saveCb ){ return; }
            self.saveCb( self.getForm() );
        });
    }

    closeEvtHandler() {
        if( !this.closeBtn ){ return; }
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

    hasForm(){
        let form = this.querySelector("form");
        if( !form ){
            console.warn(`[HSH-Modal] - Modal body contains no form field.`);
            return false;
        }
        return form;
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
    /* This will reset the form elements into their default state */
    resetForm(){
        if( !this.form ){ return {}; }
        this.form.reset();
    }

    // Getters

    getTitle(){
        return this.title;
    }

    getID(){
        return this.id;
    }

    getForm(){
        if( !this.form ){ return {}; }

        const formData  = new FormData( this.form );
        let object      = Object.fromEntries(formData);
        let checkBoxes  = this.form.querySelectorAll("input[type='checkbox']");
        for (const checkBox of checkBoxes) {
            let checkName       = checkBox.getAttribute("name");
            object[checkName]   = checkBox.checked;
        }
        return object;
    }
};
customElements.define('hs-modal', hsModal);