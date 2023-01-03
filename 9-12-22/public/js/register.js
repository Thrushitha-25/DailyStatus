form.addEventListener("submit",()=>{
    const register={ 
        email:email.value,
        passwoed:password.value
    }
    fetch("/api/register",{
        method:"POST",
        body:JSON.stringify(register),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>res.json())
        .then(data=>{
            if(data.status=="error"){
                success.style.display="none"
                error.style.display="block"
                error.innerText=data.error
            } else{
                success.style.display="none"
                error.style.display="block"
                error.innerText=data.success
            }
        })
})