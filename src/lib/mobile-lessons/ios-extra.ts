import type { MobileLesson } from "./types";

export const iosExtraLessons: MobileLesson[] = [

  // ─── terms-advance ───────────────────────────────────────────────────────────
  {
    id: "ios-terms-advance",
    title: "iOS — Termos Avançados da SS Mobile",
    platform: "ios",
    categoryId: "introducao",
    order: 10,
    intro:
      "Glossário dos termos técnicos que aparecem durante uma SS iOS avançada: jailbreak, tweak, dylib, substrate, daemon, bundle ID, code signing e mais.",
    sections: [
      {
        kind: "intro",
        heading: "Por que conhecer os termos importa",
        body: "Durante uma SS o cheater pode usar termos técnicos pra te confundir.\n\nSaber o vocabulário correto te dá autoridade e você sabe exatamente o que pedir pra ele mostrar.",
      },
      {
        kind: "modulo",
        heading: "📚 Glossário iOS — Jailbreak e Sistema",
        body: "• Jailbreak — remoção das restrições de segurança do iOS; dá acesso root\n• Root — nível de acesso máximo ao sistema (equivalente ao administrador)\n• Tweak — plugin instalado via Cydia/Sileo que modifica comportamento do iOS ou de apps\n• Substrate / Substitute / Ellekit — frameworks que carregam tweaks no sistema\n• .dylib — biblioteca dinâmica; arquivo onde tweak de cheat é compilado\n• Daemon — processo em background que roda o tempo todo (cheat pode ser daemon)\n• SpringBoard — processo da tela inicial do iOS (tweaks muitas vezes o injetam)\n• Cydia / Sileo / Zebra — gerenciadores de pacotes de tweaks (equivale à Play Store do jailbreak)\n• Repo — repositório de tweaks no Cydia/Sileo (como uma loja de cheats)\n• Palera1n / Dopamine / unc0ver — ferramentas de jailbreak modernas",
      },
      {
        kind: "modulo",
        heading: "📚 Glossário iOS — Apps e Arquivos",
        body: "• IPA — formato do pacote de app iOS (como APK no Android)\n• Bundle ID — identificador único do app (ex: com.garena.game.fflhs)\n• Code Signing — assinatura criptográfica que valida quem publicou o app\n• Entitlements — permissões declaradas no app pela Apple\n• Sideload — instalar IPA fora da App Store (TrollStore, AltStore, etc.)\n• TrollStore — ferramenta que instala IPAs sem jailbreak pleno\n• AltStore — sideload via conta de desenvolvedor gratuita\n• Plist — formato de arquivo de configuração do iOS (como .xml ou .json)\n• /var/mobile/ — pasta do usuário no iOS (cheats deixam rastros aqui)\n• /Library/Tweaks/ — onde tweaks .dylib ficam instalados após jailbreak",
      },
      {
        kind: "modulo",
        heading: "📚 Glossário iOS — Rede e Interceptação",
        body: "• Proxy HTTP/HTTPS — intermediário de rede que intercepta tráfego\n• Charles Proxy — ferramenta popular de intercept em Mac/PC\n• SSL Kill Switch — tweak que desabilita verificação SSL pro iOS\n• PAC File — Proxy Auto-Configuration; script que redireciona tráfego automaticamente\n• VPN Profile — perfil de rede instalado nos Ajustes que encaminha tráfego\n• CA Certificate — certificado raiz que permite SSL intercept sem erro\n• DNS over HTTPS (DoH) — DNS criptografado; pode ocultar tráfego suspeito\n• Passador — serviço de replay de pacotes (específico do contexto Deep Screen Share)",
      },
      {
        kind: "tecnica",
        heading: "🕵️ Termos que o cheater usa pra te confundir",
        body: "Falas comuns de cheater que você precisa saber rebater:\n\n• 'Isso é do meu trabalho' → peça nome da empresa e IP do servidor VPN\n• 'Instalei sem saber' → data de instalação do Cydia não mente\n• 'É um tweak de tema' → tweaks de tema não ficam em /Library/Tweaks/ com nome de Free Fire\n• 'Não sei o que é isso' → mostra o app → é Brevet com ícone trocado\n• 'A Apple manda esses perfis' → perfis da Apple não têm certificados de CA chinês",
        example: "Cheater disse 'isso é o Substrate pra personalizar o keyboard'. Substrate sem tweaks não aparece em /Library/Tweaks/. Tinha FreeFire.dylib com 2.1MB na pasta.",
      },
      {
        kind: "veredito",
        heading: "Checklist de termos pra memorizar",
        body: "Prioridade alta: .dylib, bundle ID, tweak, substrate, sideload, code signing\nPrioridade média: PAC file, CA certificate, SSL Kill Switch, TrollStore\nConhecer pra reconhecer: palera1n, dopamine, ellekit, zebra",
      },
    ],
    checklist: [
      "Sei o que é um tweak e onde fica (.dylib em /Library/Tweaks/)",
      "Entendo a diferença entre jailbreak e TrollStore",
      "Sei o que é bundle ID e por que o Free Fire tem um específico",
      "Conheço o que é SSL Kill Switch e CA certificate",
      "Sei rebater as desculpas comuns do cheater com vocabulário correto",
    ],
  },

  // ─── ios-advance ─────────────────────────────────────────────────────────────
  {
    id: "ios-advance",
    title: "iOS Avançado — Técnicas de Detecção Profunda",
    platform: "ios",
    categoryId: "avancado",
    order: 11,
    intro:
      "Técnicas avançadas de SS iOS: análise de processos com iSH, verificação de code signing, Frida inject detection, entitlements e análise de comportamento de rede.",
    sections: [
      {
        kind: "intro",
        heading: "Quando as técnicas básicas não bastam",
        body: "Cheaters avançados limpam rastros básicos antes da SS:\n• Deletam Cydia/Sileo da tela inicial (mas /Applications/ ainda tem)\n• Renomeiam o Brevet pra app genérico\n• Usam DenyList de Safari pra limpar histórico\n• TrollStore sem jailbreak clássico\n\nPrecisas das técnicas avançadas quando o cheater passou na SS básica mas o gameplay ainda é suspeito.",
      },
      {
        kind: "modulo",
        heading: "📚 Técnica 1 — Verificar /Applications/ via Filza",
        body: "Apps de jailbreak podem estar ocultos da tela inicial mas ainda existem em /Applications/:\n\n1. Abre Filza → navega até /Applications/\n2. Procura pastas com nomes suspeitos: Cydia.app, Sileo.app, Zebra.app\n3. Apps nessa pasta = instalados com root, não pela App Store\n4. Verifica data de criação das pastas\n\nQualquer pasta .app em /Applications/ que não seja app nativo do iOS = sinal de jailbreak.",
      },
      {
        kind: "modulo",
        heading: "📚 Técnica 2 — Análise de entitlements do Free Fire",
        body: "Entitlements são permissões declaradas no binário do app.\n\nFree Fire modificado pode ter entitlements extras adicionados:\n• com.apple.private.security.no-sandbox = bypass de sandbox\n• task_for_pid = acesso à memória de outros processos\n• platform-application = privilégios de plataforma\n\nVerifica via NewTerm:\ncodesign -dv --entitlements - /var/containers/Bundle/Application/*/FreeFire.app/FreeFire\n\nSe tiver entitlements privados que a Garena não declararia = IPA modificado.",
      },
      {
        kind: "modulo",
        heading: "📚 Técnica 3 — Detectar injeção via DYLD_INSERT_LIBRARIES",
        body: "Cheats por injeção usam DYLD_INSERT_LIBRARIES para carregar .dylib no processo do Free Fire.\n\nSinais:\n1. Arquivos .dylib recentes em /Library/MobileSubstrate/DynamicLibraries/\n2. Tweaks com plist que lista com.dts.freefireth como target\n3. Via NewTerm: ls /Library/MobileSubstrate/DynamicLibraries/ | grep -i fire\n\nQualquer resultado = tweak injetado especificamente no Free Fire.",
      },
      {
        kind: "tecnica",
        heading: "🕵️ Técnica 4 — Análise de comportamento de tráfego",
        body: "Com acesso ao roteador ou via app de monitoramento de rede no iOS:\n\n1. App 'Network Analyzer' → verifica conexões ativas durante jogo\n2. DNS queries suspeitas durante a partida: IPs que não são da Garena\n3. Upload anormal durante ranked: pode ser stream de video do cheat (esp. remote)\n4. Latência spike regular com padrão = replay de pacotes (passador)\n\nEndpoints legítimos do Free Fire: garena.com, garena.global, freefireind.com\nQualquer outro IP com tráfego pesado durante ranked = suspeito",
        example: "DNS log do roteador mostrava 'relay.deepscreenshare.net' sendo consultado 40x durante o ranked. Passador web ativo confirmado sem precisar ver o iPhone.",
      },
      {
        kind: "veredito",
        heading: "Quando usar técnicas avançadas",
        body: "USE quando:\n• SS básica não achou nada mas gameplay é claramente suspeito\n• Player passou na SS mas rank subiu de forma anormal\n• Outros players reportaram durante a partida\n• 2ª SS do mesmo player em menos de 30 dias\n\nNÃO USE se:\n• SS básica já encontrou evidência — não precisa ir mais fundo\n• Acusação sem base — só aplica técnicas com suspeita razoável",
      },
    ],
    checklist: [
      "Verificar /Applications/ via Filza por apps ocultos",
      "Checar entitlements do Free Fire se suspeitar de IPA modificado",
      "Inspecionar /Library/MobileSubstrate/DynamicLibraries/ por tweaks do FF",
      "Analisar tráfego de rede se tiver acesso ao roteador",
      "Cruzar técnicas avançadas com evidências comportamentais",
    ],
  },

  // ─── ajustes-ios ─────────────────────────────────────────────────────────────
  {
    id: "ios-ajustes",
    title: "iOS — Mapa Completo dos Ajustes para SS",
    platform: "ios",
    categoryId: "ferramentas",
    order: 12,
    intro:
      "Mapa completo de onde encontrar cada evidência nos Ajustes do iOS: da rede ao armazenamento, bateria, privacidade e gerenciamento de dispositivo.",
    coverImage: "/guide/mobile/ios-storage.svg",
    sections: [
      {
        kind: "modulo",
        heading: "📚 Ajustes → Wi-Fi",
        body: "Caminho: Ajustes → Wi-Fi → (i) da rede\n\nO que verificar:\n• Configurar Proxy → Manual ou Automático = suspeito\n• DNS personalizado (no lugar de automático) = possível DoH ou redirect\n• IP e máscara da rede (verifica se é a mesma rede ou VPN local)\n\nMostrar enquanto o Free Fire está rodando = proxy ativo durante jogo",
      },
      {
        kind: "modulo",
        heading: "📚 Ajustes → Geral → Armazenamento",
        body: "Caminho: Ajustes → Geral → Armazenamento do iPhone\n\nO que verificar:\n• Lista de todos os apps instalados ordenada por tamanho\n• Scroll devagar — não deixa pular seção\n• Free Fire: tamanho total (app + dados)\n• Cydia/Sileo/Filza/Brevet: presença = jailbreak confirmado\n• Apps com nome genérico mas tamanho anormal (renomeados)\n\nDados de uso (tocar no app):\n• Documentos e Dados = arquivos gerados pelo app\n• Brevet com dados = foi usado recentemente",
      },
      {
        kind: "modulo",
        heading: "📚 Ajustes → Privacidade e Segurança",
        body: "Caminho: Ajustes → Privacidade e Segurança\n\n• Relatório de Privacidade de App → quais apps acessaram microfone, câmera, localização\n  (Free Fire acessar microfone fora de jogo = estranho)\n• Localização → apps com acesso contínuo sem justificativa\n• Controle de Aplicativos → AppClips e apps que modificaram o sistema\n\nAjustes → Geral → VPN e Gerenciamento de Dispositivo:\n• VPN configurada e status\n• Perfis de configuração instalados\n• Certificados de CA (root certificates)",
      },
      {
        kind: "modulo",
        heading: "📚 Ajustes → Bateria",
        body: "Caminho: Ajustes → Bateria\n\nÚltimas 24 Horas / 10 Dias:\n• Lista de apps com % de uso de bateria\n• Brevet/Cydia com bateria no horário da partida = uso confirmado\n• 'Em background' alto = daemon de cheat rodando em background\n\nNível de Bateria e Gráfico:\n• Verifica queda de bateria no horário da partida\n• Comparar com queda em outros momentos\n\nTemperatura:\n• Ajustes → Bateria → temperatura não mostra diretamente, mas calor = processo pesado",
      },
      {
        kind: "tecnica",
        heading: "🕵️ Ajustes com tweaks de jailbreak",
        body: "Com jailbreak, os Ajustes ganham seções extras:\n\n• SBSettings ou CCSettings = controles extras na Central de Controle\n• Seção 'Tweaks' ou nome do tweak diretamente nos Ajustes\n• 'Brevet Settings' em Ajustes = Brevet instalado\n• 'SSL Kill Switch' em Ajustes = kill switch ativo\n• 'iCleaner' ou 'BioProtect' = ferramentas de privacidade de jailbreak\n\nQualquer seção estranha nos Ajustes que não é da Apple = tweak instalado.",
        example: "Player abriu Ajustes e tinha uma seção 'com.brevet.settings' entre Geral e Acessibilidade. Disse que não sabia o que era. O app não existe sem jailbreak.",
      },
      {
        kind: "veredito",
        heading: "Ordem de verificação nos Ajustes",
        body: "1. Wi-Fi → proxy primeiro (evidência de rede)\n2. Geral → Armazenamento → lista de apps (jailbreak apps)\n3. Geral → VPN e Gerenciamento → perfis e certificados\n4. Bateria → histórico de apps (uso no horário da partida)\n5. Privacidade → Relatório de App (acessos suspeitos)\n6. Seções extras = tweaks de jailbreak",
      },
    ],
    checklist: [
      "Verificar proxy e DNS no Wi-Fi",
      "Conferir lista completa de apps no Armazenamento",
      "Listar perfis VPN e certificados de CA",
      "Checar bateria → histórico de apps no horário suspeito",
      "Verificar Relatório de Privacidade de App",
      "Procurar seções extras nos Ajustes (tweaks)",
    ],
  },

  // ─── am-i-secure ─────────────────────────────────────────────────────────────
  {
    id: "ios-am-i-secure",
    title: "iOS — Am I Secure? Verificação de Segurança",
    platform: "ios",
    categoryId: "ferramentas",
    order: 13,
    intro:
      "Am I Secure é um app da App Store que verifica segurança do dispositivo iOS: detecta jailbreak, proxy, certificados suspeitos e configurações comprometidas.",
    sections: [
      {
        kind: "intro",
        heading: "O que é Am I Secure",
        body: "Am I Secure = app de auditoria de segurança disponível na App Store.\n\nO que ele verifica:\n• Detecção de jailbreak (mesmo tentativas de esconder)\n• Configurações de proxy e VPN suspeitas\n• Certificados de CA não confiáveis instalados\n• Versão do iOS desatualizada (vulnerabilidades)\n• Configurações de segurança do dispositivo\n\nVantagem pra SS: é um app legítimo da App Store, player não pode negar a existência do resultado.",
      },
      {
        kind: "modulo",
        heading: "📚 Como usar na SS",
        body: "1. Pede pro player abrir a App Store e buscar 'Am I Secure'\n2. Se não tiver instalado: pede pra instalar na hora (é grátis)\n3. Abre o app e roda o scan\n4. Aguarda resultado completo\n5. Pede pra mostrar CADA resultado expandido\n\nResultados importantes:\n• 'Jailbreak detected' = confirmado, sem discussão\n• 'Untrusted certificate' = CA de intercept instalado\n• 'Proxy detected' = proxy ativo\n• 'VPN active' = VPN ativa no momento",
      },
      {
        kind: "modulo",
        heading: "📚 Interpretando os resultados",
        body: "• ✓ Verde = item limpo\n• ⚠ Amarelo = atenção, verificar manualmente\n• ✗ Vermelho = problema encontrado\n\nErros comuns de cheater ao ver resultado:\n• 'É bug do app' → outros dispositivos limpos não mostram isso\n• 'É do Wi-Fi da empresa' → pede testar em dados móveis\n• 'App está desatualizado' → não importa, jailbreak é jailbreak\n\nJailbreak detected no Am I Secure = ban automático, sem precisar de mais evidência.",
      },
      {
        kind: "tecnica",
        heading: "🕵️ Limitações do Am I Secure",
        body: "O Am I Secure pode ser bypassado em alguns jailbreaks:\n• DenyList do Magisk (Android) tem equivalente no iOS chamado 'Liberty Lite' ou 'A-Bypass'\n• Com Liberty Lite ativo, Am I Secure pode reportar 'Not Jailbroken' mesmo com jailbreak\n\nSe o Am I Secure disse 'Not Jailbroken' mas você tem outras evidências:\n• Verifica a aba de tweaks = se Liberty Lite ou A-Bypass está instalado\n• A presença de um tweak de bypass de detecção = evidência ainda mais forte\n• Cheater instalou um tweak pra esconder do Am I Secure = confirma que tem jailbreak",
        example: "Am I Secure disse 'Not Jailbroken' mas em Ajustes tinha uma seção 'A-Bypass Settings'. A-Bypass é tweak que esconde jailbreak de apps de detecção. Jailbreak confirmado pela tentativa de esconder.",
      },
      {
        kind: "veredito",
        heading: "Veredito — Am I Secure",
        body: "USAR COMO: ferramenta auxiliar, não única evidência\nPESO: alto quando detecta jailbreak, médio para proxy/VPN\nLIMITAÇÃO: pode ser bypassado com Liberty Lite / A-Bypass\nFORTE: presença de tweak de bypass = evidência contra o cheater",
      },
    ],
    checklist: [
      "Instalar Am I Secure da App Store durante a SS",
      "Rodar scan completo e esperar resultado",
      "Expandir cada resultado para detalhes",
      "Verificar se tem tweak de bypass de detecção (Liberty Lite, A-Bypass)",
      "Cruzar resultados com outras evidências encontradas",
    ],
  },

  // ─── device-info ─────────────────────────────────────────────────────────────
  {
    id: "ios-device-info",
    title: "iOS — Device Info: Verificar Specs Reais",
    platform: "ios",
    categoryId: "ferramentas",
    order: 14,
    intro:
      "Device Info é um app que mostra informações reais de hardware do dispositivo — útil para detectar emuladores iOS, spoof de modelo e verificar se o iPhone declarado é real.",
    sections: [
      {
        kind: "intro",
        heading: "Por que verificar informações do dispositivo",
        body: "Cheater pode:\n• Declarar que usa iPhone 12 mas estar em emulador\n• Usar spoof de modelo via tweak (muda o que o iOS reporta)\n• Usar iOS em chip Android (Project Sandcastle - raro mas existe)\n\nVerificando Device Info você:\n• Confirma que o modelo declarado bate com o hardware real\n• Identifica emuladores iOS (muito raro mas existem pra Mac)\n• Detecta spoofing de modelo via tweak",
      },
      {
        kind: "modulo",
        heading: "📚 Como usar Device Info na SS",
        body: "App: 'Device Info — System & Network' ou 'System Status Pro'\n\n1. Pede pra abrir o app (instalar da App Store se não tiver)\n2. Verifica:\n   • Modelo: deve bater com o iPhone declarado (ex: iPhone14,3 = iPhone 13 Pro Max)\n   • Versão iOS: verifica se é versão jailbreakável ou não\n   • Número de série: deve ter formato válido da Apple\n   • IMEI: deve existir (emuladores não têm IMEI real)\n   • Armazenamento: deve bater com o modelo (iPhone 64GB não tem 512GB)\n3. Cross-reference com apple.com/br/shop para verificar specs do modelo",
      },
      {
        kind: "modulo",
        heading: "📚 Sinais de emulador iOS ou spoof",
        body: "• Temperatura: app mostra temperatura do SoC — emulador em Mac mostra temperatura irreal\n• Número de série com formato errado: deve ser XXXXXXXXXXX (11 caracteres alfanuméricos)\n• UDID: identificador único do dispositivo — emuladores têm UDID gerado artificialmente\n• Resolução de tela diferente do modelo declarado\n• Uso de RAM acima do máximo do modelo (ex: iPhone SE tem 3GB, não pode ter 8GB)\n• Versão do SoC diferente do modelo (iPhone 13 tem A15, não pode ter A9)\n\nMais sobre número de série:\nFormato Apple: C[manufatura][ano][semana][identificador]\nEx: C8WH2V → C = Foxconn China, 8 = 2018, W = semana 15, H2V = modelo",
      },
      {
        kind: "tecnica",
        heading: "🕵️ Verificar versão iOS vs compatibilidade de jailbreak",
        body: "Cruza a versão do iOS com jailbreaks conhecidos:\n\n• iOS 16.0–16.6.1: palera1n (A8–A11), dopamine (A12+)\n• iOS 15.x: palera1n, checkra1n, unc0ver\n• iOS 14.x: checkra1n, unc0ver, Taurine\n• iOS 17.0–17.6.1: palera1n (A8–A11), algumas versões\n• iOS 18.x: maioria sem jailbreak disponível (2025)\n\nSe o device está em versão jailbreakável + comportamento suspeito:\n→ Chances altíssimas de ter jailbreak, mesmo que não apareça na SS básica",
        example: "Player com iPhone XR (A12) em iOS 15.4.1. Essa combinação é jailbreakável via unc0ver ou dopamine. Com gameplay suspeito, a SS deve focar em sinais de jailbreak furtivo.",
      },
      {
        kind: "veredito",
        heading: "Veredito — Device Info",
        body: "VERIFICAR SEMPRE: modelo vs specs declarados\nSINAL DE ALERTA: iOS em versão jailbreakável + gameplay suspeito\nBAN DIRETO: IMEI inválido ou emulador iOS confirmado",
      },
    ],
    checklist: [
      "Verificar modelo real vs modelo declarado",
      "Checar IMEI (deve existir, deve ser válido)",
      "Confirmar versão iOS e checar se é jailbreakável",
      "Verificar RAM vs especificação do modelo",
      "Cruzar número de série com informações da Apple",
    ],
  },

  // ─── ish-shell ────────────────────────────────────────────────────────────────
  {
    id: "ios-ish-shell",
    title: "iOS — iSH Shell: Terminal Linux no iOS",
    platform: "ios",
    categoryId: "ferramentas",
    order: 15,
    intro:
      "iSH Shell é um emulador de terminal Linux para iOS disponível na App Store. Aprenda o que sua presença indica e como usar comandos para evidências.",
    sections: [
      {
        kind: "intro",
        heading: "O que é iSH Shell",
        body: "iSH Shell = emulador de shell Linux que roda DENTRO do iOS, sem jailbreak.\n\niSH em si não é cheat. Mas indica:\n• Usuário com conhecimento técnico avançado\n• Possível uso para diagnóstico/análise do próprio dispositivo\n• Base para instalar ferramentas de análise ou automação\n\nNa SS, iSH aberto com comandos de análise do Free Fire = RED FLAG.",
      },
      {
        kind: "modulo",
        heading: "📚 O que verificar no iSH",
        body: "1. Verifica se iSH está instalado (Spotlight ou Armazenamento)\n2. Abre o iSH e verifica histórico de comandos:\n   • Digite: history | grep -i free\n   • Procura comandos relacionados ao Free Fire\n3. Verifica arquivos criados: ls ~/\n4. Histórico de net requests: history | grep -i curl\n\nNota: iSH não tem acesso ao sistema iOS real (sandbox), então por si só não pode instalar cheats.\nMas pode ser usado para baixar scripts, analisar tráfego ou automatizar ações.",
      },
      {
        kind: "tecnica",
        heading: "🕵️ iSH + SSH = acesso remoto suspeito",
        body: "iSH com servidor SSH configurado pode ser usado para acesso remoto ao iPhone:\n\n1. Cheater liga SSH no iSH\n2. Alguém no PC conecta via SSH no iPhone via mesmo Wi-Fi\n3. Controla terminal no iPhone remotamente\n4. Pode executar cheats via linha de comando\n\nVerifica:\n• iSH tem pacote 'openssh' instalado? (ls /usr/bin/ssh)\n• Porta 22 aberta? (netstat -an | grep :22)\n• Histórico mostra sessão SSH ativa?\n\nSe SSH está rodando no iSH durante o jogo = REMOTE ACCESS via terminal confirmado",
        example: "iSH aberto com sshd rodando, histórico mostrando 'ncat 192.168.1.100 9999' — pipe de saída de dados do iPhone pra PC na mesma rede durante a partida.",
      },
      {
        kind: "veredito",
        heading: "Veredito — iSH Shell",
        body: "LIMPO: iSH instalado sem uso relacionado ao Free Fire ou SSH\nSUSPEITO: iSH com ferramentas de rede instaladas + partida suspeita\nBAN: iSH com SSH ativo + conexão remota comprovada no horário da partida",
      },
    ],
    checklist: [
      "Verificar presença do iSH na gaveta e Armazenamento",
      "Abrir e verificar histórico de comandos",
      "Checar se SSH está instalado e rodando",
      "Verificar conexões ativas durante o período da partida",
    ],
  },

  // ─── team-views ───────────────────────────────────────────────────────────────
  {
    id: "ios-team-views",
    title: "iOS — TeamViewer e Controle Remoto (Cheat Remoto)",
    platform: "ios",
    categoryId: "ferramentas",
    order: 16,
    intro:
      "TeamViewer e apps de controle remoto no iOS permitem que outra pessoa controle o dispositivo de longe. Aprenda como isso é usado como cheat e como detectar.",
    sections: [
      {
        kind: "intro",
        heading: "Como controle remoto é usado como cheat",
        body: "Método: o cheater compartilha a tela do iPhone com um 'coach' no PC que:\n• Controla o movimento pelo mirroring\n• Dá instruções em tempo real\n• Ou usa automação (macro remoto) via controle remoto\n\nApps usados:\n• TeamViewer QuickSupport (acesso remoto completo)\n• AnyDesk\n• Veency (controle VNC via jailbreak)\n• Mirror for iPhone (screen mirroring local)\n• QuickTime no Mac (controle via cabo USB)\n\nNa SS você não está vendo cheat de código — você está vendo um OPERADOR HUMANO controlando o jogo remotamente.",
      },
      {
        kind: "modulo",
        heading: "📚 Detectar TeamViewer e similares",
        body: "1. Spotlight: busca 'TeamViewer', 'AnyDesk', 'VNC'\n2. Configurações → Apps → todos os apps: scroll completo\n3. Configurações → Privacidade → Câmera/Microfone → apps com acesso = TeamViewer pode precisar\n4. Configurações → Geral → Armazenamento → TeamViewer com dados recentes = foi usado\n5. iOS 13+: quando TeamViewer conecta aparece banner de aviso na tela\n   → Captura de tela durante conexão mostraria o banner\n\nVeency (via jailbreak):\n• Instala VNC server no iOS\n• Permite controle remoto completo via jailbreak\n• Detectar: Cydia/Sileo → 'Veency' instalado",
      },
      {
        kind: "tecnica",
        heading: "🕵️ Sinais de controle remoto durante o jogo",
        body: "Sinais comportamentais de controle remoto:\n• Movimentos não-naturais: input muito preciso demais pra mobile\n• Latência de resposta: cliques com 100-200ms de delay consistente (latência de rede)\n• Padrões repetitivos perfeitos: spray de recoil matematicamente idêntico\n• Coordenadas de mira se mover em pixel perfeito\n• Resposta errada quando pede pra executar ação imediata (lag do operador remoto)\n\nTeste durante a SS:\n• Pede pra executar ação inusitada imediatamente (girar câmera 360° em 2 segundos)\n• Se demorar anormalmente = lag do operador remoto confirmando controle externo",
        example: "Pedi pra virar a câmera 360° rápido. Levou 4 segundos e o movimento foi em etapas de 90°, não contínuo. Alguém no PC controlando via TeamViewer com mouse.",
      },
      {
        kind: "veredito",
        heading: "Veredito — Controle Remoto",
        body: "LIMPO: sem TeamViewer/AnyDesk + movimentos naturais de touchscreen\nSUSPEITO: TeamViewer instalado com dados recentes + gameplay muito preciso\nBAN: TeamViewer com log de sessão no horário da partida + controle remoto confirmado por teste",
      },
    ],
    checklist: [
      "Buscar TeamViewer, AnyDesk, VNC na gaveta e Armazenamento",
      "Verificar dados de uso do TeamViewer (horário de última sessão)",
      "Checar Veency no Cydia/Sileo se dispositivo tem jailbreak",
      "Aplicar teste de resposta imediata para detectar lag de controle remoto",
      "Analisar padrão de movimentos por naturalidade de touchscreen",
    ],
  },

  // ─── device-monitor ──────────────────────────────────────────────────────────
  {
    id: "ios-device-monitor",
    title: "iOS — Device Monitor: Processos e Recursos",
    platform: "ios",
    categoryId: "ferramentas",
    order: 17,
    intro:
      "Device Monitor e System Status mostram processos rodando no iOS, uso de CPU, memória e rede em tempo real — útil para detectar daemons suspeitos de cheat.",
    sections: [
      {
        kind: "intro",
        heading: "Por que monitorar processos no iOS",
        body: "Cheat como daemon roda em background permanentemente:\n• Usa CPU mesmo quando Free Fire está minimizado\n• Aparece no lista de processos com nome genérico\n• Consome memória RAM constante\n• Pode ter tráfego de rede próprio\n\nApps da App Store que ajudam:\n• 'System Status Pro' — CPU, RAM, rede, temperatura\n• 'iStatistica' — monitor completo\n• 'CPU Dasher X' — processos em tempo real\n\nCom jailbreak: mach-o tools, ps aux via NewTerm são muito mais poderosos",
      },
      {
        kind: "modulo",
        heading: "📚 O que procurar no monitor de sistema",
        body: "CPU:\n• Free Fire usando >80% CPU em idle (antes de entrar em partida) = processo suspeito\n• Processo desconhecido com CPU alta = daemon de cheat\n\nMemória:\n• RAM usada acima do esperado pro modelo\n• Processo sem nome legível usando muita memória\n\nRede:\n• Transferência de dados ativa quando Free Fire está em background\n• Upload constante = stream de tela para servidor de controle remoto\n• Múltiplas conexões TCP simultâneas com IPs não-Garena\n\nTemperatura:\n• Dispositivo muito quente fora do jogo = processo pesado em background",
      },
      {
        kind: "tecnica",
        heading: "🕵️ Usando ps aux com jailbreak",
        body: "Com NewTerm ou iSH instalados (jailbreak):\n\nComandos úteis:\n• ps aux — lista todos os processos rodando\n• ps aux | grep -i 'free\\|garena\\|cheat\\|brevet\\|hack' — filtra suspeitos\n• top -l 1 — snapshot de CPU e memória por processo\n\nO que procurar na lista:\n• /private/var/containers/Bundle/Application/XX/Brevet.app/Brevet\n• /Library/MobileSubstrate/Daemons/ — daemons de jailbreak\n• Processo com nome aleatório de letras (ex: 'xkdfp') usando CPU alta\n• Processo com caminho em /var/mobile/ que não é app legítimo",
        example: "ps aux mostrou processo 'springhook' usando 15% de CPU com caminho /Library/MobileSubstrate/Daemons/springhook. Não é daemon legítimo — é o hook do cheat injetado no SpringBoard.",
      },
      {
        kind: "veredito",
        heading: "Veredito — Device Monitor",
        body: "LIMPO: processos todos reconhecidos + temperatura normal + rede apenas da Garena\nSUSPEITO: processo desconhecido + CPU/RAM acima do esperado\nBAN: daemon de cheat identificado em ps aux + uso de CPU anormal + tráfego de rede suspeito",
      },
    ],
    checklist: [
      "Abrir System Status/iStatistica e capturar snapshot de processos",
      "Verificar CPU por processos desconhecidos com uso alto",
      "Checar RAM total usada vs esperado pro modelo",
      "Monitorar tráfego de rede com Free Fire em background",
      "Se jailbreak: usar ps aux no NewTerm para lista completa",
    ],
  },

  // ─── codsignid ────────────────────────────────────────────────────────────────
  {
    id: "ios-codsignid",
    title: "iOS — Code Signing ID: Verificar Assinatura de Apps",
    platform: "ios",
    categoryId: "sistema",
    order: 18,
    intro:
      "Code Signing ID verifica quem assinou o IPA instalado. Free Fire modificado tem assinatura diferente da Garena — aprenda a identificar assinaturas suspeitas.",
    sections: [
      {
        kind: "intro",
        heading: "O que é Code Signing no iOS",
        body: "Todo app no iOS é assinado criptograficamente pela Apple ou pelo desenvolvedor.\n\nFree Fire oficial: assinado pela Garena Online Private Limited\n\nIPAs modificados são recompilados pelo cheater:\n• Perdem a assinatura original da Garena\n• São re-assinados com:\n  - Certificado de desenvolvedor pessoal (conta $99/ano)\n  - Certificado Enterprise pirateado\n  - Assinatura de debug (inválida para distribuição)\n  - TrollStore (bypassa verificação completamente)\n\nVerificar a assinatura = determinar se o IPA é o original ou foi manipulado.",
      },
      {
        kind: "modulo",
        heading: "📚 Verificar via VPN e Gerenciamento de Dispositivo",
        body: "Ajustes → Geral → VPN e Gerenciamento de Dispositivo:\n\nApps da App Store não aparecem aqui.\n\nSe o Free Fire aparecer nessa lista:\n• Tem um certificado de desenvolvedor ou Enterprise associado\n• Foi instalado via sideload, não pela App Store\n• O certificado mostrará o nome do assinante\n\nVerifica:\n• Nome da empresa no certificado: deve ser 'Garena Online' ou similar\n• Qualquer outro nome = IPA modificado por terceiro\n• Certificado expirado = instalado fora do prazo normal",
      },
      {
        kind: "modulo",
        heading: "📚 Verificar via NewTerm (jailbreak)",
        body: "Com acesso ao NewTerm:\n\ncodesign -dv /var/containers/Bundle/Application/*/FreeFire.app/FreeFire 2>&1\n\nResultado legítimo:\n• TeamIdentifier=XXXXXXXXXX (time ID da Garena)\n• Authority=Apple Distribution: Garena Online Private Limited\n• Signed Time: data de lançamento da versão\n\nResultado suspeito:\n• Authority=iPhone Developer: Unknown Person\n• Authority=Apple Development: cheater@gmail.com\n• 'code object is not signed at all' = TrollStore sem re-assinatura",
      },
      {
        kind: "tecnica",
        heading: "🕵️ TrollStore e apps sem assinatura",
        body: "TrollStore instala IPAs usando uma vulnerabilidade do CoreTrust da Apple.\n\nApps instalados via TrollStore:\n• NÃO aparecem em Gerenciamento de Dispositivo (sem perfil)\n• Aparecem na tela inicial normalmente\n• Não passam pelo processo de verificação de assinatura normal\n\nComo detectar TrollStore:\n1. Procura o app 'TrollStore' na tela inicial (ícone de duende)\n2. Armazenamento → procura 'TrollStore' ou 'TrollHelper'\n3. Ajustes → Geral → Armazenamento → Free Fire → verifica tamanho vs oficial\n\nFree Fire via TrollStore: normalmente tem tamanho maior ou menor que o oficial por conta da modificação.",
        example: "Free Fire não aparecia em Gerenciamento de Dispositivo (sem perfil), mas tamanho era 1.45 GB vs 980 MB oficial. TrollStore confirmado pelo tamanho + tweak bundle diferente.",
      },
      {
        kind: "veredito",
        heading: "Veredito — Code Signing",
        body: "LIMPO: Free Fire não aparece em Gerenciamento de Dispositivo + tamanho oficial\nSUSPEITO: Certificado Enterprise presente + Free Fire associado\nBAN: Free Fire com assinatura de desenvolvedor desconhecido + tamanho diferente + TrollStore instalado",
      },
    ],
    checklist: [
      "Verificar VPN e Gerenciamento de Dispositivo por certificados do Free Fire",
      "Checar nome do assinante se houver certificado Enterprise",
      "Comparar tamanho do Free Fire vs versão oficial da App Store",
      "Procurar TrollStore ou TrollHelper no dispositivo",
      "Se jailbreak: usar codesign -dv via NewTerm",
    ],
  },

  // ─── jestam-ios ──────────────────────────────────────────────────────────────
  {
    id: "ios-jestam",
    title: "iOS — Jestam: Análise de Memória iOS",
    platform: "ios",
    categoryId: "ferramentas",
    order: 19,
    intro:
      "Jestam é uma ferramenta de análise de memória e processos para iOS jailbroken. Aprenda o que sua presença indica e como usá-la para encontrar evidências de cheat.",
    sections: [
      {
        kind: "intro",
        heading: "O que é Jestam",
        body: "Jestam = ferramenta de diagnóstico iOS disponível via Cydia/Sileo em dispositivos com jailbreak.\n\nFuncionalidades:\n• Listar processos rodando com detalhes\n• Inspecionar memória de processos\n• Listar bibliotecas (.dylib) carregadas por cada processo\n• Verificar hooks ativos em processos\n\nPresença do Jestam = confirma jailbreak (não existe na App Store).\n\nSe o Jestam está instalado e o Free Fire está sendo analisado nele = cheat ativo confirmado.",
      },
      {
        kind: "modulo",
        heading: "📚 O que verificar no Jestam durante a SS",
        body: "1. Pede pra abrir o Jestam (se existir no device)\n2. Seleciona o processo do Free Fire na lista\n3. Verifica 'Libraries' ou 'Images' do processo:\n   • Deve ter apenas bibliotecas da Garena e do iOS\n   • .dylib extras = tweak injetado no Free Fire\n   • Nomes comuns: CheatFF.dylib, hook.dylib, speedhack.dylib\n4. Verifica 'Hooks' se disponível:\n   • Hooks em funções de movimento = aimbot\n   • Hooks em funções de render = wallhack",
      },
      {
        kind: "tecnica",
        heading: "🕵️ Alternativa: verificar dylibs via procstat",
        body: "Sem o Jestam, no NewTerm:\n\n• Encontra o PID do Free Fire: pidof FreeFire ou pgrep FreeFire\n• Lista .dylibs carregadas: procstat -v [PID] | grep '\.dylib'\n\nAlternativa com lldb (debug):\n• image list no debugger mostra todas as libs carregadas\n\nQualquer .dylib que não pertence ao bundle original do Free Fire = cheat injetado.",
      },
      {
        kind: "veredito",
        heading: "Veredito — Jestam",
        body: "EVIDÊNCIA: Jestam instalado = jailbreak confirmado\nBAN DIRETO: .dylib suspeita carregada no processo do Free Fire via Jestam\nALTERNATIVA: usar NewTerm + procstat se Jestam não estiver disponível",
      },
    ],
    checklist: [
      "Verificar Jestam no Cydia/Sileo (confirma jailbreak se encontrado)",
      "Abrir Jestam e selecionar processo do Free Fire",
      "Verificar lista de bibliotecas (.dylib) carregadas pelo Free Fire",
      "Procurar nomes de .dylib suspeitos (cheat, hook, speed, etc.)",
      "Se sem Jestam: usar procstat via NewTerm",
    ],
  },

  // ─── relatorio-privacidade ────────────────────────────────────────────────────
  {
    id: "ios-relatorio-privacidade",
    title: "iOS — Relatório de Privacidade de App",
    platform: "ios",
    categoryId: "analise",
    order: 20,
    intro:
      "O Relatório de Privacidade de App do iOS (iOS 15.2+) registra quais apps acessaram câmera, microfone, localização e contatos — e quando. Ótimo para cruzar com horário de partidas.",
    sections: [
      {
        kind: "intro",
        heading: "O que é o Relatório de Privacidade de App",
        body: "Recurso nativo do iOS 15.2+ que:\n• Registra acessos a recursos sensíveis (câmera, mic, localização, etc.)\n• Mostra domínios de rede contatados por cada app\n• Registra data e hora de cada acesso\n\nVantagem para SS:\n• Não pode ser manipulado por apps (é registro do sistema)\n• Mostra contatos de rede do Free Fire: IPs e domínios\n• Pode mostrar se algum tweak/daemon acessou recursos suspeitos",
      },
      {
        kind: "modulo",
        heading: "📚 Como acessar e usar",
        body: "Caminho: Ajustes → Privacidade e Segurança → Relatório de Privacidade de App\n\n1. Ativa se ainda não estiver ativo\n2. Aguarda algumas horas de acúmulo de dados\n3. Na SS, abre o relatório e vai em 'Atividade de Rede de App'\n4. Seleciona 'Free Fire' na lista\n5. Verifica domínios contactados pelo Free Fire:\n   • Domínios legítimos: garena.com, garena.global, tencent.com\n   • Domínio suspeito: qualquer IP local ou domínio de passador\n\n6. Verifica também 'Atividade de Dados de App'\n   • Free Fire acessando contatos ou câmera fora de jogo = suspeito",
      },
      {
        kind: "tecnica",
        heading: "🕵️ Cruzar domínios com horário da partida",
        body: "O relatório mostra horário de acesso a cada domínio.\n\nSe você sabe o horário exato da partida suspeita:\n1. Abre o relatório e filtra pelo horário\n2. Verifica quais domínios o Free Fire contactou naquele horário\n3. Domínio de passador (ex: deepscreenshare.net ou IP local) = passador ativo confirmado\n4. Domínio de terceiro desconhecido = possível cheat com C&C server\n\nAlém disso:\n• Outros apps contatando domínios suspeitos no mesmo horário\n• TeamViewer contatando seus servidores durante o ranked = controle remoto confirmado",
        example: "Relatório mostrou que no horário da partida, o app 'System Service' (renomeado TeamViewer) contatou 'relay.teamviewer.com' 47 vezes. Controle remoto via TeamViewer confirmado pelo relatório do sistema.",
      },
      {
        kind: "veredito",
        heading: "Veredito — Relatório de Privacidade",
        body: "FERRAMENTA: evidência de alta credibilidade (registro do sistema iOS)\nCRUZAR COM: horário da partida suspeita\nBAN: domínio de passador no relatório + horário da partida + outros indicadores",
      },
    ],
    checklist: [
      "Habilitar Relatório de Privacidade antes da SS (precisa de acúmulo)",
      "Verificar domínios contactados pelo Free Fire na hora da partida",
      "Identificar IPs ou domínios de passador/cheat na lista",
      "Checar se outros apps (TeamViewer, etc.) tiveram atividade no mesmo horário",
      "Exportar relatório como evidência se possível",
    ],
  },

  // ─── logs-safari ─────────────────────────────────────────────────────────────
  {
    id: "ios-logs-safari",
    title: "iOS — Logs do Safari e Diagnóstico iOS",
    platform: "ios",
    categoryId: "analise",
    order: 21,
    intro:
      "Logs do Safari e o sistema de diagnóstico nativo do iOS revelam histórico de navegação, downloads e arquivos acessados — útil para detectar downloads de cheat e passador web.",
    sections: [
      {
        kind: "intro",
        heading: "Por que verificar o Safari",
        body: "O cheater usa o Safari para:\n• Baixar IPAs modificados (via link direto)\n• Acessar o passador web Deep Screen Share ou similares\n• Baixar scripts de automação\n• Instalar perfis de configuração via link\n\nAo verificar o Safari você encontra:\n• Histórico de navegação\n• Downloads na pasta Downloads\n• Cookies e dados de sites de cheat",
      },
      {
        kind: "modulo",
        heading: "📚 Verificar histórico do Safari",
        body: "1. Abre o Safari\n2. Toca no ícone do livro (Histórico)\n3. Seleciona 'Histórico'\n4. Percorre o histórico completo — não deixa pular\n\nO que procurar:\n• Sites de cheat: iphonewired, tweakbox, altstore, esign\n• Passador web: qualquer URL com proxy, deepscreenshare, passador\n• Download de IPAs: links terminando em .ipa\n• Sites de repositórios de tweak: repo.hackyouriphone.org, build.frida.re\n\n5. Verifica também Safari → Favoritos → Downloads (arquivos baixados)",
      },
      {
        kind: "modulo",
        heading: "📚 Diagnóstico iOS — Logs Avançados",
        body: "Ajustes → Privacidade e Segurança → Análises e Melhorias → Dados de Análise:\n\n• Lista de logs do sistema com data/hora\n• Crash reports de apps (ex: FreeFire_2024-10-15.ips)\n• Logs de processo com detalhes técnicos\n\nO que procurar:\n• Crash reports de apps suspeitos (Brevet crashou = estava rodando)\n• Logs com nomes de tweaks\n• Logs de processos não reconhecidos\n\nCaminho: tap em qualquer log → share → 'Copiar pra área de transferência' → colar no Notes e analisar",
      },
      {
        kind: "tecnica",
        heading: "🕵️ Histórico limpo como evidência",
        body: "Se o histórico do Safari está completamente limpo:\n• Pode ser limpeza normal → verifique se tem configuração 'Limpar Histórico' no Safari\n• Cheater limpa antes da SS → data de limpeza fica registrada nos logs de diagnóstico\n\nAjustes → Safari → Limpar Histórico e Dados de Sites:\n• Verifica data da última limpeza (aparece se foi feita recentemente)\n\nHistórico do Safari limpo + última limpeza = data próxima à partida = evidência de ocultação.",
        example: "Histórico do Safari estava vazio. Safari → Configurações mostrava 'Histórico e dados limpos hoje, 14:32'. A partida suspeita foi às 15:00. Limpeza intencional confirmada.",
      },
      {
        kind: "veredito",
        heading: "Veredito — Logs e Safari",
        body: "VERIFICAR: histórico do Safari + pasta Downloads + dados de análise\nSUSPEITO: histórico limpo recentemente + pasta Downloads vazia + partida suspeita\nBAN: download de IPA ou visita a site de cheat confirmado no horário próximo à partida",
      },
    ],
    checklist: [
      "Verificar histórico do Safari completo (não deixar pular)",
      "Checar pasta Downloads do Safari",
      "Verificar data de última limpeza de histórico",
      "Analisar Dados de Análise por crash reports de apps suspeitos",
      "Cruzar datas de downloads com horário das partidas",
    ],
  },

  // ─── oq-e-frida ──────────────────────────────────────────────────────────────
  {
    id: "ios-frida",
    title: "iOS — O que é Frida: Instrumentação Dinâmica",
    platform: "ios",
    categoryId: "avancado",
    order: 22,
    intro:
      "Frida é um framework de instrumentação dinâmica usado para hooking de funções em tempo real. É ferramenta de pesquisador de segurança, mas também usada para criar cheats e bypasses.",
    sections: [
      {
        kind: "intro",
        heading: "O que é Frida",
        body: "Frida = Dynamic Instrumentation Toolkit.\n\nO que faz:\n• Injeta JavaScript em qualquer processo em runtime\n• Intercepta chamadas de função em tempo real\n• Modifica comportamento de apps sem recompilar\n• Lê e escreve memória de qualquer processo\n\nUsos legítimos: pesquisa de segurança, debugging, análise de malware.\n\nUsos de cheat:\n• Bypassar verificações anti-cheat do Free Fire\n• Modificar valores de memória em tempo real\n• Interceptar comunicação com servidor\n• Injetar código de aimbot/wallhack via scripts JavaScript\n\nRequer jailbreak no iOS para funcionar em apps de terceiros.",
      },
      {
        kind: "modulo",
        heading: "📚 Detectar Frida no dispositivo",
        body: "Sinais de Frida instalado:\n\n1. Cydia/Sileo: procura o pacote 'Frida' ou 'frida-server'\n2. Caminho: /usr/sbin/frida-server — se existir = Frida instalado\n3. Porta 27042 aberta: frida-server escuta nessa porta por padrão\n   (via NewTerm: netstat -an | grep 27042)\n4. Processo 'frida-server' rodando: ps aux | grep frida\n5. /usr/lib/frida/ — pasta do Frida\n6. /tmp/frida-* — arquivos temporários do Frida\n\nAlém disso: scripts .js de cheat para Frida ficam geralmente em ~/Documents/ ou /tmp/",
      },
      {
        kind: "modulo",
        heading: "📚 Frida scripts de cheat — o que parecem",
        body: "Scripts Frida para cheat no Free Fire geralmente são .js:\n\nExemplo (educacional — não funcional):\n• Interceptam funções de colisão para wallhack\n• Modificam valores de velocidade para speed hack\n• Bypassam verificações do servidor\n\nLocalização dos scripts:\n• /var/mobile/Documents/*.js\n• /tmp/ff_hack.js\n• /var/mobile/Media/Scripts/\n\nVerifica via Filza ou NewTerm:\nfind /var/mobile -name '*.js' -newer /tmp/timestamp 2>/dev/null",
      },
      {
        kind: "tecnica",
        heading: "🕵️ Build.frida.re no histórico do Safari",
        body: "O repositório oficial do Frida para Cydia/Sileo é 'build.frida.re'.\n\nSe esse domínio aparece:\n• No histórico do Safari = visitou o repo\n• No Relatório de Privacidade = app contatou o servidor\n• Em Cydia/Sileo na lista de repos = repo adicionado = Frida instalado\n\nAdicionalmente: repo 'https://repo.hackyouriphone.org' contém muitos cheats iOS.\nPresença desse repo em Cydia/Sileo = intenção clara de instalar cheats.",
        example: "Sileo tinha o repo 'build.frida.re' e 'https://repo.hackyouriphone.org' adicionados. Frida instalado + repo de cheats = stack completo de cheat iOS via Frida scripts.",
      },
      {
        kind: "veredito",
        heading: "Veredito — Frida",
        body: "LIMPO: sem frida-server + sem repos de cheat no Sileo/Cydia\nSUSPEITO: repo build.frida.re adicionado + jailbreak confirmado\nBAN: frida-server rodando + scripts .js de cheat encontrados + porta 27042 ativa no horário da partida",
      },
    ],
    checklist: [
      "Verificar Frida no Cydia/Sileo (pacote frida ou frida-server)",
      "Checar /usr/sbin/frida-server via Filza ou NewTerm",
      "Verificar porta 27042 ativa (netstat | grep 27042)",
      "Procurar scripts .js suspeitos em /var/mobile/Documents/",
      "Checar repos adicionados no Cydia/Sileo por build.frida.re",
    ],
  },

  // ─── detect-jailbreak-adv ────────────────────────────────────────────────────
  {
    id: "ios-detect-jailbreak-adv",
    title: "iOS — Detectar Jailbreak: Métodos Avançados",
    platform: "ios",
    categoryId: "avancado",
    order: 23,
    intro:
      "Métodos avançados para detectar jailbreak mesmo quando o cheater usa Liberty Lite, A-Bypass, Shadow ou outras ferramentas de evasão de detecção de jailbreak.",
    sections: [
      {
        kind: "intro",
        heading: "Por que a detecção básica falha",
        body: "Cheaters avançados usam tweaks específicos para ESCONDER o jailbreak:\n• Liberty Lite — bypassa checagens de jailbreak em apps\n• A-Bypass / tsProtector — esconde paths de jailbreak\n• Shadow — spoofa o ambiente para parecer dispositivo limpo\n• HideJB — esconde paths, processos e arquivos de jailbreak\n\nCom esses tweaks ativos:\n• Am I Secure diz 'Not Jailbroken'\n• Free Fire não detecta jailbreak\n• Paths como /usr/bin/ssh não aparecem em ls\n\nMas os próprios tweaks de bypass são evidência de jailbreak.",
      },
      {
        kind: "modulo",
        heading: "📚 Detectar tweaks de bypass de jailbreak",
        body: "1. Cydia/Sileo → procura:\n   • Liberty Lite, A-Bypass, tsProtector, Shadow, HideJB\n2. Ajustes → procura seções de configuração:\n   • 'Liberty' ou 'A-Bypass Settings' nos Ajustes\n3. Via Filza:\n   • /var/jb/Library/Application Support/LibertyLite/\n   • /Library/Preferences/net.limneos.abypass.plist\n\nPresença de qualquer tweak de bypass = jailbreak CONFIRMADO.\nO ato de esconder é a prova do jailbreak.",
      },
      {
        kind: "modulo",
        heading: "📚 Caminhos de jailbreak que persistem",
        body: "Mesmo com tweaks de bypass, alguns caminhos são difíceis de esconder completamente:\n\nVia NewTerm ou Filza:\n• /etc/apt — gerenciador de pacotes (apt = Cydia)\n• /var/jb/ — novo local de rootless jailbreak (Dopamine/Palera1n)\n• /private/preboot/procursus/ — palera1n\n• /.bootstrapped_dopamine — arquivo deixado pelo Dopamine\n• /var/lib/dpkg/info/ — banco de dados de pacotes instalados\n\nApenas 1 desses caminhos existir = jailbreak confirmado.",
      },
      {
        kind: "tecnica",
        heading: "🕵️ Detectar via comportamento",
        body: "Testes comportamentais que identificam jailbreak mesmo com bypass:\n\n1. Teste de sandbox: app sem permissão tenta escrever em /tmp/\n   → Com jailbreak: sucesso (sandbox quebrado)\n   → Sem jailbreak: erro de permissão\n\n2. Fork bomb test (seguro): tenta criar processos filhos\n   → Jailbreak dá mais liberdade de processo\n\n3. Detectar substrate: procura /usr/lib/libsubstrate.dylib ou /usr/lib/libellekit.dylib\n\n4. Verificar sshd rodando: nc localhost 22 → se conecta = SSH ativo = jailbreak\n\n5. App de clipboard: dispositivo jailbroken pode ler clipboard de outros apps (iOS < 14)",
        example: "Player passou em Am I Secure, Liberty Lite ativo. Mas Filza mostrava /var/jb/ com 847 MB de conteúdo. /var/jb/ só existe em jailbreaks rootless (Dopamine, palera1n 2.0+).",
      },
      {
        kind: "veredito",
        heading: "Veredito — Detecção Avançada de Jailbreak",
        body: "MÉTODO: verificar tweaks de bypass + caminhos persistentes + testes comportamentais\nPECULIARIDADE: tweaks de bypass são MAIS evidentes que o jailbreak em si\nBAN: qualquer caminho rootless (/var/jb/) + tweak de bypass confirmado",
      },
    ],
    checklist: [
      "Verificar Liberty Lite, A-Bypass, Shadow, HideJB no Cydia/Sileo",
      "Procurar seções de bypass nos Ajustes",
      "Verificar /var/jb/ e /private/preboot/procursus/ via Filza",
      "Testar porta 22 via nc localhost 22",
      "Verificar /usr/lib/libsubstrate.dylib ou /usr/lib/libellekit.dylib",
    ],
  },
];
