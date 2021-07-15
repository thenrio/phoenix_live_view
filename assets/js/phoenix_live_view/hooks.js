import {
  PHX_ACTIVE_ENTRY_REFS,
  PHX_PREFLIGHTED_REFS,
  PHX_UPLOAD_REF
} from "./constants"

import LiveUploader from "./live_uploader"

let Hooks = {
  LiveFileUpload: {
    activeRefs(){ return this.el.getAttribute(PHX_ACTIVE_ENTRY_REFS) },

    preflightedRefs(){ return this.el.getAttribute(PHX_PREFLIGHTED_REFS) },

    mounted(){
      this.activeWas = this.activeRefs()
      this.preflightedWas = this.preflightedRefs()
    },

    updated(){
      let newActives = this.activeRefs()
      if(this.activeWas !== newActives){
        this.activeWas = newActives
        if(newActives === ""){
          this.el.value = null
        }
      }

      let newPreflights = this.preflightedRefs()
      if(this.preflightedWas !== newPreflights){
        this.preflightedWas = newPreflights
        if(newPreflights === ""){
          this.__view.cancelSubmit(this.el.form)
        }
      }
    }
  },

  LiveImgPreview: {
    mounted(){
      this.ref = this.el.getAttribute("data-phx-entry-ref")
      this.inputEl = document.getElementById(this.el.getAttribute(PHX_UPLOAD_REF))
      LiveUploader.getEntryDataURL(this.inputEl, this.ref, url => this.el.src = url)
    }
  }
}

export default Hooks
