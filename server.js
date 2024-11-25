const express = require('express');
const app = express();
app.use(express.json());

let users = [];
let products = [];
let userId = 1;
let productId = 1;


function validateCPF(cpf) {
    return /^\d{11}$/.test(cpf); 
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email); 
}

// Validação de Nome
function validateName(name) {
    return name.length >= 3 && name.length <= 150;
}


function validatePrice(price) {
    return price > 0;
}

app.get('/users', (req, res) => {
    res.status(200).json(users);
});

app.post('/users', (req, res) => {
    const { name, cpf, email } = req.body;
    
    if (!name || !validateName(name)) {
        return res.status(400).json({ message: "'Nome' deve conter entre 3 e 150 caracteres" });
    }
    if (!cpf || !validateCPF(cpf)) {
        return res.status(400).json({ message: "'Cpf' deve conter 11 caracteres numéricos" });
    }
    if (!email || !validateEmail(email)) {
        return res.status(400).json({ message: "'Email' inválido" });
    }

    const user = { id: userId++, name, cpf, email };
    users.push(user);
    res.status(201).json({ message: "Usuário cadastrado com sucesso" });
});

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
    res.status(200).json(user);
});

app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    const { name, cpf, email } = req.body;

    // Validação
    if (!name || !validateName(name)) {
        return res.status(400).json({ message: "'Nome' deve conter entre 3 e 150 caracteres" });
    }
    if (!cpf || !validateCPF(cpf)) {
        return res.status(400).json({ message: "'Cpf' deve conter 11 caracteres numéricos" });
    }
    if (!email || !validateEmail(email)) {
        return res.status(400).json({ message: "'Email' inválido" });
    }

    user.name = name;
    user.cpf = cpf;
    user.email = email;
    res.status(200).json({ message: "Usuário atualizado com sucesso" });
});

app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Usuário não encontrado" });

    users.splice(index, 1);
    res.status(200).json({ message: "Usuário removido com sucesso" });
});

app.get('/products', (req, res) => {
    res.status(200).json(products);
});

app.post('/products', (req, res) => {
    const { name, price } = req.body;

    
    if (!name || name.length < 3 || name.length > 100) {
        return res.status(400).json({ message: "'Nome' deve conter entre 3 e 100 caracteres" });
    }
    if (!price || !validatePrice(price)) {
        return res.status(400).json({ message: "'Preço' deve ser maior que 0" });
    }

    const product = { id: productId++, name, price };
    products.push(product);
    res.status(201).json({ message: "Produto cadastrado com sucesso" });
});

app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: "Produto não encontrado" });
    res.status(200).json(product);
});

app.put('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: "Produto não encontrado" });

    const { name, price } = req.body;

    if (!name || name.length < 3 || name.length > 100) {
        return res.status(400).json({ message: "'Nome' deve conter entre 3 e 100 caracteres" });
    }
    if (!price || !validatePrice(price)) {
        return res.status(400).json({ message: "'Preço' deve ser maior que 0" });
    }

    product.name = name;
    product.price = price;
    res.status(200).json({ message: "Produto atualizado com sucesso" });
});

app.delete('/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Produto não encontrado" });

    products.splice(index, 1);
    res.status(200).json({ message: "Produto removido com sucesso" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
