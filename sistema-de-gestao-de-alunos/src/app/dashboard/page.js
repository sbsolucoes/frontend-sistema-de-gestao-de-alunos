import styles from '../../styles/dashboard.module.css';
import Layout from '../../components/Layout';
import '../../styles/reset.css';

export default function Dashboard({ session }) {
    return (
      <>
        <Layout>
        <main className={styles.conteudo__principal}>
            <section className={styles.conteudo__principal__links}>
                <a href="" className={styles.conteudo__principal__link__ancora}>
                    <div className={styles.conteudo__principal__link}>
                        <img
                            className={styles.conteudo__principal__link__imagem}
                            src="/images/institutional_icon.png"
                            alt="Imagem de uma pessoa, representando um professor, em frente e apontando para uma lousa"
                        />
                        <h2 className={styles.conteudo__principal__link__subtitulo}>Institucional</h2>
                    </div>
                </a>

                <a href="professores" className={styles.conteudo__principal__link__ancora}>
                    <div className={styles.conteudo__principal__link}>
                        <img
                            className={styles.conteudo__principal__link__imagem}
                            src="/images/teacher_icon.png"
                            alt="Imagem de uma pessoa, representando um professor, em frente e apontando para uma lousa"
                        />
                        <h2 className={styles.conteudo__principal__link__subtitulo}>Professores</h2>
                    </div>
                </a>

                <a href="alunos" className={styles.conteudo__principal__link__ancora}>
                    <div className={styles.conteudo__principal__link}>
                        <img
                            className={styles.conteudo__principal__link__imagem}
                            src="/images/student_icon.png"
                            alt="Imagem de uma pessoa, representando um professor, em frente e apontando para uma lousa"
                        />
                        <h2 className={styles.conteudo__principal__link__subtitulo}>Alunos</h2>
                    </div>
                </a>

                <a href="" className={styles.conteudo__principal__link__ancora}>
                    <div className={styles.conteudo__principal__link}>
                        <img
                            className={styles.conteudo__principal__link__imagem}
                            src="/images/class_icon.png"
                            alt="Imagem de uma pessoa, representando um professor, em frente e apontando para uma lousa"
                        />
                        <h2 className={styles.conteudo__principal__link__subtitulo}>Turmas</h2>
                    </div>
                </a>

                <a href="" className={styles.conteudo__principal__link__ancora}>
                    <div className={styles.conteudo__principal__link}>
                        <img
                            className={styles.conteudo__principal__link__imagem}
                            src="/images/statistic_icon.png"
                            alt="Imagem de uma pessoa, representando um professor, em frente e apontando para uma lousa"
                        />
                        <h2 className={styles.conteudo__principal__link__subtitulo}>Estatísticas</h2>
                    </div>
                </a>

                <a href="" className={styles.conteudo__principal__link__ancora}>
                    <div className={styles.conteudo__principal__link}>
                        <img
                            className={styles.conteudo__principal__link__imagem}
                            src="/images/report_icon.png"
                            alt="Imagem de uma pessoa, representando um professor, em frente e apontando para uma lousa"
                        />
                        <h2 className={styles.conteudo__principal__link__subtitulo}>Relatórios</h2>
                    </div>
                </a>
            </section>
        </main>
        </Layout>
      </>
    );
}
