"use client";

import { signOut, useSession } from 'next-auth/react';
import { useState, useEffect } from "react";
import Link from 'next/link';
import styles from '../../styles/alunos.module.css';
import Layout from '../../components/Layout.js';

export default function Page() {
  const { data: session } = useSession(); 
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [anosInscricao, setAnosInscricao] = useState([]);
  const [filtroAno, setFiltroAno] = useState('');

  const fetchAlunos = async (query = '') => {
    setLoading(true);
    const token = session?.user?.token;
    
    try {
      let url = `http://sjweb/api/v1/alunos/?ilike(full_name,${query}*)`;
        
      // Se um ano estiver selecionado, adicione o filtro de ano
      if (filtroAno) {
          url += `,ge(data_inscricao,'${filtroAno}-01-01T00:00:00Z'),lt(data_inscricao,'${parseInt(filtroAno) + 1}-01-01T00:00:00Z')`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
       }
      });

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      const result = await response.json();
      setData(result); 

      // Extrair os anos de inscrição dos alunos
      const anos = Array.from(
        new Set(result.map(aluno => new Date(aluno.data_inscricao).getFullYear()))
      ).sort(); 
      setAnosInscricao(anos); // Armazena os anos no estado
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    fetchAlunos(value);
  };

  // Busca todos os alunos inicialmente
  useEffect((session) => {
    fetchAlunos(''); 
  }, [session]);

  return (
    <>
      <Layout>
      <main className={styles.conteudo__principal}>
        <div className={styles.conteudo__principal__alunos}>
          <h2 className={styles.conteudo__principal__alunos__subtitulo}>Alunos</h2>
          
          <div className={styles.conteudo__principal__alunos__navegacao}>
            <input 
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className={styles.conteudo__principal__alunos__navegacao__entrada} 
              placeholder='Pesquise o aluno por nome'
            />
            
            <select 
              className={styles.conteudo__principal__alunos__navegacao__filtro} 
              onChange={(e) => setFiltroAno(e.target.value)} // Função para filtrar por ano
            >
                <option value="">Todos os anos</option>
                {anosInscricao.map(ano => (
                    <option key={ano} value={ano}>{ano}</option>
                ))}
            </select>
            
            <a href="/cadastrarAluno">
              <img src='./images/plus_icon.svg' className={styles.conteudo__principal__alunos__navegacao__imagem} alt='Ícone Adicionar'></img>
            </a>
          </div>

          <div className={styles.conteudo__principal__alunos__resultado}>
            {loading ? (
              <div className={styles.loadingText}>
                Carregando<span className={styles.dots}></span>
              </div>
            ) : data.length > 0 ? (
              data.map((aluno, index) => (
                <div
                  key={index}
                  className={styles.conteudo__principal__alunos__resultado__aluno}
                >
                  {/* Link sem a tag <a> */}
                  <Link 
                  className={styles.conteudo__principal__alunos__resultado__aluno}
                  href={`/aluno/${aluno.id}`}>
                    <h3 className={styles.conteudo__principal__alunos__resultado__nome}>
                      {aluno.full_name}
                    </h3>
                    <p className={styles.conteudo__principal__alunos__resultado__matricula}>
                      {aluno.matricula}
                    </p>
                  </Link>
                </div>
              ))
            ) : (
              <p>Nenhum aluno encontrado.</p>
            )}
          </div>
        </div>
      </main>
      </Layout>
    </>
  )
}


