"use client";

import { useState } from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/cadastrarAluno.module.css';

export default function Example() {
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        cpf: '',
        escola: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        uf: '',
        cep: '', 
        complemento: '',
        telefone_1: '',
        telefone_2: '',
        matricula: '',
    });
    
    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };
    
    // Função que verifica se todos os campos do endereço estão vazios
    const isEnderecoEmpty = () => {
        return !formData.logradouro && !formData.numero && !formData.bairro && !formData.cidade && !formData.uf && !formData.cep && !formData.complemento;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
       // Criar o objeto data
        const data = {
            full_name: formData.full_name,
            email: formData.email,
            cpf: formData.cpf,
            escola: formData.escola,
            telefone_1: formData.telefone_1,
            telefone_2: formData.telefone_2,
            matricula: formData.matricula,
        };

        // Se o endereço não estiver vazio, adicionar ao payload
        if (!isEnderecoEmpty()) {
            data.endereco = {
                logradouro: formData.logradouro,
                numero: formData.numero,
                bairro: formData.bairro,
                cidade: formData.cidade,
                uf: formData.uf,
                cep: formData.cep,
                complemento: formData.complemento,
            };
        }
    
        try {
        const response = await fetch('http://sjweb/api/v1/alunos/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    
        const responseData = await response.json();  // Converte a resposta para JSON
  
        if (response.ok) {
            setErrors({}); // Limpa os erros em caso de sucesso
            
            // Rolar a página para o topo
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Exibir mensagem de sucesso
            setSuccessMessage('Aluno cadastrado com sucesso!');
            setShowSuccess(true);

            // Limpar campos do formulário
            setFormData({
                full_name: '',
                email: '',
                cpf: '',
                escola: '',
                logradouro: '',
                numero: '',
                bairro: '',
                cidade: '',
                uf: '',
                cep: '', 
                complemento: '',
                telefone_1: '',
                telefone_2: '',
                matricula: '',
            });

            // Esconder a mensagem de sucesso após 3 segundos
            setTimeout(() => setShowSuccess(false), 3000);
        } else {
            setErrors(responseData); // Armazena os erros no state
            console.log('Erro ao cadastrar aluno:', responseData);  // Exibe o erro retornado pela API
        }
    } catch (error) {
        console.error('Erro ao enviar requisição:', error);
    }
};

  return (
    <>
      <Layout>
        {showSuccess && (
            <div className="fixed top-0 left-0 w-full bg-green-500 bg-opacity-75 text-white text-center py-3 shadow-lg z-50 mt-12">
                <p>{successMessage}</p>
            </div>
        )}
        <form className={styles.conteudo__principal__formulario} onSubmit={handleSubmit}>
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Informações Pessoais</h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                            Nome
                        </label>
                        <div className="mt-2">
                            <input
                                id="first-name"
                                name="full_name"
                                type="text"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={formData.full_name}
                                onChange={handleChange}
                                required
                            />
                            {errors.nome_completo && <p className="mt-2 text-sm text-red-600">{errors.nome_completo}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="matricula" className="block text-sm font-medium leading-6 text-gray-900">
                            Matrícula
                        </label>
                        <div className="mt-2">
                            <input
                                id="matricula"
                                name="matricula"
                                type="text"
                                autoComplete="given-name"
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.matricula ? 'ring-red-500' : ''}`}
                                value={formData.matricula}
                                onChange={handleChange}
                                required
                            />
                            {errors.matricula && <p className="mt-2 text-sm text-red-600">{errors.matricula[0]}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="given-email"
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.email ? 'ring-red-500' : ''}`}
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="cpf" className="block text-sm font-medium leading-6 text-gray-900">
                            CPF
                        </label>
                        <div className="mt-2">
                            <input
                                id="cpf"
                                name="cpf"
                                type="text"
                                autoComplete="given-cpf"
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.cpf ? 'ring-red-500' : ''}`}
                                value={formData.cpf}
                                onChange={handleChange}
                                required
                            />
                            {errors.cpf && <p className="mt-2 text-sm text-red-600">{errors.cpf}</p>}
                        </div>
                    </div>
        
                    <div className="sm:col-span-3">
                        <label htmlFor="escola" className="block text-sm font-medium leading-6 text-gray-900">
                            Escola
                        </label>
                        <div className="mt-2">
                            <input
                                id="escola"
                                name="escola"
                                type="text"
                                autoComplete="given-escola"
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.escola ? 'ring-red-500' : ''}`}
                                value={formData.escola}
                                onChange={handleChange}
                                required
                            />
                            {errors.escola && <p className="mt-2 text-sm text-red-600">{errors.escola}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="cep" className="block text-sm font-medium leading-6 text-gray-900">
                            CEP
                        </label>
                        <div className="mt-2">
                            <input
                                id="cep"
                                name="cep"
                                type="text"
                                autoComplete="address-level2"
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.cep ? 'ring-red-500' : ''}`}
                                value={formData.cep}
                                onChange={handleChange}
                            />
                            {errors.cep && <p className="mt-2 text-sm text-red-600">{errors.cep}</p>}
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="logradouro" className="block text-sm font-medium leading-6 text-gray-900">
                            Endereço
                        </label>
                        <div className="mt-2">
                            <input
                                id="logradouro"
                                name="logradouro"
                                type="text"
                                autoComplete="street-address"
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.logradouro ? 'ring-red-500' : ''}`}
                                value={formData.logradouro}
                                onChange={handleChange}
                            />
                            {errors.logradouro && <p className="mt-2 text-sm text-red-600">{errors.logradouro}</p>}
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="cidade" className="block text-sm font-medium leading-6 text-gray-900">
                            Complemento
                        </label>
                        <div className="mt-2">
                            <input
                                id="complemento"
                                name="complemento"
                                type="text"
                                autoComplete="address-level1"
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.cidade ? 'ring-red-500' : ''}`}
                                value={formData.complemento}
                                onChange={handleChange}
                            />
                            {errors.complemento && <p className="mt-2 text-sm text-red-600">{errors.complemento}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="numero" className="block text-sm font-medium leading-6 text-gray-900">
                            Número
                        </label>
                        <div className="mt-2">
                            <input
                                id="numero"
                                name="numero"
                                type="text"
                                autoComplete="address-level1"
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.numero ? 'ring-red-500' : ''}`}
                                value={formData.numero}
                                onChange={handleChange}
                            />
                            {errors.numero && <p className="mt-2 text-sm text-red-600">{errors.numero}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="bairro" className="block text-sm font-medium leading-6 text-gray-900">
                            Bairro
                        </label>
                        <div className="mt-2">
                            <input
                                id="bairro"
                                name="bairro"
                                type="text"
                                autoComplete="address-level1"
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.bairro ? 'ring-red-500' : ''}`}
                                value={formData.bairro}
                                onChange={handleChange}
                            />
                            {errors.bairro && <p className="mt-2 text-sm text-red-600">{errors.bairro}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="cidade" className="block text-sm font-medium leading-6 text-gray-900">
                            Cidade
                        </label>
                        <div className="mt-2">
                            <input
                                id="cidade"
                                name="cidade"
                                type="number"
                                autoComplete="address-level1"
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.cidade ? 'ring-red-500' : ''}`}
                                value={formData.cidade}
                                onChange={handleChange}
                            />
                            {errors.cidade && <p className="mt-2 text-sm text-red-600">{errors.cidade}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="cidade" className="block text-sm font-medium leading-6 text-gray-900">
                            UF
                        </label>
                        <div className="mt-2">
                            <input
                                id="uf"
                                name="uf"
                                type="text"
                                autoComplete="address-level1"
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.cidade ? 'ring-red-500' : ''}`}
                                value={formData.uf}
                                onChange={handleChange}
                            />
                            {errors.uf && <p className="mt-2 text-sm text-red-600">{errors.uf}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="telefone_1" className="block text-sm font-medium leading-6 text-gray-900">
                            Telefone 1
                        </label>
                        <div className="mt-2">
                            <input
                                id="telefone_1"
                                name="telefone_1"
                                type="number"
                                autoComplete="tel"
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.telefone_1 ? 'ring-red-500' : ''}`}
                                value={formData.telefone_1}
                                onChange={handleChange}
                            />
                            {errors.telefone_1 && <p className="mt-2 text-sm text-red-600">{errors.telefone_1}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="telefone_2" className="block text-sm font-medium leading-6 text-gray-900">
                            Telefone 2
                        </label>
                        <div className="mt-2">
                            <input
                                id="telefone_2"
                                name="telefone_2"
                                type="text"
                                autoComplete="tel"
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.telefone_2 ? 'ring-red-500' : ''}`}
                                value={formData.telefone_2}
                                onChange={handleChange}
                            />
                            {errors.telefone_2 && <p className="mt-2 text-sm text-red-600">{errors.telefone_2}</p>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-[#007BFF] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#003f7f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007BFF]"
                >
                    Save
                </button>
            </div>
        </form>
      </Layout>
    </>
  )
}