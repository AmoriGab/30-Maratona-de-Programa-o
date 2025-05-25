function abrirModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden"; // Desabilita scroll do body
  }
}

function fecharModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto"; // Habilita scroll do body
  }
}

document.addEventListener("DOMContentLoaded", function() {
  // === Lógica dos Modais de Texto (Sobre a Maratona, Final Brasileira) ===
  const linkAbrirModalMaratona = document.getElementById('abrirModalMaratona');
  if (linkAbrirModalMaratona) {
      linkAbrirModalMaratona.addEventListener('click', function(event) {
          event.preventDefault();
          abrirModal('modalMaratona');
      });
  }

  const linkAbrirModalFinal = document.getElementById('abrirModalFinal');
  if (linkAbrirModalFinal) {
      linkAbrirModalFinal.addEventListener('click', function(event) {
          event.preventDefault();
          abrirModal('modalFinal');
      });
  }

  const fecharBotoesModal = document.querySelectorAll('.modal .fechar');
  fecharBotoesModal.forEach(button => {
      button.addEventListener('click', function() {
          const modalId = this.dataset.modal;
          fecharModal(modalId);
      });
  });

  // Fechar modal ao clicar fora do conteúdo
  window.addEventListener("click", function (event) {
      const modais = document.querySelectorAll(".modal");
      modais.forEach(modal => {
          if (event.target === modal) {
              fecharModal(modal.id); // Passa o ID do modal para a função fecharModal
          }
      });
  });

  // === Lógica das Categorias de Patrocínio ===
  const categoriaTitulos = document.querySelectorAll('.categoria-titulo');

  categoriaTitulos.forEach(button => {
      button.addEventListener('click', function() {
          const categoriaId = this.dataset.categoria;
          const categoriaLogos = document.getElementById(categoriaId);

          if (categoriaLogos) {
              // Alterna a visibilidade do próprio grupo
              categoriaLogos.classList.toggle('hidden');
          }

          // Fecha outros grupos de patrocínio abertos
          categoriaTitulos.forEach(otherButton => {
              const otherCategoriaId = otherButton.dataset.categoria;
              const otherCategoriaLogos = document.getElementById(otherCategoriaId);
              // Se for outro botão E o grupo dele estiver visível, esconda-o
              if (otherCategoriaLogos && otherCategoriaId !== categoriaId && !otherCategoriaLogos.classList.contains('hidden')) {
                  otherCategoriaLogos.classList.add('hidden');
              }
          });
      });
  });

  // === Lógica do Menu Dropdown ===
  const dropdownContainers = document.querySelectorAll('.menu-item-dropdown');

  // Fecha todos os submenus abertos
  function closeAllSubmenus() {
      dropdownContainers.forEach(container => {
          const submenu = container.querySelector('.submenu-content');
          if (submenu) {
              submenu.classList.remove('show');
          }
      });
  }

  dropdownContainers.forEach(container => {
      const mainLink = container.querySelector('.menu-main-link');
      const submenu = container.querySelector('.submenu-content');

      if (mainLink && submenu) {
          // Mostrar submenu ao passar o mouse
          container.addEventListener('mouseenter', function() {
              closeAllSubmenus(); // Fecha outros submenus antes de abrir este
              submenu.classList.add('show');
          });

          // Esconder submenu ao tirar o mouse
          container.addEventListener('mouseleave', function() {
              submenu.classList.remove('show');
          });

          // Comportamento do clique no link principal do menu (âncora)
          mainLink.addEventListener('click', function(e) {
              e.preventDefault(); // Previne a navegação imediata para permitir o scroll suave

              const targetId = this.getAttribute('href');
              if (targetId && targetId.startsWith('#')) {
                  const targetElement = document.querySelector(targetId);
                  if (targetElement) {
                      targetElement.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start'
                      });
                  }
              }
              closeAllSubmenus(); // Fecha o submenu após o clique
          });
      }
  });

  // Fechar submenus ao clicar fora de qualquer dropdown
  document.addEventListener('click', function(e) {
      if (!e.target.closest('.menu-item-dropdown')) {
          closeAllSubmenus();
      }
  });

  // Comportamento dos links internos do submenu (âncoras)
  document.querySelectorAll('.submenu-link').forEach(link => {
      link.addEventListener('click', function(e) {
          const href = this.getAttribute('href');

          if (href && href.startsWith('#')) {
              e.preventDefault(); // Previne a navegação imediata
              const targetElement = document.querySelector(href);
              if (targetElement) {
                  targetElement.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                  });
              }
              closeAllSubmenus(); // Fecha o submenu após a navegação
          }
      });
  });

  // === Lógica de Download da Programação ===
  const downloadProgramacaoMenu = document.getElementById('downloadProgramacao'); // O link no menu
