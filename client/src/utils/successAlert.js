import Swal from 'sweetalert2'
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'
const successAlert =(title,draggable=false)=>{
    const alertSuccess =Swal.fire({
  title: title,
  icon: "success",
  draggable: draggable
});
return alertSuccess;
}
export default successAlert;