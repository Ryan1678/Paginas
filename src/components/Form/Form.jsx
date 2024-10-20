import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "../context/Provider";
import Loading from "../Loading/Loading";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
import emailjs from 'emailjs-com';

emailjs.init("y99EZ8SnpoZVsTjGn");

export const Form = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { cartItems, loading, setLoading, isOpen } = useContext(Context);
  const [paymentMethod, setPaymentMethod] = useState("");

  const notifySuccess = () => toast.success('Pedido enviado! Verifique seu Email.', {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

  const notifyError = (message) => toast.error(message, {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

  const generatePurchaseCode = () => {
    return Math.floor(Math.random() * 1000000).toString();
  };

  const sendEmail = async (data) => {
    const purchaseCode = generatePurchaseCode();
    const templateParams = {
      to_name: data.nome,
      to_email: data.email,
      total: cartItems.reduce((acc, item) => acc + (item.price * item.qualify), 0).toFixed(2),
      payment_method: paymentMethod,
      purchase_code: purchaseCode,
      message: "Dirija-se ao balcão da lanchonete e informe o código da compra para pegar seu pedido.",
    };

    try {
      await emailjs.send('service_z74uxl4', 'template_28vxj6g', templateParams, 'y99EZ8SnpoZVsTjGn');
      console.log('Email enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar o email:', error);
      notifyError('Erro ao enviar e-mail.');
    }
  };

  const enviarPedidoParaBackend = async (data) => {
    try {
      const pedido = {
        emissor: data.nome, // Use o nome como emissor
        email: data.email,
        metodo: paymentMethod,
        status: "Pendente", // Definindo status padrão como "Pendente"
        itens: cartItems,
        data_hora_compra: new Date().toISOString(), // Definindo data/hora atual
      };

      const response = await fetch('http://localhost:8080/pedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedido),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar o pedido no banco de dados');
      }

      const result = await response.json();
      console.log('Pedido salvo no banco de dados:', result);
    } catch (error) {
      console.error('Erro ao salvar o pedido:', error);
      notifyError('Erro ao salvar o pedido no banco de dados.');
    }
  };

  const onSubmit = async (data) => {
    if (!isOpen) {
      notifyError('Ops! A Escola está fechada');
      return;
    }

    if (cartItems.length === 0) {
      notifyError("Carrinho está vazio!");
      return;
    }

    if (paymentMethod === "Cartão") {
      if (!data.cartao_numero || !data.cartao_nome || !data.cartao_validade || !data.cartao_cvc) {
        notifyError('Todos os campos do cartão são obrigatórios!');
        return;
      }
    }

    setLoading(true);
    try {
      // Envia o pedido para o backend
      await enviarPedidoParaBackend(data);

      // Envia o e-mail
      await sendEmail(data);
      
      notifySuccess();
      reset();
      cartItems.length = 0; // Limpar o carrinho
    } catch (error) {
      notifyError('Erro ao enviar o pedido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (<Loading />) : (
        <div className="w-full px-4 py-6">
          <div className="bg-white w-full text-red-600 py-2 px-2 text-4xl mb-5">
            <Link to={'/'}>
              <CiLogout />
            </Link>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-4 mt-5 mb-1 px-4">
            <h1 className="text-center text-3xl font-bold mb-3">Enviar seu <span className="text-red-600">pedido</span></h1>

            {/* Campo de Nome */}
            <input
              {...register("nome", { required: true })}
              placeholder="Nome"
              className="bg-white px-4 py-3 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500 mb-2"
            />
            {errors.nome && <span className="text-red-600">O nome não pode estar vazio</span>}

            {/* Campo de Email */}
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email (Escolar/Pessoal)"
              className="bg-white px-4 py-3 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500 mb-2"
            />
            {errors.email && <span className="text-red-600">Email inválido!</span>}

            {/* Método de Pagamento */}
            <div className="flex flex-col mb-2">
              <label className="font-bold text-lg mb-2">Método de Pagamento:</label>
              <select
                {...register("paymentMethod", { required: true })}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="bg-white px-4 py-3 border border-black/35 rounded focus:border-green-500"
              >
                <option value="">Selecione</option>
                <option value="Cartão">Cartão de Crédito</option>
                <option value="Pix">Pix</option>
              </select>
              {errors.paymentMethod && <span className="text-red-600">Escolha um método de pagamento!</span>}
            </div>

            {/* Informações do Cartão de Crédito */}
            {paymentMethod === "Cartão" && (
              <>
                <input
                  type="text"
                  {...register("cartao_numero", { required: true })}
                  placeholder="Número do Cartão"
                  className="bg-white px-4 py-3 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500 mb-2"
                />
                {errors.cartao_numero && <span className="text-red-600">Este campo é obrigatório!</span>}
                <input
                  type="text"
                  {...register("cartao_nome", { required: true })}
                  placeholder="Nome no Cartão"
                  className="bg-white px-4 py-3 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500 mb-2"
                />
                {errors.cartao_nome && <span className="text-red-600">Este campo é obrigatório!</span>}
                <input
                  type="text"
                  {...register("cartao_validade", { required: true })}
                  placeholder="Validade (MM/AA)"
                  className="bg-white px-4 py-3 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500 mb-2"
                />
                {errors.cartao_validade && <span className="text-red-600">Este campo é obrigatório!</span>}
                <input
                  type="text"
                  {...register("cartao_cvc", { required: true })}
                  placeholder="CVC"
                  className="bg-white px-4 py-3 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500 mb-2"
                />
                {errors.cartao_cvc && <span className="text-red-600">Este campo é obrigatório!</span>}
              </>
            )}

            {/* Botão de Enviar */}
            <button
              type="submit"
              className="bg-red-600 text-white py-3 rounded hover:bg-red-700 transition duration-200"
            >
              Enviar Pedido
            </button>
          </form>
        </div>
      )}
    </>
  );
};
