// Importamos o Controller (o "cérebro" que coordena tudo)
import { AppControllers } from './controllers/AppControllers.js';

// Criamos uma nova instância do sistema
const app = new AppControllers();

// Chamamos o método para ativar os botões e carregar a loja
app.iniciar();
