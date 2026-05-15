import React, { useEffect } from 'react'

function App() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Observar elementos com scroll reveal
    const scrollElements = document.querySelectorAll('.scroll-reveal, .background-reveal');
    scrollElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo-container">
              <span className="logo-text">Product Maker</span>
            </div>
            <div className="header-buttons">
              <button className="btn-header">Junte-se ao Movimento</button>
              <button className="btn-header-secondary">Conheça os Cursos</button>
            </div>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="hero-section background-reveal" style={{
        paddingTop: '80px',
        backgroundImage: 'url(/images/hero_exponential_growth.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(10, 22, 40, 0.85)',
          zIndex: 1
        }}></div>
        <div className="container text-center scroll-reveal" style={{position: 'relative', zIndex: 2}}>
          <h1 className="mb-normal hero-title">
            A Revolução<br />
            acontece agora
          </h1>
          <p className="text-large mb-normal max-w-4xl mx-auto">
            Estamos vivendo <strong className="text-primary">a maior revolução de todos os tempos</strong> onde cada novo ciclo se <strong className="text-secondary">acumula</strong> ao anterior, criando mudanças exponenciais que reorganizam tudo em velocidade jamais vista.
          </p>
          <p className="text-xl text-accent font-bold glow-text-subtle mb-normal">
            A mudança é exponencial e ela acontece AGORA.
          </p>
        </div>
      </section>

      {/* Tecnologias Cards */}
      <section className="section">
        <div className="container">
          <div className="grid grid-4">
            <div className="card-tech glass-effect hover-glow">
              <h3 className="text-primary font-bold mb-tight">Inteligência Artificial</h3>
              <p><strong>REDEFINE</strong> o que é trabalho cognitivo</p>
            </div>
            <div className="card-tech glass-effect hover-glow">
              <h3 className="text-secondary font-bold mb-tight">Plataformas</h3>
              <p><strong>Reorganizam</strong> indústrias inteiras overnight</p>
            </div>
            <div className="card-tech glass-effect hover-glow">
              <h3 className="text-accent font-bold mb-tight">Dados</h3>
              <p><strong>Demonstram</strong> quem é quem</p>
            </div>
            <div className="card-tech glass-effect hover-glow">
              <h3 className="text-primary font-bold mb-tight">Automação</h3>
              <p><strong>Elimina</strong> o trabalho superficial e premia a criatividade profunda</p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Era dos Superficiais */}
      <section className="section-tight" style={{
        backgroundImage: 'url(/images/makers_silhouettes.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(10, 22, 40, 0.85)',
          zIndex: 1
        }}></div>
        <div className="container text-center" style={{position: 'relative', zIndex: 2}}>
          <h2 className="text-gradient-accent glow-text-subtle mb-normal">A era dos superficiais acabou</h2>
          <p className="text-large mb-tight">
            Não por escolha, mas por <strong className="text-secondary">necessidade evolutiva</strong>.
          </p>
          <p className="mb-normal">
            As tecnologias irão substituir quem só fala. As grandes empresas estão premiando quem constrói. Dados estão expondo quem não sabe o que faz.
          </p>
          <p className="text-xl text-secondary font-bold glow-text-subtle mb-normal">
            Sobrevivem apenas os MAKERS.
          </p>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* 3 Blocos */}
      <section className="section">
        <div className="container">
          <h2 className="text-center text-gradient glow-text-subtle mb-normal">Os 3 Blocos das competências makers</h2>
          <p className="text-center text-large mb-loose">
            Na era pré-revolução, as pessoas se especializavam em <strong className="text-primary">um</strong> desses blocos:
          </p>
          
          <div className="grid grid-3 mb-normal">
            <div className="card glass-effect">
              <div className="block-header">
                <span className="block-number text-primary">1</span>
                <h3 className="text-primary font-bold">BLOCO TEORIA</h3>
              </div>
              <h4 className="text-large mb-normal">Pensadores</h4>
              <ul className="text-sm mb-normal space-y-2 no-bullets">
                <li>• Conhecimento acadêmico sólido</li>
                <li>• Fundamentos e primeiros princípios</li>
                <li>• Capacidade analítica refinada</li>
              </ul>
              <div>
                <span className="limitation-text">LIMITAÇÃO:</span><br />
                <span className="limitation-description text-sm">Só pensam, não executam</span>
              </div>
            </div>

            <div className="card glass-effect">
              <div className="block-header">
                <span className="block-number text-secondary">2</span>
                <h3 className="text-secondary font-bold">BLOCO EXECUÇÃO</h3>
              </div>
              <h4 className="text-large mb-normal">Executores</h4>
              <ul className="text-sm mb-normal space-y-2 no-bullets">
                <li>• Vivência técnica real</li>
                <li>• Capacidade de materialização</li>
                <li>• Foco em entregáveis mensuráveis</li>
              </ul>
              <div>
                <span className="limitation-text">LIMITAÇÃO:</span><br />
                <span className="limitation-description text-sm">Só fazem, não pensam estrategicamente</span>
              </div>
            </div>

            <div className="card glass-effect">
              <div className="block-header">
                <span className="block-number text-accent">3</span>
                <h3 className="text-accent font-bold">BLOCO ESTRATÉGIA</h3>
              </div>
              <h4 className="text-large mb-normal">Visionários</h4>
              <ul className="text-sm mb-normal space-y-2 no-bullets">
                <li>• Pensamento sistêmico</li>
                <li>• Visão de longo prazo</li>
                <li>• Compreensão de efeitos de rede em um mundo conectado</li>
              </ul>
              <div>
                <span className="limitation-text">LIMITAÇÃO:</span><br />
                <span className="limitation-description text-sm">Só planejam, não implementam</span>
              </div>
            </div>
          </div>

          <p className="text-center text-large">
            Cada bloco sozinho é insuficiente no mundo exponencial.
          </p>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Era Maker - Tópico 2 com background do cérebro */}
      <section className="section background-reveal" style={{
        backgroundImage: 'url(/images/ai_brain_network.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(10, 22, 40, 0.85)',
          zIndex: 1
        }}></div>
        <div className="container text-center scroll-reveal" style={{position: 'relative', zIndex: 2}}>
          <h2 className="text-gradient glow-text-subtle mb-normal">A era maker</h2>
          <p className="text-large mb-normal">
            O <strong className="text-primary">MAKER</strong> é a pessoa rara que domina a <strong className="text-secondary">interseção dos três blocos</strong>:
          </p>

          <div className="grid grid-3 mb-normal">
            <div className="text-center">
              <p><strong className="text-primary">Pensa</strong> com fundamentos profundos</p>
            </div>
            <div className="text-center">
              <p><strong className="text-secondary">Constrói</strong> com execução impecável</p>
            </div>
            <div className="text-center">
              <p><strong className="text-accent">Conecta</strong> com visão sistêmica</p>
            </div>
          </div>

          <p className="text-xl text-primary font-bold mb-normal glow-text-subtle">
            Esta combinação cria um superpoder exponencial.
          </p>

          <div className="space-y-4 mb-normal">
            <p>Enquanto especialistas disputam territórios, <strong className="text-primary">MAKERS orquestram soluções</strong>.</p>
            <p>Enquanto teóricos debatem conceitos, <strong className="text-secondary">MAKERS validam com entregáveis</strong>.</p>
            <p>Enquanto executores otimizam processos, <strong className="text-accent">MAKERS redesenham os sistemas</strong>.</p>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Convergência Exponencial */}
      <section className="section bg-digital-grid">
        <div className="container text-center">
          <h2 className="text-gradient-accent glow-text-subtle mb-normal">A convergência exponencial</h2>
          <h3 className="text-large mb-normal">
            Vivemos o momento onde <strong className="text-primary">todas as tecnologias se amplificam mutuamente</strong>:
          </h3>

          <div className="grid grid-1 mb-normal">
            <div className="card-compact glass-effect">
              <p className="text-large" style={{lineHeight: '1.3'}}><strong className="text-primary">IA + Automação</strong> = Trabalho cognitivo redefinido</p>
            </div>
            <div className="card-compact glass-effect">
              <p><strong className="text-secondary">Plataformas + Dados</strong> = Efeitos de rede mensuráveis</p>
            </div>
            <div className="card-compact glass-effect">
              <p><strong className="text-accent">Cloud + APIs</strong> = Infraestrutura infinitamente composável</p>
            </div>
            <div className="card-compact glass-effect">
              <p><strong className="text-primary">Community + Commerce</strong> = Economias descentralizadas</p>
            </div>
          </div>

          <p className="text-large mb-tight">
            <strong>Quem pensa linear</strong> tenta entender uma tecnologia por vez.
          </p>
          <p className="text-xl text-secondary font-bold glow-text-subtle">
            MAKERS orquestram múltiplas tecnologias para criar soluções impossíveis.
          </p>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Movimento Maker */}
      <section className="section bg-neural-network">
        <div className="container text-center">
          <h2 className="text-gradient glow-text-subtle mb-normal">O movimento maker</h2>
          <h3 className="text-large mb-normal">
            Este não é apenas um manifesto. <strong className="text-primary">É um movimento.</strong>
          </h3>

          <p className="text-large mb-normal">Um movimento de pessoas que:</p>

          <div className="grid grid-1 mb-normal">
            <div className="card-compact glass-effect">
              <p className="text-large" style={{lineHeight: '1.3'}}><strong className="text-primary">Questionam</strong> ao invés de aceitar</p>
            </div>
            <div className="card-compact glass-effect">
              <p><strong className="text-secondary">Constroem</strong> ao invés de especular</p>
            </div>
            <div className="card-compact glass-effect">
              <p><strong className="text-accent">Conectam</strong> ao invés de competir</p>
            </div>
            <div className="card-compact glass-effect">
              <p><strong className="text-primary">Antecipam</strong> ao invés de reagir</p>
            </div>
            <div className="card-compact glass-effect">
              <p><strong className="text-secondary">Expandem conhecimento</strong> como forma de subversão</p>
            </div>
          </div>

          <div className="space-y-4 mb-normal">
            <p>Somos a escola do amanhã, funcionando hoje.</p>
            <p>Somos a expansão do conhecimento como revolução silenciosa.</p>
            <p className="text-large text-primary font-bold">
              Somos os que constroem o futuro enquanto outros debatem o presente.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="section-tight" style={{
        backgroundImage: 'url(/images/future_cityscape.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(10, 22, 40, 0.85)',
          zIndex: 1
        }}></div>
        <div className="container text-center" style={{position: 'relative', zIndex: 2}}>
          <h2 className="text-xl text-gradient font-bold mb-tight">
            Junte-se ao movimento
          </h2>
          <p className="text-large mb-normal">
            O movimento maker precisa de você. Não como mais um estudante passivo, mas como alguém que vai <strong className="text-primary">FAZER A DIFERENÇA</strong>.
          </p>
          <p className="text-large text-secondary font-bold glow-text-subtle mb-normal">
            Construa o amanhã.
          </p>
          <div className="flex justify-center">
            <button className="btn-cta">Junte-se ao Movimento</button>
          </div>
        </div>
      </section>

       {/* Footer */}
      <footer className="footer">
        <div className="container text-center">
          <p className="mb-tight">Product Maker - Todos os direitos reservados</p>
          <div className="social-links">
            <a href="https://www.linkedin.com/company/productmaker" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/productmaker.br" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

