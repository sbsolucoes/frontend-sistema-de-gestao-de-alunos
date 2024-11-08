import { use } from 'react';
import Layout from '../../../components/Layout.js';
import AlunoDetalhes from '../../../components/AlunoDetalhes';
import Historico from '../../../components/Historico';

export default function AlunoPage({ params }) {
  const { id } = params;
  
  const aluno = use(fetch(`http://sjweb/api/v1/alunos/${id}`).then(res => res.json()));

  if (!aluno) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Layout>
          <AlunoDetalhes aluno={aluno} />
          <Historico alunoId={id} />
      </Layout>
    </>
  );
}