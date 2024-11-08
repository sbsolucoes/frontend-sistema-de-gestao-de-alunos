"use client";

import { useEffect, useState } from 'react';
import styles from '../styles/MenuButton.module.css';

export default function MenuButton() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    useEffect(() => {
      const menuElement = document.querySelector('.sideMenu');
      if (menuElement) {
        // Manipule o menu ou faça algo com ele
      }
    }, [isOpen]); // Executa o efeito quando isOpen mudar

    return (
        <div>
            <div className={styles.menuButton} onClick={toggleMenu}>
                <div className={`${styles.line} ${isOpen ? styles.line1 : ''}`}></div>
                <div className={`${styles.line} ${isOpen ? styles.line2 : ''}`}></div>
                <div className={`${styles.line} ${isOpen ? styles.line3 : ''}`}></div>
            </div>
            <nav className={`${styles.sideMenu} ${isOpen ? styles.showMenu : ''}`}>
                <a href="" className={styles.link}>
                    <h2>Institucional</h2>
                </a>
                <a href="professores" className={styles.link}>
                    <h2>Professores</h2>
                </a>
                <a href="alunos" className={styles.link}>
                    <h2>Alunos</h2>
                </a>
                <a href="" className={styles.link}>
                    <h2>Turmas</h2>
                </a>
                <a href="" className={styles.link}>
                    <h2>Estatísticas</h2>
                </a>
                <a href="" className={styles.link}>
                    <h2>Relatórios</h2>
                </a>
            </nav>
        </div>
    );
}
