document.getElementById("contact-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    const contato = { name, email, phone };

    const resposta = await fetch("/contatos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contato)
    });

    if (resposta.ok) {
        alert("Contato salvo com sucesso!");
        document.getElementById("contact-form").reset();
        carregarContatos();
    } else {
        alert("Erro ao salvar o contato.");
    }
});

async function carregarContatos() {
    const resposta = await fetch("/contatos");
    const contatos = await resposta.json();

    const lista = document.getElementById("contacts-list");
    lista.innerHTML = "";

    if (contatos.length === 0) {
        lista.innerHTML = ""; 
        return;
    }

    contatos.forEach(c => {
        const div = document.createElement("div");
        div.className = "contato-item";
        div.innerHTML = `<strong>${c.name}</strong><br>${c.email}<br>${c.phone}`;
        lista.appendChild(div);
    });
}

carregarContatos();