const downloadProgramacaoBotaoMapa = document.getElementById('downloadProgramacaoBotaoMapa'); // O NOVO botão/link

// Crie uma função que lida com o download
function handleProgramacaoDownload(e) {
    e.preventDefault(); // Impede o comportamento padrão do link (abrir em nova aba)

    // O caminho do arquivo PDF. Use o caminho completo que você já tem no HTML.
    const filePath = 'imagens/imagens-geral/cronograma-2025.pdf';
    const fileName = 'cronograma-2025.pdf'; // Nome que o arquivo terá ao ser baixado

    const a = document.createElement('a');
    a.href = filePath;
    a.download = fileName; // Define o nome do arquivo para download
    document.body.appendChild(a);
    a.click(); // Simula o clique para iniciar o download
    document.body.removeChild(a); // Remove o link temporário
    
    // Se esta função for chamada pelo link do menu, feche o submenu
    if (e.currentTarget === downloadProgramacaoMenu) {
        closeAllSubmenus(); 
    }
}

// Adicione o event listener para o link do menu
if (downloadProgramacaoMenu) {
    downloadProgramacaoMenu.addEventListener('click', handleProgramacaoDownload);
}

// Adicione o event listener para o novo botão/link do mapa
if (downloadProgramacaoBotaoMapa) {
    downloadProgramacaoBotaoMapa.addEventListener('click', handleProgramacaoDownload);
}


  document.querySelectorAll('a[href^="#"]:not(.menu-main-link):not(.submenu-link)').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          if (this.id !== 'downloadProgramacao') { // Exclui o link de download
              e.preventDefault();
              const targetId = this.getAttribute('href');
              document.querySelector(targetId).scrollIntoView({
                  behavior: 'smooth'
              });
          }
      });
  });

  // === Lógica de Ampliação de Imagens da Galeria (Modal de Imagens) ===
  const images = document.querySelectorAll('.galeria .fotos img');
  const imageModal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const imageCaption = document.getElementById('imageCaption');
  const closeImageModal = document.querySelector('.close-image-modal');

  images.forEach(image => {
      image.addEventListener('click', function() {
          imageModal.style.display = 'block';
          modalImage.src = this.src; // Pega a imagem clicada
          const captionText = this.nextElementSibling && this.nextElementSibling.tagName === 'FIGCAPTION'
                              ? this.nextElementSibling.textContent
                              : this.alt; // Pega a legenda da figura ou o texto alt
          imageCaption.textContent = captionText;
          document.body.style.overflow = "hidden"; // Desabilita scroll do body
      });
  });

  if (closeImageModal) {
      closeImageModal.addEventListener('click', function() {
          imageModal.style.display = 'none';
          document.body.style.overflow = "auto"; // Habilita scroll do body
      });
  }

  // Fechar modal de imagem ao clicar fora da imagem
  if (imageModal) {
      imageModal.addEventListener('click', function(e) {
          if (e.target === imageModal) { // Se o clique foi no fundo do modal, não na imagem
              imageModal.style.display = 'none';
              document.body.style.overflow = "auto"; // Habilita scroll do body
          }
      });
  }
});
  
const backToTopBtn = document.getElementById('backToTopBtn');

// Mostra o botão quando o usuário rolar a página para baixo
window.addEventListener('scroll', function() {
    // Se a rolagem vertical for maior que 200px (pixels)
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopBtn.style.display = 'block'; // Mostra o botão
    } else {
        backToTopBtn.style.display = 'none'; // Esconde o botão
    }
});

// Quando o usuário clicar no botão, rola para o topo da página
if (backToTopBtn) { // Garante que o botão existe antes de adicionar o evento
    backToTopBtn.addEventListener('click', function() {
        // Rola para o topo da página com uma animação suave
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Faz a rolagem ser suave
        });
    });
}



  