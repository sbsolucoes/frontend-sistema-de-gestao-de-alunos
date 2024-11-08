"use client";

import { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import styles from '../../styles/alunos.module.css';
import Layout from '../../components/Layout.js';

// Definindo as disciplinas com suas abreviações e nomes completos
const DISCIPLINAS = {
  MT: 'Matemática',
  PT: 'Português',
  HI: 'História',
  GE: 'Geografia',
  FI: 'Física',
  QU: 'Química',
  BI: 'Biologia'
};

export default function Page() {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true); // Estado de loading
  const [data, setData] = useState([]);
  const [filtroDisciplina, setFiltroDisciplina] = useState('');
  const disciplinasCarregadas = useRef(false);

  const fetchProfessores = async (query = '') => {
    setLoading(true); // Ativa o loading antes de iniciar a requisição
    try {
      let url = `http://127.0.0.1:8000/api/v1/professores/?ilike(full_name,${query}*)`;
      
      if (filtroDisciplina) {
          url += `,eq(disciplina,${filtroDisciplina})`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
      const result = await response.json();
      setData(result); // Armazena os dados recebidos no estado
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    } finally {
      setLoading(false); // Desativa o loading após a requisição ser concluída
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    fetchProfessores(value); // Chama a função de busca com o valor atual do input
  };

  const handleDisciplinaChange = (event) => {
    const selectedDisciplina = event.target.value;
    setFiltroDisciplina(selectedDisciplina);
    
    // Se a opção "Disciplinas" for selecionada, redefine a busca sem filtro
    if (selectedDisciplina === "") {
      setData([]); // Limpa os dados para evitar mostrar resultados antigos
      fetchProfessores(); // Chama a função para buscar todos os professores
    } else {
      fetchProfessores(inputValue); // Refaça a busca com o valor atual do input
    }
  };
  
  useEffect(() => {
    fetchProfessores(''); // Chama a função de busca com uma string vazia
  }, []);

  return (
    <>
      <Layout>
      <main className={styles.conteudo__principal}>
        <div className={styles.conteudo__principal__alunos}>
          <h2 className={styles.conteudo__principal__alunos__subtitulo}>Professores</h2>
          
          <div className={styles.conteudo__principal__alunos__navegacao}>
            <input 
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className={styles.conteudo__principal__alunos__navegacao__entrada} 
              placeholder='Pesquise o professor por nome'
            />
            
            <select 
                className={styles.conteudo__principal__alunos__navegacao__filtro} 
                onChange={handleDisciplinaChange} // Atualiza o filtro de disciplina
              >
                <option value="">Disciplinas</option> // Valor padrão
                {Object.entries(DISCIPLINAS).map(([abreviacao, nomeCompleto]) => ( // Usando as disciplinas fixas
                  <option key={abreviacao} value={abreviacao}>{nomeCompleto}</option>
                ))}
            </select>

            <a href="/cadastrarProfessor">
              <img src='./images/plus_icon.svg' className={styles.conteudo__principal__alunos__navegacao__imagem} alt='Ícone Adicionar'></img>
            </a>
          </div>

           <div className={styles.conteudo__principal__alunos__resultado}>
              {loading ? (
                <div className={styles.loadingText}>
                  Carregando<span className={styles.dots}></span>
                </div>
              ) : data.length > 0 ? (
                data.map((professor, index) => (
                  <div
                    key={index}
                    className={styles.conteudo__principal__alunos__resultado__aluno}
                  >
                    {/* Link sem a tag <a> */}
                    <Link 
                      className={styles.conteudo__principal__alunos__resultado__aluno}
                      href={`/professor/${professor.id}`}>
                      <h3 className={styles.conteudo__principal__alunos__resultado__nome}>
                        {professor.full_name}
                      </h3>
                    </Link>
                  </div>
                ))
              ) : (
                <p>Nenhum professor encontrado.</p>
              )}
            </div>
        </div>
      </main>
      </Layout>
    </>
  )
}


