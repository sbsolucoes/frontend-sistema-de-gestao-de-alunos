"use client";

import { useState, useEffect  } from "react";

export default function Historico({ alunoId }) {
  const [aluno, setAluno] = useState(alunoId || ''); // Usando o alunoId como valor inicial
  const [historico, setHistorico] = useState([]);
  const [periodo, setPeriodo] = useState('');
  const [nota1, setNota1] = useState('');
  const [nota2, setNota2] = useState('');
  const [nota3, setNota3] = useState('');
  const [nota4, setNota4] = useState('');
  const [notaFinal, setNotaFinal] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  // Fetch histórico from the API
  const fetchHistorico = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/historico/?aluno_id=${aluno}`);
      const data = await response.json();
      setHistorico(data);
    } catch (err) {
      console.error("Erro ao buscar histórico:", err);
    }
  };

  useEffect(() => {
    fetchHistorico();
  }, []);

  // Agrupa o histórico por período
  const historicoPorPeriodo = historico.reduce((acc, item) => {
    if (!acc[item.periodo]) {
      acc[item.periodo] = [];
    }
    acc[item.periodo].push(item);
    return acc;
  }, {});

  const addHistorico = async (e) => {
    e.preventDefault();
    const newHistorico = {
      aluno: aluno,
      disciplina,
      periodo,
    };

    // Adiciona as notas ao objeto apenas se tiverem valores definidos
    if (nota1) newHistorico.nota1 = parseFloat(nota1);
    if (nota2) newHistorico.nota2 = parseFloat(nota2);
    if (nota3) newHistorico.nota3 = parseFloat(nota3);
    if (nota4) newHistorico.nota4 = parseFloat(nota4);
    if (notaFinal) newHistorico.nota_final = parseFloat(notaFinal);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/historico/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHistorico),
      });

      if (response.ok) {
        setPeriodo('');
        setNota1('');
        setNota2('');
        setNota3('');
        setNota4('');
        setNotaFinal('');
        setDisciplina('');
        setError('');
        fetchHistorico();

        // Rolar a página para o topo
        window.scrollTo({ top: 380, behavior: 'smooth' });
        // Exibir mensagem de sucesso
        setSuccessMessage('Nota inserida com  sucesso!');
        setShowSuccess(true);

        // Esconder a mensagem de sucesso após 3 segundos
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        setError('Erro ao adicionar o histórico');
      }
    } catch (err) {
      console.error("Erro ao adicionar histórico:", err);
      setError('Erro ao adicionar o histórico');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Histórico de Notas
      </h2>
      
      {/* Tabelas por período */}
      {Object.keys(historicoPorPeriodo).map((periodo) => (
        <div key={periodo} className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Período: {periodo}
          </h3>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b" colSpan="6">
                  {historicoPorPeriodo[periodo][0].escola} {/* Exibe o nome da escola */}
                </th>
              </tr>
              <tr>
                <th className="py-2 px-4 border-b ">Disciplina</th>
                <th className="py-2 px-4 border-b">Nota 1</th>
                <th className="py-2 px-4 border-b">Nota 2</th>
                <th className="py-2 px-4 border-b">Nota 3</th>
                <th className="py-2 px-4 border-b">Nota 4</th>
                <th className="py-2 px-4 border-b">Nota Final</th>
              </tr>
            </thead>
            <tbody>
              {historicoPorPeriodo[periodo].map((item) => (
                <tr key={item.id} className="border-t border-gray-2 text-center">
                  <td className="py-2 px-4 border-b">{item.disciplina}</td>
                  <td className="py-2 px-4 border-b">{item.nota1}</td>
                  <td className="py-2 px-4 border-b">{item.nota2}</td>
                  <td className="py-2 px-4 border-b">{item.nota3}</td>
                  <td className="py-2 px-4 border-b">{item.nota4}</td>
                  <td className="py-2 px-4 border-b">{item.nota_final}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      ))}

      {showSuccess && (
            <div className="fixed top-0 left-0 w-full bg-green-500 bg-opacity-75 text-white text-center py-3 shadow-lg z-50 mt-12">
                <p>{successMessage}</p>
            </div>
      )}
      <h3 className="text-xl font-semibold mt-10 mb-4 text-gray-800">Adicionar Histórico</h3>
      <form onSubmit={addHistorico} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label className="block text-gray-700">Disciplina: </label>
          <select
            value={disciplina}
            onChange={(e) => setDisciplina(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Selecione a disciplina</option>
            <option value="MT">Matemática</option>
            <option value="PT">Português</option>
            <option value="HI">História</option>
            <option value="GE">Geografia</option>
            <option value="FI">Física</option>
            <option value="QU">Química</option>
            <option value="BI">Biologia</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Período: </label>
          <input
            type="text"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Nota 1: </label>
          <input
            type="number"
            value={nota1}
            onChange={(e) => setNota1(e.target.value)}
            step="0.01"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Nota 2: </label>
          <input
            type="number"
            value={nota2}
            onChange={(e) => setNota2(e.target.value)}
            step="0.01"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Nota 3: </label>
          <input
            type="number"
            value={nota3}
            onChange={(e) => setNota3(e.target.value)}
            step="0.01"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Nota 4: </label>
          <input
            type="number"
            value={nota4}
            onChange={(e) => setNota4(e.target.value)}
            step="0.01"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Nota Final: </label>
          <input
            type="number"
            value={notaFinal}
            onChange={(e) => setNotaFinal(e.target.value)}
            step="0.01"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 transition duration-200"
        >
          Adicionar Histórico
        </button>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
      </form>
    </div>
  );
}