import { Injectable } from '@angular/core';
declare var toastr:any;
@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor() {
    this.settings();
   }

  success(title:string ,message?:string)
  {
    toastr.success(title,message);
  }

  warning(title:string ,message?:string)
  {
    toastr.warning(title,message);
  }

  error(title:string ,message?:string)
  {
    toastr.error(title,message);
  }
  info(title:string ,message?:string)
  {
    toastr.info(title,message);
  }

  settings(){
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-center",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
}
}
