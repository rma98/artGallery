<template>
    <div v-if="show" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <button class="close-btn" @click="closeModal">
                <i class="fas fa-times"></i>
            </button>

            <h2><i class="fas fa-envelope"></i> Entre em Contato</h2>

            <form @submit.prevent="handleSubmit">
                <div class="input-group">
                    <label for="name"><i class="fas fa-user"></i> Nome</label>
                    <input type="text" id="name" v-model="form.name" required placeholder="Seu nome">
                </div>

                <div class="input-group">
                    <label for="email"><i class="fas fa-envelope"></i> E-mail</label>
                    <input type="email" id="email" v-model="form.email" required placeholder="seuemail@email.com">
                </div>

                <div class="input-group">
                    <label for="phone"><i class="fas fa-phone"></i> Telefone</label>
                    <input type="tel" id="phone" v-model="form.phone" placeholder="Digite seu telefone">
                </div>

                <div class="input-group">
                    <label for="message"><i class="fas fa-comment"></i> Mensagem</label>
                    <textarea id="message" v-model="form.message" required placeholder="Sua mensagem"></textarea>
                </div>

                <button type="submit" class="send-btn" :disabled="sending">
                    <i class="fas fa-paper-plane"></i> {{ sending ? "Enviando..." : "Enviar" }}
                </button>
            </form>

            <p v-if="message" class="response-message">{{ message }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: Boolean,
    },
    data() {
        return {
            form: {
                name: "",
                email: "",
                phone: "",
                message: ""
            },
            sending: false,
            message: ""
        };
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        async handleSubmit() {
            this.sending = true;
            this.message = "";

            try {
                const formData = new FormData();
                formData.append("name", this.form.name);
                formData.append("email", this.form.email);
                formData.append("phone", this.form.phone);
                formData.append("message", this.form.message);

                const response = await fetch("https://formsubmit.co/ajax/4e955f7fefc407e2eded8c5f9cf357e3", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    this.message = "✅ Mensagem enviada com sucesso!";
                    this.resetForm();
                } else {
                    this.message = "❌ Erro ao enviar mensagem. Tente novamente.";
                }
            } catch (error) {
                this.message = "❌ Erro ao conectar ao servidor.";
            } finally {
                this.sending = false;
            }
        },
        resetForm() {
            this.form = {
                name: "",
                email: "",
                phone: "",
                message: ""
            };
        },
    }
};
</script>

<style scoped>
/* === Estilização moderna === */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease-in-out;
}

.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 450px;
    text-align: center;
    animation: slideIn 0.3s ease-in-out;
    position: relative;
}

/* Animações */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes slideIn {
    from {
        transform: translateY(-30px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* Botão de fechar */
.close-btn {
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 15px;
    color: #555;
    transition: color 0.3s ease-in-out;
}

.close-btn:hover {
    color: red;
}

/* Formulário */
.input-group {
    margin-bottom: 1rem;
    text-align: left;
}

.input-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.3rem;
}

.input-group input,
.input-group textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease-in-out;
}

/* Foco nos campos */
.input-group input:focus,
.input-group textarea:focus {
    border-color: #007BFF;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
    outline: none;
}

/* Ajuste para o campo de mensagem */
.input-group textarea {
    resize: vertical;
    min-height: 100px;
}

/* Botão de envio */
.send-btn {
    width: 100%;
    background: #007BFF;
    color: white;
    border: none;
    padding: 0.8rem;
    font-size: 1.1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.send-btn:hover {
    background: #0056b3;
}

.send-btn:disabled {
    background: gray;
    cursor: not-allowed;
}

/* Mensagem de resposta */
.response-message {
    margin-top: 1rem;
    font-weight: bold;
}

/* Responsividade */
@media (max-width: 480px) {
    .modal-content {
        width: 95%;
        padding: 1.5rem;
    }

    .send-btn {
        font-size: 1rem;
    }
}
</style>
