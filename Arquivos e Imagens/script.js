let serverPath = String(window.location.href);
let relativePathWolfJson = "/Arquivos e Imagens/lobinhos.json"

async function inicializarLocalStorage() {
    try {
        const response = await fetch(String(path.substring(0, getSubstringPosition(serverPath, '/', 3), path) + relativePathWolfJson));
        if (!response.ok) {
            throw new Error(`Erro ao buscar lobinho.json: ${response.statusText}`);
        }
        const lobos = await response.json();
        localStorage.setItem('lobos', JSON.stringify(lobos));
        console.log('Lobos inicializados no localStorage');
    } catch (error) {
        console.error('Erro ao inicializar o localStorage:', error);
    } finally {
        console.log('Tentativa de inicialização do localStorage concluída');
    }
}

if (!localStorage.getItem('lobos')) {
    inicializarLocalStorage().then(() => {
        console.log('Inicialização do localStorage concluída');
    }).catch(error => {
        console.error('Erro durante a inicialização do localStorage:', error);
    });
}

function getSubstringPosition(string, subString, nth_occur) {
    return string.split(subString, nth_occur).join(subString).length;
}

