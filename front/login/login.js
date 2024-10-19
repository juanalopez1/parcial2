const login_button = document.getElementById("submit");

login_button.addEventListener("click", async () => {
    console.log('pruebo: ' + document.getElementById('username').value)
    const username = document.getElementById('username').value;
    const contraseña = document.getElementById('password').value;


    console.log('ytyu: ' + username)
    console.log(contraseña)
    
    try {
        console.log('sdfgkpdfjg')
        const response = await fetch('http://localhost/back/auth/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, contraseña }),
            redirect: 'manual'
        });
        console.log('llega aca')

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        console.log('pase un if')
        const data = await response.json();


        if (data && data.token && data.usuario.id_usuario) {
            console.log('logueo');
            localStorage.setItem('token', data.token);
            localStorage.setItem('user_id', data.usuario.id_usuario);
            localStorage.setItem('username', data.usuario.username);
            if (data.usuario.is_admin){
                window.location.href = '../home';
            } else {
                window.location.href = '../user_home';
            }
            
        } else {
            console.error('se rompe');
            alert('no auntentico');
        }
    } catch (error) {
        console.error('se rompe', error);
        alert('no auntentico');
    }
});