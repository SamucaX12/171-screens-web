import type { MobileLesson } from "./types";

export const iosLessons: MobileLesson[] = [
  // ─── 01 · INTRODUÇÃO ─────────────────────────────────────────────────────────
  {
    id: "ios-bypass-intro",
    title: "iOS — O que é Bypass e como detectar",
    platform: "ios",
    categoryId: "introducao",
    order: 1,
    intro:
      "Visão geral de como funciona bypass no iOS: jailbreak, proxy, IPA modificado e memória. Aprenda o que procurar antes de iniciar qualquer SS mobile.",
    coverImage: "/guide/mobile/ios-intro.svg",
    sections: [
      {
        kind: "intro",
        heading: "O que é bypass no iOS",
        body: "Bypass no iOS é qualquer técnica usada para driblar as proteções nativas do sistema e do jogo.\n\nPrincipais categorias:\n• Jailbreak — acesso root ao sistema (Cydia, Sileo, Filza)\n• Proxy / VPN — redirecionar tráfego pra interceptar/replay\n• IPA modificado — versão do app com cheat embutido\n• Injeção de memória — Brevet, iGameGod, Cheat Engine iOS\n\nNa SS mobile você vai cruzar evidências de TODAS essas categorias antes de emitir veredito.",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 1 — Visão geral do fluxo de SS iOS",
        body: "1. Verificar se o dispositivo tem jailbreak (sinais de sistema)\n2. Verificar configuração de rede (proxy, VPN, perfis)\n3. Verificar apps instalados (Cydia, Sileo, Filza, Brevet)\n4. Verificar IPA do Free Fire (assinatura, bundle ID)\n5. Cruzar horários e evidências\n6. Emitir veredito documentado",
        image: "/guide/mobile/ios-flow.svg",
      },
      {
        kind: "tecnica",
        heading: "🕵️ Por que iOS é diferente do PC",
        body: "No PC você acessa Prefetch, USN Journal, Event Viewer.\n\nNo iOS não existe nada disso — você trabalha com:\n• Apps instalados no dispositivo\n• Configurações de rede e VPN\n• Processos rodando (via ferramentas de jailbreak)\n• Assinatura do IPA instalado\n• Comportamento de latência e DNS\n\nA abordagem é mais comportamental e de app inspection.",
        example: "Mano, no iOS você não vai achar Prefetch. Você vai achar Cydia na pasta /Applications e cheat injetado no processo do Free Fire. Muda o que você olha, não a lógica.",
      },
      {
        kind: "veredito",
        heading: "Mentalidade da SS iOS",
        body: "LIMPO = Sem jailbreak + proxy DHCP padrão + IPA assinado pela Garena + sem apps suspeitos\nSUSPEITO = 1-2 sinais ambíguos (VPN genérica, app removido antes da SS)\nBAN = Jailbreak confirmado + cheat app ou injeção ativa + proxy ativo durante a partida",
      },
    ],
    checklist: [
      "Entendi o que é jailbreak e seus indicadores",
      "Sei a diferença entre proxy/VPN suspeito e legítimo",
      "Conheço os apps de bypass iOS mais comuns",
      "Sei onde procurar evidências no iOS",
    ],
  },

  // ─── 02 · JAILBREAK ──────────────────────────────────────────────────────────
  {
    id: "ios-jailbreak",
    title: "iOS — Detectar Jailbreak (Cydia, Sileo, Dopamine)",
    platform: "ios",
    categoryId: "sistema",
    order: 2,
    intro:
      "Como identificar se um iPhone/iPad tem jailbreak ativo: Cydia, Sileo, Filza, Dopamine, Trollstore e outros indicadores de sistema visíveis na SS.",
    coverImage: "/guide/mobile/ios-jailbreak.svg",
    sections: [
      {
        kind: "intro",
        heading: "O que é jailbreak e por que importa",
        body: "Jailbreak remove as restrições do iOS e dá acesso root ao sistema.\n\nCom root, o cheater pode:\n• Instalar tweaks de cheat (via Cydia/Sileo)\n• Injetar código no processo do Free Fire\n• Esconder evidências com app de limpeza\n• Usar ferramentas de memória (Brevet, iGameGod)\n\nSem jailbreak, a maioria dos cheats iOS não funciona.",
        image: "/guide/mobile/ios-jailbreak.svg",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 1 — Procurar Cydia e Sileo na tela inicial",
        body: "Pede pro player mostrar a tela inicial e a biblioteca de apps:\n\n1. Arrasta pra esquerda na tela inicial — procura ícone do Cydia (caixa de papelão amarela)\n2. Procura Sileo (ícone azul, alternativa moderna ao Cydia)\n3. Verifica se tem Zebra (outro gerenciador de pacotes)\n4. Verifica pastas suspeitas na biblioteca (App Library)\n\nSe o player 'escondeu' com atalho, pede pra pesquisar 'Cydia' no Spotlight (desliza na tela inicial).",
        image: "/guide/mobile/ios-cydia.svg",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 2 — Verificar Apps de Jailbreak",
        body: "Lista de apps que indicam jailbreak:\n• Cydia — gerenciador de pacotes original\n• Sileo — gerenciador moderno (A12+)\n• Zebra — alternativa ao Sileo\n• Filza File Manager — acesso root ao sistema de arquivos\n• iFile — gerenciador de arquivos antigo\n• NewTerm / NewTerm 2 — terminal iOS (acesso root via ssh)\n• Brevet — injeção de memória / cheat\n• iGameGod — cheat engine iOS\n• Dopamine — ferramenta de jailbreak moderna\n• Palera1n — jailbreak baseado em exploit\n\nPede que abra a lista completa de apps instalados (Ajustes → Geral → Armazenamento do iPhone).",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 3 — Ajustes → Geral → Armazenamento",
        body: "1. Abre Ajustes\n2. Vai em Geral\n3. Toca em Armazenamento do iPhone\n4. Aguarda carregar (fica rolando a lista)\n\nProcura por: Cydia, Sileo, Filza, Brevet, iGameGod, Dopamine, Palera1n, Trollstore, TrollHelper\n\nSe o player rola rápido demais = RED FLAG. Pede pra voltar e mostrar devagar.",
        image: "/guide/mobile/ios-storage.svg",
      },
      {
        kind: "tecnica",
        heading: "🕵️ Sinais indiretos de jailbreak",
        body: "Nem sempre o app de jailbreak aparece — pode estar oculto.\n\nSinais alternativos:\n• Apps não assinados pela App Store (certificado Enterprise suspeito)\n• Ajustes → Geral → VPN e Gerenciamento de Dispositivo → perfil desconhecido\n• Pastas de sistema visíveis em apps de arquivos\n• SSH respondendo no mesmo Wi-Fi (pra quem sabe testar)\n• Tweaks visíveis em Ajustes (seções de apps customizados)\n• Battery life caindo muito rápido (processo daemon de cheat rodando)\n\nTrollStore: permite instalar apps não assinados SEM jailbreak tradicional. Aparece como 'TrollStore' na biblioteca de apps.",
        example: "Player mostrou Ajustes e tinha uma seção 'Tweaks' logo abaixo de 'Geral'. Isso é injeção de jailbreak no Ajustes. Não precisa nem ver o Cydia.",
      },
      {
        kind: "veredito",
        heading: "Veredito — Jailbreak iOS",
        body: "LIMPO = Sem Cydia/Sileo/Filza + sem perfil suspeito + App Store mostra apps normais\nSUSPEITO = App desinstalado há pouco tempo (storage zerado recente) + comportamento evasivo na SS\nBAN = Cydia/Sileo/Filza/Brevet encontrado + seção de tweaks no Ajustes + evidência de cheat ativo",
      },
    ],
    checklist: [
      "Verificar tela inicial e biblioteca por Cydia/Sileo/Zebra",
      "Conferir Ajustes → Geral → Armazenamento completo",
      "Procurar Filza, Brevet, iGameGod na lista de apps",
      "Verificar se há seção de tweaks em Ajustes",
      "Checar perfis de gerenciamento de dispositivo",
      "Documentar com print antes de qualquer remoção",
    ],
  },

  // ─── 03 · BREVET & MEMÓRIA ───────────────────────────────────────────────────
  {
    id: "ios-brevet",
    title: "iOS — Brevet & Injeção de Memória",
    platform: "ios",
    categoryId: "sistema",
    order: 3,
    intro:
      "Brevet, iGameGod e Cheat Engine iOS são as ferramentas de injeção de memória mais usadas no iOS para cheat no Free Fire. Aprenda a identificar rastros dessas ferramentas.",
    coverImage: "/guide/mobile/ios-brevet.svg",
    sections: [
      {
        kind: "intro",
        heading: "O que é injeção de memória no iOS",
        body: "Injeção de memória = modificar valores do jogo em tempo real na RAM.\n\nNo iOS, as principais ferramentas são:\n• Brevet — mais popular, UI simples, aimbot/wallhack/speed\n• iGameGod — alternativa ao Brevet, baseado em Cheat Engine\n• GameGem — mais antigo, ainda usado\n• Cheat Engine iOS — versão mobile do CE\n\nPara funcionar, PRECISA de jailbreak (ou TrollStore em alguns casos).\n\nA injeção ativa se comporta como daemon rodando em background durante o jogo.",
        image: "/guide/mobile/ios-brevet.svg",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 1 — Procurar Brevet no dispositivo",
        body: "1. Pede pra abrir Spotlight (desliza pra baixo na tela inicial)\n2. Digita 'Brevet' — se aparecer = encontrado\n3. Digita 'iGameGod' — verifica\n4. Vai em Ajustes → Geral → Armazenamento → rola até B e I\n5. Verifica se Brevet tem dados (uso de armazenamento > 0 MB = foi usado)\n\nBrevet recente indica uso ativo. Se mostrar 0.0 MB = apagou os dados antes da SS.",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 2 — Verificar processos ativos (com Filza ou NewTerm)",
        body: "Se o dispositivo tem jailbreak e Filza:\n\n1. Abre Filza\n2. Navega até /private/var/containers/Bundle/Application\n3. Procura pasta com nome suspeito (não App Store)\n4. Verifica processos rodando: Ajustes → Bateria → Atividade recente\n\nNo NewTerm (terminal):\n• Digite: ps aux | grep -i 'brevet\\|igamegod\\|cheat'\n• Qualquer resultado = processo ativo",
      },
      {
        kind: "tecnica",
        heading: "🕵️ Sinais de uso recente de Brevet",
        body: "Mesmo se o Brevet foi apagado, há rastros:\n• Ajustes → Privacidade e Segurança → Memória (iOS 17+) — acessos suspeitos\n• Bateria mostrando uso alto de app 'Brevet' no horário da partida\n• Screenshot do histórico da bateria mostrando 'Brevet' ativo\n• Arquivo de log em /var/mobile/Containers/Data/ (via Filza)\n\nTambém: Free Fire com performance instável + movimentos não-humanos = flag comportamental",
        example: "Player negou tudo mas o Ajustes → Bateria → Últimas 24h mostrava 'Brevet' usando 8% de bateria exatamente no horário do ranked. Ban documentado.",
      },
      {
        kind: "veredito",
        heading: "Veredito — Injeção de Memória iOS",
        body: "LIMPO = Brevet/iGameGod não encontrado em nenhuma busca + bateria sem rastros\nSUSPEITO = App apagado recentemente + espaço zerado + evasão na SS\nBAN = Brevet/iGameGod encontrado + dados de uso + rastro de bateria + gameplay suspeito",
      },
    ],
    checklist: [
      "Buscar 'Brevet' e 'iGameGod' no Spotlight",
      "Conferir Armazenamento do iPhone nas letras B e I",
      "Verificar Ajustes → Bateria → histórico de apps",
      "Verificar se Filza tem pasta de Brevet em /var/containers",
      "Documentar horário de uso vs horário da partida",
    ],
  },

  // ─── 04 · IPA MODIFICADO ─────────────────────────────────────────────────────
  {
    id: "ios-ipa-mod",
    title: "iOS — IPA Modificado & Bundle ID Alterado",
    platform: "ios",
    categoryId: "sistema",
    order: 4,
    intro:
      "IPA modificado é uma versão do Free Fire com cheat embutido no código. Aprenda a identificar versão não-oficial, assinatura alterada e bundle ID suspeito.",
    coverImage: "/guide/mobile/ios-ipa.svg",
    sections: [
      {
        kind: "intro",
        heading: "O que é IPA modificado",
        body: "IPA = formato de pacote de app iOS (equivalente ao APK no Android).\n\nUm IPA modificado é o Free Fire com código de cheat injetado antes da recompilação:\n• Wallhack embutido no binário\n• Speed hack no código de física\n• Aimbot integrado no processamento de input\n\nO app parece o Free Fire normal na tela, mas tem cheat no código.",
        image: "/guide/mobile/ios-ipa.svg",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 1 — Verificar versão do Free Fire",
        body: "1. Pede pra abrir a App Store\n2. Busca por 'Free Fire'\n3. Clica no app oficial da Garena\n4. Verifica a versão atual disponível\n\nAbre o Free Fire instalado → Menu → Configurações → Sobre\nCompara a versão com a disponível na App Store.\n\nVersão diferente da App Store = IPA sideloaded ou modificado.",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 2 — Verificar assinatura e certificado",
        body: "Ajustes → Geral → VPN e Gerenciamento de Dispositivo:\n\n• Free Fire da App Store NÃO aparece aqui\n• Se aparecer 'Garena' com certificado Enterprise = sideload suspeito\n• Certificados de desenvolvedor chinês/desconhecido = RED FLAG\n\nNome do bundle no certificado:\n• Original: com.garena.game.fflhs ou com.garena.game.kgtw\n• Modificado: ID diferente, muitas vezes aleatório",
      },
      {
        kind: "tecnica",
        heading: "🕵️ Como identificar IPA com TrollStore",
        body: "TrollStore permite instalar IPAs não assinados pela App Store SEM jailbreak pleno.\n\nIndicadores:\n• App 'TrollStore' visível na tela inicial\n• Free Fire com ícone ligeiramente diferente (borda ou cor alterada)\n• App não aparece no histórico de compras da App Store\n• Tamanho do app diferente do oficial\n\nVerifica: Ajustes → Geral → Armazenamento → Free Fire → verifica tamanho.\nComparar com tamanho oficial da App Store (disponível na página do app).",
        example: "Free Fire instalado pesava 1.4 GB. Versão oficial na App Store: 980 MB. Diferença de 420 MB = arquivo extra injetado no IPA. Ban.",
      },
      {
        kind: "veredito",
        heading: "Veredito — IPA Modificado iOS",
        body: "LIMPO = Versão igual à App Store + sem certificado suspeito + tamanho normal + sem TrollStore\nSUSPEITO = Versão desatualizada + TrollStore instalado\nBAN = Versão diferente + certificado Enterprise para Free Fire + TrollStore + tamanho inflado",
      },
    ],
    checklist: [
      "Comparar versão do Free Fire instalado vs App Store",
      "Verificar se Free Fire aparece em VPN/Gerenciamento de Dispositivo",
      "Checar tamanho do Free Fire em Armazenamento",
      "Procurar TrollStore na tela inicial",
      "Verificar ícone do Free Fire para diferenças visuais",
    ],
  },

  // ─── 05 · PROXY & VPN ────────────────────────────────────────────────────────
  {
    id: "ios-proxy-vpn",
    title: "iOS — Proxy, VPN e SSL Kill Switch",
    platform: "ios",
    categoryId: "rede",
    order: 5,
    intro:
      "Proxy e VPN no iOS são usados para interceptar e modificar tráfego do jogo. SSL Kill Switch desabilita a verificação de certificados. Aprenda a detectar cada um.",
    coverImage: "/guide/mobile/ios-proxy.svg",
    sections: [
      {
        kind: "intro",
        heading: "Por que proxy/VPN importa na SS iOS",
        body: "Bypass via rede no iOS serve pra:\n• Replay de pacotes (replay do estado do jogo pra simular lag/invencibilidade)\n• Interceptar comunicação e modificar respostas do servidor\n• Esconder tráfego de cheat usando VPN\n• Bypass de detecção anti-cheat via proxy reverso\n\nO passador 171 ScreenS funciona via proxy — você conhece bem essa técnica de dentro pra fora.",
        image: "/guide/mobile/ios-proxy.svg",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 1 — Verificar configuração de proxy no Wi-Fi",
        body: "1. Ajustes → Wi-Fi\n2. Toca no (i) ao lado da rede conectada\n3. Rola até 'Configurar Proxy'\n\nEstados possíveis:\n• Desativado = OK (padrão)\n• Manual = suspeito se IP não é da rede local\n• Automático (PAC) = possível redirect de tráfego\n\nUm IP como 192.168.x.x pode ser passador local.\nDomínio externo em proxy = passador web.",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 2 — Verificar VPN ativa",
        body: "1. Ajustes → Geral → VPN e Gerenciamento de Dispositivo → VPN\n2. Verifica se há VPN configurada e se está ativa\n\nVPN legítima (YouTube Premium, iCloud+): OK geralmente.\nVPN suspeita durante partida:\n• Nome genérico: 'HTTP Proxy', 'Charles Proxy', 'Fiddler', 'Proxyman'\n• Status 'Conectada' no horário da partida\n• Servidor VPN no IP local (192.168.x.x = passador no PC)\n\n3. No topo da tela, procura ícone 'VPN' quando fecha os Ajustes.",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 3 — SSL Kill Switch e certificados",
        body: "SSL Kill Switch desabilita verificação de certificados SSL pra permitir interceptação HTTPS.\n\nIndicadores:\n• Ajustes → Geral → VPN e Gerenciamento de Dispositivo → Perfis de Configuração\n• Perfis com certificados de CA desconhecidos = permite intercept\n• Nomes como 'Charles CA', 'Burp Suite CA', 'Proxyman CA'\n\nSSL Kill Switch como tweak:\n• Aparece como 'SSL Kill Switch 2' em Cydia/Sileo\n• Seção de ajuste visível em Ajustes → SSL Kill Switch\n• Significa jailbreak + intercept ativo",
        image: "/guide/mobile/ios-ssl.svg",
      },
      {
        kind: "tecnica",
        heading: "🕵️ Histórico de conexões e horário",
        body: "Cruza horário de partida vs VPN/proxy:\n\n1. Ajustes → [Seu Nome] → iCloud → Mostrar Atividade (iOS 15+)\n2. App do roteador (se tiver acesso) — vê histórico de DNS/IP\n3. Ajustes → Privacidade → Análises e Melhorias → Dados de Análise → procura entradas do Free Fire\n4. Perguntar horário exato da partida e cruzar com logs de VPN\n\nVPN ativa exatamente no horário de ranked = evidência forte.",
        example: "Player disse que 'VPN era pra usar Spotify'. VPN configurada era 'Charles Proxy' com servidor 192.168.1.100 (PC local). Não tem Spotify que precise de Charles.",
      },
      {
        kind: "veredito",
        heading: "Veredito — Proxy/VPN iOS",
        body: "LIMPO = DHCP sem proxy + sem VPN ativa ou VPN com provedor reconhecido\nSUSPEITO = VPN genérica + perfil de CA não reconhecido\nBAN = Proxy manual apontando pro passador + Charles/Fiddler CA instalado + VPN ativa no horário da partida",
      },
    ],
    checklist: [
      "Verificar Wi-Fi → Configurar Proxy (Manual/Auto/Off)",
      "Listar VPNs configuradas e verificar status no horário da partida",
      "Conferir Perfis de Configuração por certificados de CA suspeitos",
      "Procurar 'SSL Kill Switch' em Ajustes",
      "Cruzar horário de VPN ativa com horário da partida ranked",
    ],
  },

  // ─── 06 · FILZA & FILE SYSTEM ────────────────────────────────────────────────
  {
    id: "ios-filza",
    title: "iOS — Filza & Forense de Arquivos",
    platform: "ios",
    categoryId: "ferramentas",
    order: 6,
    intro:
      "Filza é o gerenciador de arquivos root do iOS. Aprenda a usar Filza para encontrar evidências de cheat no sistema de arquivos e identificar a presença do próprio Filza como indicador.",
    coverImage: "/guide/mobile/ios-filza.svg",
    sections: [
      {
        kind: "intro",
        heading: "Filza como evidência e como ferramenta",
        body: "Filza File Manager dá acesso root ao sistema de arquivos iOS.\n\nÉ evidência por si só: só funciona com jailbreak.\n\nSe o player TEM Filza = jailbreak confirmado.\n\nAlém disso, você pode USAR o Filza (se tiver acesso ao dispositivo) para:\n• Encontrar pastas de cheat em /private/var/\n• Ver processos rodando em /proc/\n• Checar tweaks instalados em /Library/Tweaks/",
        image: "/guide/mobile/ios-filza.svg",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 1 — Confirmar presença do Filza",
        body: "1. Spotlight: digita 'Filza' — ícone verde aparecer = jailbreak\n2. Ajustes → Armazenamento → rola até F → 'Filza File Manager'\n3. Procura também 'iFile' (versão antiga) e 'Santander' (alternativa)\n\nSe o player negou jailbreak mas tem Filza: confronta direto.",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 2 — Caminhos críticos pra inspecionar no Filza",
        body: "Se você tem acesso e o Filza está aberto, inspeciona:\n\n/Applications/ — apps nativas instaladas (tweaks aparecem aqui)\n/Library/Tweaks/ — tweaks de jailbreak (.dylib de cheat)\n/private/var/mobile/Containers/Bundle/Application/ — apps instalados\n/private/var/mobile/Containers/Data/ — dados de apps\n/etc/apt/sources.list.d/ — repositórios Cydia (confirma jailbreak)\n\nProcura qualquer arquivo com nome de cheat conhecido:\ngameguardian, brevet, igamegod, speedhack, aimbot",
      },
      {
        kind: "tecnica",
        heading: "🕵️ Tweaks no /Library/Tweaks/",
        body: "Os tweaks de jailbreak ficam como .dylib em /Library/Tweaks/.\n\nUm cheat tweak aparece como:\n• FreeFire.dylib\n• CheatFF.dylib\n• SpeedHack.dylib\n• Substrate/ pasta com injeções\n\nMesmo que o player apague o Brevet, o .dylib pode persistir em /Library/Tweaks/.\n\nFilza mostra tamanho e data de modificação — datas recentes = uso recente.",
        example: "Player deletou o Brevet da lista de apps, mas /Library/Tweaks/ ainda tinha 'com.brevet.freefire.dylib' modificado no dia da partida. Apagou o app mas esqueceu o tweak.",
      },
      {
        kind: "veredito",
        heading: "Veredito — Filza e File System",
        body: "LIMPO = Filza não encontrado + sistema de arquivos normal (não acessível via SS)\nSUSPEITO = Filza instalado mas sem .dylib suspeito visível\nBAN = Filza presente + /Library/Tweaks/ com .dylib de cheat + data de modificação recente",
      },
    ],
    checklist: [
      "Verificar presença do Filza no Spotlight e Armazenamento",
      "Se acessível: inspecionar /Library/Tweaks/ por .dylib suspeitos",
      "Verificar /Applications/ por apps nativas suspeitas",
      "Conferir datas de modificação dos arquivos encontrados",
      "Cruzar data de modificação com horário da partida",
    ],
  },

  // ─── 07 · FLUXO COMPLETO SS iOS ──────────────────────────────────────────────
  {
    id: "ios-ss-flow",
    title: "iOS — Fluxo Completo SS e Veredito",
    platform: "ios",
    categoryId: "analise",
    order: 7,
    intro:
      "Fluxo completo de como conduzir uma SS mobile no iOS do início ao fim: ordem de verificação, como documentar evidências e como emitir o veredito correto.",
    coverImage: "/guide/mobile/ios-flow.svg",
    sections: [
      {
        kind: "intro",
        heading: "Antes de iniciar a SS — preparação",
        body: "Antes de chamar o player pra call:\n\n1. Confirma que a partida suspeita foi gravada ou reportada (horário exato)\n2. Anota o nick e o dispositivo (modelo do iPhone)\n3. Define o método de SS: screen share do Discord/FaceTime ou presencial\n4. Prepara o checklist antes de começar\n\nComeça a SS sem avisar o que vai procurar — evita que o player apague evidências.",
        image: "/guide/mobile/ios-flow.svg",
      },
      {
        kind: "modulo",
        heading: "📚 ORDEM de verificação (mais importante primeiro)",
        body: "1. Tela inicial e App Library — jailbreak apps visíveis\n2. Spotlight busca: Cydia, Sileo, Filza, Brevet, iGameGod\n3. Ajustes → Armazenamento → lista completa de apps\n4. Wi-Fi → Configurar Proxy\n5. Ajustes → Geral → VPN e Gerenciamento de Dispositivo\n6. Perfis de Configuração → certificados\n7. App Store → versão do Free Fire (compara)\n8. Ajustes → Bateria → últimas 24h (apps suspeitos)\n9. Free Fire → Sobre → versão exata\n10. Documentar tudo com prints",
        image: "/guide/mobile/ios-checklist.svg",
      },
      {
        kind: "modulo",
        heading: "📚 Como documentar corretamente",
        body: "Prints necessários:\n• Tela de Armazenamento mostrando apps instalados\n• Configuração de proxy (mesmo que esteja desativado — prova de que verificou)\n• VPN configurada ou ausente\n• Versão do Free Fire vs App Store\n• Bateria → histórico de apps\n• Qualquer app suspeito encontrado (print do ícone + print do Armazenamento)\n\nNome arquivo sugerido: NICK_DATA_HORA_iOS_SS.png",
      },
      {
        kind: "tecnica",
        heading: "🕵️ Respostas evasivas e como lidar",
        body: "Comportamentos comuns de cheater na SS iOS:\n• 'Meu iCloud tá bugado, não carrega o Armazenamento' — insiste, aguarda carregar\n• 'Não tenho Filza mais, desinstalei' — verifica dados zerados no Armazenamento\n• 'Essa VPN é do trabalho' — pede nome do provedor e IP do servidor\n• 'Meu Wi-Fi tem proxy do roteador' — pede mostrar configuração do roteador\n• Encerra a call antes de mostrar Armazenamento completo = RED FLAG máxima\n\nEvasão consistente já é evidência. Documenta o comportamento.",
        example: "Player travou o compartilhamento de tela na hora de mostrar o Armazenamento. Esperou 2 minutos, 'internet caiu'. Reconectou e o Sileo não aparecia mais. Dados do Sileo somem em segundos — ele desinstalou durante a 'queda'.",
      },
      {
        kind: "veredito",
        heading: "Como emitir o veredito correto",
        body: "INOCENTE — Critérios:\n• Nenhum app de bypass encontrado\n• Proxy/VPN limpos ou com justificativa válida\n• Versão oficial do Free Fire\n• Cooperação total na SS\n\nSUSPEITO — Critérios:\n• 1-2 indicadores ambíguos\n• Evasão parcial (não mostrou tudo)\n• App apagado antes da SS (sem confirmação do cheat)\n→ Aviso formal + SS mais rigorosa na próxima\n\nBANIMENTO — Critérios:\n• Jailbreak confirmado (Cydia/Sileo/Filza)\n• Cheat tool encontrado (Brevet/iGameGod)\n• Proxy manual ativo no horário da partida\n• IPA modificado identificado\n→ Ban documentado com prints + notificação à org",
      },
    ],
    checklist: [
      "Verificar tela inicial e App Library por apps de jailbreak",
      "Buscar no Spotlight: Cydia, Sileo, Filza, Brevet, iGameGod",
      "Verificar Armazenamento completo (rolar devagar)",
      "Checar configuração de proxy e VPN",
      "Confirmar perfis de configuração e certificados CA",
      "Comparar versão do Free Fire com a App Store",
      "Verificar histórico de bateria por apps suspeitos",
      "Documentar tudo com prints nomeados corretamente",
      "Emitir veredito com critérios claros e documentação completa",
    ],
  },
];
