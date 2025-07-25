const db = new PouchDB('users_db');


const formCadastro = document.getElementById('form-cadastro');
const usersList = document.getElementById('users-list');
const detalhesEdicaoSection = document.getElementById('detalhes-edicao-usuario');
const formEdicao = document.getElementById('form-edicao');
const btnCancelarEdicao = document.getElementById('btn-cancelar-edicao');
const btnDeletarUsuario = document.getElementById('btn-deletar-usuario');


formCadastro.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;


    const userId = 'user_' + username;

    try {
        
        const existingUsers = await db.allDocs({ include_docs: true });
        const isUsernameTaken = existingUsers.rows.some(row => row.doc.username === username);
        const isEmailTaken = existingUsers.rows.some(row => row.doc.email === email);

        if (isUsernameTaken) {
            alert('Erro: Usuário (username) já cadastrado!');
            return;
        }
        if (isEmailTaken) {
            alert('Erro: Email já cadastrado!');
            return;
        }

        const newUser = {
            _id: userId,
            username: username,
            email: email,
            nomeCompleto: document.getElementById('nomeCompleto').value,
            preferencias: {
                temaApp: document.getElementById('temaApp').value,
                notificacoesEmail: true, 
                idioma: 'pt-BR',
                notificacoesPush: false,
                interesses: [],
                configuracoesPrivacidade: {
                    perfilPublico: true,
                    mostrarEmail: false
                }
            },
            dataCriacao: new Date().toISOString(),
            dataAtualizacao: new Date().toISOString()
        };

      
        const response = await db.put(newUser);
        console.log('Documento PouchDB salvo:', response);
        alert('Usuário cadastrado com sucesso!');
        formCadastro.reset(); 

        loadUsers();

    } catch (error) {
        console.error('Erro ao cadastrar usuário (PouchDB):', error);
        alert('Erro ao cadastrar usuário: ' + error.message);
    }
});


async function loadUsers() {
    try {
       
        const result = await db.allDocs({ include_docs: true });
        const users = result.rows.map(row => row.doc); 

        usersList.innerHTML = ''; 

        if (users.length === 0) {
            usersList.innerHTML = '<li>Nenhum usuário cadastrado ainda.</li>';
            return;
        }

        users.forEach(user => {
        
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <strong>${user.username}</strong> (${user.email})<br>
                    Tema: ${user.preferencias.temaApp || 'Não definido'}
                </div>
                <button data-id="${user._id}" class="btn-ver-detalhes">Ver Detalhes/Editar</button>
            `;
            usersList.appendChild(li);
        });

     
        document.querySelectorAll('.btn-ver-detalhes').forEach(button => {
            button.addEventListener('click', (e) => showUserDetailsForEdit(e.target.dataset.id));
        });

    } catch (error) {
        console.error('Erro ao carregar usuários (PouchDB):', error);
        alert('Erro ao carregar usuários: ' + error.message);
    }
}


async function showUserDetailsForEdit(userId) {
    try {
   
        const user = await db.get(userId);

        
        document.getElementById('edit-user-id').value = user._id;
        document.getElementById('edit-username').value = user.username;
        document.getElementById('edit-email').value = user.email;
        document.getElementById('edit-nomeCompleto').value = user.nomeCompleto || '';
        document.getElementById('edit-temaApp').value = user.preferencias.temaApp || 'claro';
        document.getElementById('edit-notificacoesEmail').checked = user.preferencias.notificacoesEmail || false;

        detalhesEdicaoSection.style.display = 'block'; 
    } catch (error) {
        console.error('Erro ao buscar detalhes do usuário para edição (PouchDB):', error);
        alert('Erro ao buscar detalhes: ' + error.message);
    }
}


formEdicao.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = document.getElementById('edit-user-id').value;

    try {
    
        const userToUpdate = await db.get(userId);

       
        userToUpdate.email = document.getElementById('edit-email').value;
        userToUpdate.nomeCompleto = document.getElementById('edit-nomeCompleto').value;
        userToUpdate.preferencias.temaApp = document.getElementById('edit-temaApp').value;
        userToUpdate.preferencias.notificacoesEmail = document.getElementById('edit-notificacoesEmail').checked;
        userToUpdate.dataAtualizacao = new Date().toISOString(); // Atualiza a data de atualização

        
        const response = await db.put(userToUpdate);
        console.log('Documento PouchDB atualizado:', response);
        alert('Usuário atualizado com sucesso!');
        detalhesEdicaoSection.style.display = 'none';
        loadUsers(); 
    } catch (error) {
        console.error('Erro ao atualizar usuário (PouchDB):', error);
        alert('Erro ao atualizar usuário: ' + error.message);
    }
});


btnDeletarUsuario.addEventListener('click', async () => {
    const userId = document.getElementById('edit-user-id').value;

    if (confirm('Tem certeza que deseja deletar este usuário? Esta ação não pode ser desfeita.')) {
        try {
            
            const userToDelete = await db.get(userId);
            const response = await db.remove(userToDelete);
            console.log('Documento PouchDB deletado:', response);
            alert('Usuário deletado com sucesso!');
            detalhesEdicaoSection.style.display = 'none'; 
            loadUsers();
        } catch (error) {
            console.error('Erro ao deletar usuário (PouchDB):', error);
            alert('Erro ao deletar usuário: ' + error.message);
        }
    }
});

btnCancelarEdicao.addEventListener('click', () => {
    detalhesEdicaoSection.style.display = 'none';
});


document.addEventListener('DOMContentLoaded', loadUsers);