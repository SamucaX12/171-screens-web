import type { MobileLesson } from "./types";

export const androidLessons: MobileLesson[] = [
  // ─── 01 · INTRODUÇÃO ─────────────────────────────────────────────────────────
  {
    id: "android-bypass-intro",
    title: "Android — O que é Bypass e como detectar",
    platform: "android",
    categoryId: "introducao",
    order: 101,
    intro:
      "Visão geral do ecossistema de bypass Android: root, Magisk, APK modificado, memória e emulador. Aprenda o que procurar antes de iniciar qualquer SS mobile Android.",
    coverImage: "/guide/mobile/android-intro.svg",
    sections: [
      {
        kind: "intro",
        heading: "O que é bypass no Android",
        body: "Bypass no Android é qualquer técnica usada para driblar a detecção anti-cheat do Free Fire.\n\nPrincipais categorias:\n• Root — acesso de superusuário ao sistema (Magisk, KernelSU, SuperSU)\n• APK modificado — Free Fire recompilado com cheat embutido\n• Injeção de memória — GameGuardian, Cheat Engine Android\n• Módulos Magisk — cheats que funcionam como módulo do sistema\n• Emulador — BlueStacks, LDPlayer, MuMu com bypass de detecção\n• Proxy/VPN — interceptação de tráfego (igual ao iOS)\n\nNo Android o bypass é MAIS FÁCIL que no iOS: sideload nativo, root mais acessível, APK mais fácil de modificar.",
        image: "/guide/mobile/android-intro.svg",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 1 — Visão geral do fluxo de SS Android",
        body: "1. Verificar se o dispositivo tem root (Magisk, KernelSU, indicadores)\n2. Verificar apps instalados (GameGuardian, Cheat Engine, MT Manager)\n3. Verificar o APK do Free Fire (assinatura, tamanho, origem)\n4. Verificar módulos Magisk ativos\n5. Verificar configuração de rede (proxy, VPN)\n6. Verificar se é emulador disfarçado\n7. Cruzar evidências e emitir veredito",
        image: "/guide/mobile/android-flow.svg",
      },
      {
        kind: "tecnica",
        heading: "🕵️ Por que Android é diferente do iOS",
        body: "Android tem:\n• Sideload nativo (instalar APK de qualquer fonte)\n• Root mais acessível (Magisk com GUI)\n• Gerenciador de arquivos nativo com acesso completo\n• Múltiplos perfis de usuário (segundo espaço)\n\nIsso significa:\n• Mais facilidade de instalar cheat\n• Mais formas de esconder (DenyList, hide root)\n• Mais lugares pra verificar na SS\n• Mais rastros disponíveis pra você achar",
        example: "No iOS o cheater precisa de jailbreak. No Android qualquer pessoa com APK mod e uns tutoriais do YouTube já tem cheat funcionando. O volume de casos Android é bem maior.",
      },
      {
        kind: "veredito",
        heading: "Mentalidade da SS Android",
        body: "LIMPO = Sem root + APK oficial da Play Store + sem apps de cheat + proxy padrão\nSUSPEITO = Root ativo + DenyList ativado (tentativa de esconder) + app apagado recentemente\nBAN = GameGuardian rodando + APK modificado confirmado + módulo Magisk de cheat + evidências cruzadas",
      },
    ],
    checklist: [
      "Entendi as categorias de bypass Android",
      "Sei a diferença entre root, APK mod e injeção de memória",
      "Conheço os apps de cheat Android mais comuns",
      "Sei que o DenyList pode esconder root",
    ],
  },

  // ─── 02 · MAGISK & ROOT ──────────────────────────────────────────────────────
  {
    id: "android-magisk",
    title: "Android — Detectar Magisk, Zygisk e Root",
    platform: "android",
    categoryId: "sistema",
    order: 102,
    intro:
      "Magisk é a ferramenta de root Android mais popular. Aprenda a detectar Magisk, Zygisk, DenyList e sinais de root mesmo quando o player tenta esconder.",
    coverImage: "/guide/mobile/android-magisk.svg",
    sections: [
      {
        kind: "intro",
        heading: "O que é Magisk e por que importa",
        body: "Magisk = ferramenta de root Android que funciona como módulo do sistema.\n\nVantagens do Magisk pra cheater:\n• Root sem alterar a partição system (systemless root)\n• DenyList: esconde root de apps específicos (incluindo o Free Fire)\n• Módulos: instala cheats como módulo do sistema\n• Zygisk: injeção de código em todos os processos no boot\n\nMagisk Manager = app de controle do Magisk (ícone de escudo).\nPode ser renomeado pra qualquer coisa — cheater troca o nome e ícone.",
        image: "/guide/mobile/android-magisk.svg",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 1 — Procurar Magisk Manager",
        body: "1. Gaveta de apps — procura ícone de escudo preto/branco (Magisk)\n2. Configurações → Apps → todos os apps — procura 'Magisk'\n3. Configurações → Apps → Acesso especial → Administradores do dispositivo\n4. Configurações → Privacidade → permissões especiais de apps\n\nMagisk renomeado:\n• Cheater pode renomear pra 'System Service', 'Google Service' etc.\n• Mesmo renomeado, aparece em Configurações → Apps com ícone incomum\n• Pede pra abrir todos os apps em ordem de instalação (mais recentes primeiro)",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 2 — Verificar módulos Magisk",
        body: "Se você achar o Magisk Manager aberto:\n\n1. Vai na aba 'Módulos'\n2. Procura por módulos ativos relacionados a cheat:\n   • FreeFire Module, FF Speed, AimBot, WallHack\n   • Qualquer módulo com nome genérico instalado na data da partida\n3. Verifica a aba 'Superusuário' — lista de apps com acesso root\n   • Free Fire com acesso root = CHEAT CONFIRMADO\n   • GameGuardian na lista = uso confirmado\n\nMesmo que tenha Deny List ativo, a aba de Superusuário mostra histórico.",
        image: "/guide/mobile/android-modules.svg",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 3 — Sinais de root sem Magisk visível",
        body: "Root pode existir sem Magisk Manager visível:\n\n1. Configurações → Sobre o telefone → Build number → toca 7x → Opções do desenvolvedor ativadas automaticamente = indicador (Modo Dev + root é combinação comum)\n2. Configurações → Opções do desenvolvedor → USB debugging ON = comum em dispositivos root\n3. App de terminal (Termux) com acesso su:\n   • Abre Termux → digita 'su' → se aceita = root ativo\n4. Verifica se há app 'SuperSU', 'SuperUser', 'KingRoot' na gaveta",
      },
      {
        kind: "tecnica",
        heading: "🕵️ DenyList e como contornar",
        body: "DenyList = função do Magisk que esconde root de apps específicos.\n\nCheater adiciona o Free Fire no DenyList para que o jogo não detecte root.\n\nComo contornar na SS:\n• Pede pra abrir o Magisk Manager diretamente\n• Vai em Configurações → Magisk → DenyList — mostra se Free Fire está na lista\n• Free Fire no DenyList = tentativa de esconder root durante o jogo\n• Zygisk ativo no Magisk → Configurações = injeção em processo mais agressiva\n\nNota: mesmo com DenyList, o histórico de Superusuário persiste.",
        example: "Player ativou DenyList pro Free Fire, então o game não detectava root. Mas o Superusuário mostrava GameGuardian com acesso na data da partida. DenyList não apaga histórico.",
      },
      {
        kind: "veredito",
        heading: "Veredito — Root e Magisk Android",
        body: "LIMPO = Sem Magisk + sem root indicators + modo desenvolvedor desativado\nSUSPEITO = Opções de desenvolvedor ativas + USB debug + SuperSU antigo\nBAN = Magisk encontrado + Free Fire no DenyList + GameGuardian no histórico de Superusuário",
      },
    ],
    checklist: [
      "Buscar Magisk Manager na gaveta de apps e Configurações → Apps",
      "Verificar módulos Magisk ativos",
      "Conferir histórico de Superusuário por apps com acesso root",
      "Verificar se Free Fire está no DenyList",
      "Checar Opções do desenvolvedor e USB debugging",
      "Verificar apps SuperSU/SuperUser/KingRoot",
    ],
  },

  // ─── 03 · KERNELSU ───────────────────────────────────────────────────────────
  {
    id: "android-kernelsu",
    title: "Android — KernelSU & Root Oculto",
    platform: "android",
    categoryId: "sistema",
    order: 103,
    intro:
      "KernelSU é uma alternativa ao Magisk que opera no nível do kernel — mais difícil de detectar. Aprenda os indicadores específicos do KernelSU e APatch.",
    coverImage: "/guide/mobile/android-kernelsu.svg",
    sections: [
      {
        kind: "intro",
        heading: "KernelSU vs Magisk",
        body: "KernelSU opera no nível do kernel do Linux — mais baixo que o Magisk.\n\nVantagens pra cheater:\n• Mais difícil de detectar (não modifica ramdisk)\n• Root mais profundo e furtivo\n• Bypassa detecções básicas de root\n• Suporte a módulos como o Magisk\n\nDesvantagem:\n• Requer kernel personalizado ou GKI compatível\n• Nem todo dispositivo suporta\n• Mais complexo de configurar\n\nAPatch = alternativa mais nova, similar ao KernelSU.",
        image: "/guide/mobile/android-kernelsu.svg",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 1 — Procurar KernelSU Manager",
        body: "1. Gaveta de apps: procura 'KernelSU' (ícone Linux Tux ou escudo)\n2. Configurações → Apps → todos: busca 'KernelSU'\n3. Configurações → Apps: procura 'APatch'\n4. Spotlight Android (busca na gaveta): digita 'kernelsu', 'apatch', 'ksud'\n\nKernelSU renomeado:\n• Pode aparecer como 'System Kernel', 'Kernel Service'\n• Procura apps com ícone de linux/kernel suspeito\n• Data de instalação recente + nome genérico = flag",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 2 — Verificar no terminal",
        body: "Com Termux (app de terminal) no dispositivo:\n\n1. Abre Termux\n2. Digita: su — se aceitar e mostrar '#' = root ativo\n3. Digita: which ksud — se retornar caminho = KernelSU ativo\n4. Digita: uname -r — verifica versão do kernel (kernels GKI customizados têm suffixos suspeitos)\n\nSe o player negar acesso ao Termux = comportamento evasivo.",
      },
      {
        kind: "tecnica",
        heading: "🕵️ Indicadores de kernel customizado",
        body: "Verificar build do kernel:\n\n1. Configurações → Sobre o telefone → Informações de software\n2. Versão do kernel: deve ser stock do fabricante\n3. Kernels customizados costumam ter:\n   • Suffixo: -gki, -ksu, -apatch\n   • Build date diferente do firmware oficial\n   • Texto 'GKI' ou 'KernelSU' na versão\n\nEx. kernel stock: 5.10.209-android13-4\nKernel KSU: 5.10.209-android13-4-ksu-v0.9.5\n\nDiferença = kernel personalizado.",
        example: "Configurações → Sobre → Versão do kernel mostrou: 5.15.78-android13-8-ksu. O '-ksu' no final confirmou KernelSU. Player havia negado ter root.",
      },
      {
        kind: "veredito",
        heading: "Veredito — KernelSU e Root Oculto",
        body: "LIMPO = Kernel stock do fabricante + sem KernelSU/APatch na lista de apps\nSUSPEITO = Kernel com suffix suspeito + Termux instalado + Opções de Desenvolvedor ativas\nBAN = KernelSU confirmado na versão do kernel + histórico de módulos ou acesso root",
      },
    ],
    checklist: [
      "Buscar KernelSU Manager e APatch na gaveta e Configurações",
      "Verificar versão do kernel em Sobre o telefone",
      "Checar suffixos -ksu, -apatch, -gki na versão do kernel",
      "Testar com Termux se disponível: su e which ksud",
      "Comparar versão do kernel com especificação oficial do fabricante",
    ],
  },

  // ─── 04 · GAMEGUARDIAN ───────────────────────────────────────────────────────
  {
    id: "android-gameguardian",
    title: "Android — GameGuardian & Injeção de Memória",
    platform: "android",
    categoryId: "ferramentas",
    order: 104,
    intro:
      "GameGuardian é o cheat engine Android mais usado para modificar valores na memória do Free Fire. Aprenda a detectar rastros do GG mesmo após a remoção.",
    coverImage: "/guide/mobile/android-gg.svg",
    sections: [
      {
        kind: "intro",
        heading: "O que é GameGuardian",
        body: "GameGuardian (GG) = cheat engine Android que modifica valores em memória em tempo real.\n\nUsos no Free Fire:\n• Speed hack (movimento acelerado)\n• Wallhack (ver através de paredes)\n• Aimbot (mira automática via memória)\n• Modificação de cooldown de habilidades\n• God mode (invencibilidade)\n\nPara funcionar: PRECISA de root ou virtual machine (sem root via VirtualXposed).\n\nO GG roda em paralelo ao jogo como app sobreposto.",
        image: "/guide/mobile/android-gg.svg",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 1 — Detectar GameGuardian instalado",
        body: "1. Gaveta de apps: ícone do GG (escudo branco/vermelho) ou nome 'GameGuardian'\n2. Configurações → Apps → todos os apps → busca 'GameGuardian' ou 'GG'\n3. Configurações → Apps → Permissões especiais → Exibir sobre outros apps\n   → Se GameGuardian tiver permissão = estava rodando como overlay\n4. Pastas de arquivos: Gerenciador de Arquivos → procura pasta 'GameGuardian' em /sdcard/GameGuardian/\n5. Configurações → Armazenamento → apps → ordena por tamanho — GG ocupa pouco mas deixa dados",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 2 — Rastros do GG após remoção",
        body: "Mesmo deletado, o GameGuardian deixa rastros:\n\n1. Pasta /sdcard/GameGuardian/ — contém scripts e logs de busca de memória\n   • Arquivos .gg (scripts de cheat salvos)\n   • dump.txt (dump de memória salvo)\n2. Gerenciador de Arquivos → Android/data/ → procura pasta com.thefool.gameguardian\n3. Configurações → Apps → mostrar apps desinstalados (em alguns fabricantes)\n4. Histórico de acesso root no Magisk Superusuário\n   → Mesmo que GG esteja apagado, aparece na lista histórica",
        image: "/guide/mobile/android-gg-files.svg",
      },
      {
        kind: "tecnica",
        heading: "🕵️ VirtualXposed — GG sem root",
        body: "VirtualXposed = ambiente virtual Android que permite rodar o GG SEM root.\n\nIndicadores de VirtualXposed:\n• App 'VirtualXposed' instalado (ícone roxo/laranja)\n• App 'VXP' ou 'Virtual X' renomeado\n• Configurações → Apps → procura 'VirtualXposed'\n• Dentro do VXP: Free Fire + GameGuardian rodam no ambiente virtual\n\nVirtualXposed sem root significa:\n• Mais fácil de usar\n• Mais comum entre cheaters iniciantes\n• Detecção via presença do app\n\nParallel Space e Dual Space também permitem esse ambiente.",
        example: "Player removeu GameGuardian mas esqueceu de apagar /sdcard/GameGuardian/scripts/gg_speedhack.gg. Arquivo com data de ontem, horário exato da partida suspeita.",
      },
      {
        kind: "veredito",
        heading: "Veredito — GameGuardian Android",
        body: "LIMPO = GG não encontrado em nenhum lugar + sem pasta /sdcard/GameGuardian + sem VirtualXposed\nSUSPEITO = Pasta GG encontrada mas apagada + acesso root histórico suspeito\nBAN = GG encontrado + pasta com scripts + data de uso = horário da partida + acesso root confirmado",
      },
    ],
    checklist: [
      "Verificar GameGuardian na gaveta e Configurações → Apps",
      "Checar permissão 'Exibir sobre outros apps' para GG",
      "Inspecionar /sdcard/GameGuardian/ por scripts e logs",
      "Verificar pasta Android/data/com.thefool.gameguardian",
      "Procurar VirtualXposed, Parallel Space, Dual Space",
      "Conferir histórico de Superusuário no Magisk por GG",
    ],
  },

  // ─── 05 · APK MODIFICADO ─────────────────────────────────────────────────────
  {
    id: "android-apk-mod",
    title: "Android — APK Modificado: Assinatura e Dex",
    platform: "android",
    categoryId: "ferramentas",
    order: 105,
    intro:
      "APK modificado é uma versão do Free Fire com cheat embutido no código. Aprenda a identificar APK não-oficial pela assinatura, tamanho e nome do pacote.",
    coverImage: "/guide/mobile/android-apk.svg",
    sections: [
      {
        kind: "intro",
        heading: "O que é APK modificado",
        body: "APK = formato de pacote de app Android.\n\nAPK modificado = Free Fire recompilado com cheat no código:\n• Classes.dex com código de cheat injetado\n• Lib .so com cheats em C/C++ embutidos\n• Assinatura diferente da versão oficial (porque recompilou)\n\nSideLOAD (instalação fora da Play Store) é necessário para APK mod — a Play Store não aceita versões com assinatura diferente.",
        image: "/guide/mobile/android-apk.svg",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 1 — Verificar versão do Free Fire",
        body: "1. Abre a Play Store\n2. Busca 'Free Fire' — verifica a versão atual disponível\n3. Vai em Configurações → Apps → Free Fire\n4. Toca em 'Armazenamento e Cache'\n5. Verifica: Nome do pacote = deve ser com.dts.freefireth\n\nVersão diferente da Play Store = APK modificado ou desatualizado\nNome do pacote diferente = APK de fontes não-oficiais\n\nEx. pacote suspeito: com.garena.freefire.mod ou com.dts.freefire.v2",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 2 — Verificar tamanho do APK instalado",
        body: "1. Configurações → Apps → Free Fire → Armazenamento\n2. Anota: Tamanho do app + Cache + Dados\n\nFree Fire oficial: aproximadamente 800MB-1.2GB (APK) + dados OBB separados\nAPK modificado: pode ser maior (cheat libs adicionadas) ou menor (OBB integrado)\n\nComparar:\n• Play Store → Free Fire → mostra tamanho do download\n• Se diferir muito (>200MB) = suspeito\n\n3. Gerenciador de Arquivos → Android/obb/com.dts.freefireth/\n   Data de modificação dos arquivos OBB = recente na data da partida = suspeito",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 3 — Verificar fontes desconhecidas",
        body: "Configurações → Segurança (ou Privacidade) → Instalar apps desconhecidos:\n\nVerifica quais apps têm permissão para instalar APKs:\n• Gerenciadores de arquivo com permissão = sideload ativo\n• Browsers com permissão = baixou APK pelo browser\n• Telegram/WhatsApp com permissão = baixou APK via mensagem\n\nQualquer combinação de:\n• Free Fire versão diferente + \n• App com permissão de instalar desconhecidos +\n• Gerenciador de arquivo recente\n= indicadores de sideload",
        image: "/guide/mobile/android-unknown.svg",
      },
      {
        kind: "tecnica",
        heading: "🕵️ MT Manager para verificar assinatura",
        body: "Se você tem MT Manager (ou ZArchiver) e pode acessar o APK:\n\n1. MT Manager → abre o APK do Free Fire\n2. Aba 'Info' → mostra assinatura do desenvolvedor\n   • Original: CN=Garena Online Pte. Ltd.\n   • Modificado: assinatura genérica, nome em chinês, ou vazia\n3. Compara hash MD5 do APK com versão oficial (disponível em APKMirror)\n\nAlternativamente, via Termux:\npm dump com.dts.freefireth | grep 'signatures'",
        example: "APK do Free Fire com assinatura: 'CN=Developer Debug Key' — essa é a assinatura padrão de teste do Android Studio. App foi recompilado em modo debug com cheat e redistribuído.",
      },
      {
        kind: "veredito",
        heading: "Veredito — APK Modificado Android",
        body: "LIMPO = Versão igual à Play Store + pacote com.dts.freefireth + sem permissão de instalar desconhecidos ativa\nSUSPEITO = Versão desatualizada + permissão de instalar desconhecidos ativa\nBAN = Versão diferente + pacote modificado + assinatura incorreta + sideload confirmado",
      },
    ],
    checklist: [
      "Comparar versão do Free Fire com a Play Store",
      "Verificar nome do pacote em Configurações → Apps → Free Fire",
      "Checar tamanho do app e comparar com Play Store",
      "Verificar permissões de 'Instalar apps desconhecidos'",
      "Inspecionar data de modificação dos arquivos OBB",
      "Verificar assinatura do APK se possível",
    ],
  },

  // ─── 06 · MT MANAGER & ZARCHIVER ─────────────────────────────────────────────
  {
    id: "android-mt-manager",
    title: "Android — MT Manager, ZArchiver e Ferramentas de Arquivo",
    platform: "android",
    categoryId: "ferramentas",
    order: 106,
    intro:
      "MT Manager e ZArchiver são usados para modificar APKs e OBBs do Free Fire. Aprenda a detectar o uso dessas ferramentas e os rastros que deixam no dispositivo.",
    coverImage: "/guide/mobile/android-mt.svg",
    sections: [
      {
        kind: "intro",
        heading: "MT Manager e ZArchiver — o que são",
        body: "MT Manager = ferramenta Android pra:\n• Descompilar e recompilar APKs\n• Editar arquivos smali/dex\n• Patch de binários\n• Modificar recursos de apps\n\nZArchiver = gerenciador de arquivos/compressão:\n• Extrair e reempacotar APKs/OBBs\n• Navegação em pastas protegidas\n• Abrir arquivos .xapks, .apks\n\nCombinação MT Manager + ZArchiver = arsenal completo pra modificar o Free Fire sem PC.",
        image: "/guide/mobile/android-mt.svg",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 1 — Detectar MT Manager e ZArchiver",
        body: "1. Gaveta de apps: procura 'MT Manager' (ícone azul/laranja) e 'ZArchiver' (ícone verde)\n2. Configurações → Apps → todos → busca 'MT Manager', 'ZArchiver', 'ZArchiver Pro'\n3. Gerenciador de arquivos nativo → procura pasta 'MT' em /sdcard/\n\nMT Manager só tem versão APK (não está na Play Store) = sideload obrigatório.\nA presença do MT Manager = sideload ativo no dispositivo.",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 2 — Rastros de modificação de APK",
        body: "MT Manager deixa rastros em:\n\n/sdcard/MT/ — pasta de trabalho do MT Manager\n   • Backup de APKs originais antes de modificar\n   • APKs modificados temporários\n   • Logs de operações\n\n/sdcard/ZArchiver/ — extrações realizadas\n\n/sdcard/Download/ — APKs baixados e OBBs modificados\n\nVerifica:\n1. Gerenciador de Arquivos → /sdcard/MT/\n2. Procura arquivos .apk com data da partida\n3. Procura backup do Free Fire original",
        image: "/guide/mobile/android-mt-files.svg",
      },
      {
        kind: "tecnica",
        heading: "🕵️ OBB modificado — como detectar",
        body: "OBB = arquivo de dados do jogo (texturas, modelos, etc).\n\nCheater pode modificar o OBB para:\n• Wallhack (texturas transparentes)\n• Hitbox ampliado (modelo maior)\n• Skin permanente sem comprar\n\nComo detectar OBB modificado:\n1. Gerenciador de Arquivos → /sdcard/Android/obb/com.dts.freefireth/\n2. Verifica data de modificação dos arquivos .obb\n   • Data de hoje = modificado antes da SS\n   • Tamanho diferente do oficial = modificado\n3. Compare hash MD5 do OBB com versão oficial\n   (disponível em sites como APKMirror)\n\nOBB oficial nunca é modificado após a instalação pela Play Store.",
        example: "main.obb do Free Fire com data de modificação = hoje, 2 horas antes da partida. Tamanho: 1.87 GB vs oficial 1.54 GB. Os 330 MB extras eram hitbox e wallhack.",
      },
      {
        kind: "veredito",
        heading: "Veredito — MT Manager e ZArchiver",
        body: "LIMPO = MT Manager não encontrado + /sdcard/MT/ inexistente + OBB com data de instalação original\nSUSPEITO = MT Manager presente + ZArchiver com permissão de app desconhecido + /sdcard/MT/ com arquivos antigos\nBAN = MT Manager + pasta /sdcard/MT/ com APKs recentes + OBB modificado na data da partida",
      },
    ],
    checklist: [
      "Verificar MT Manager e ZArchiver na gaveta e Configurações → Apps",
      "Inspecionar pasta /sdcard/MT/ por APKs modificados",
      "Verificar data de modificação dos arquivos OBB em /sdcard/Android/obb/",
      "Comparar tamanho do OBB com versão oficial",
      "Checar permissões de instalar desconhecidos para esses apps",
    ],
  },

  // ─── 07 · EMULADOR ───────────────────────────────────────────────────────────
  {
    id: "android-emulator",
    title: "Android — Detectar Emulador (BlueStacks, LDPlayer, MuMu)",
    platform: "android",
    categoryId: "sistema",
    order: 107,
    intro:
      "Emuladores permitem rodar Free Fire no PC com mouse e teclado, vantagem competitiva enorme. Aprenda a detectar BlueStacks, LDPlayer, MuMu e NoxPlayer.",
    coverImage: "/guide/mobile/android-emu.svg",
    sections: [
      {
        kind: "intro",
        heading: "Por que emulador é problema",
        body: "Emulador roda Free Fire mobile no PC:\n• Mouse = mira muito mais precisa que dedo\n• Teclado = movimentos mais rápidos e mapeados\n• Resolução arbitrária (pode ser 4K)\n• Configurações de FPS sem limitação do hardware\n\nNa SS você precisa:\n• Identificar se o 'celular' mostrado é real ou emulador disfarçado\n• Detectar emulador mesmo com bypass de detecção ativo",
        image: "/guide/mobile/android-emu.svg",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 1 — Sinais visuais de emulador",
        body: "1. Barra de notificações diferente: emuladores têm barra mais larga e ícones diferentes\n2. Resolução estranha: 1920x1080 em 'celular' = emulador\n3. Sensor de movimento zerado: Configurações → Sensores → giroscópio sempre 0\n4. Sem apps de câmera ou telefone típicos (emuladores omitem)\n5. Modelo do dispositivo genérico:\n   Configurações → Sobre o telefone → Modelo\n   'BlueStacks Android' ou 'Android Virtual Device' = emulador\n6. 'Google Play Protect' ausente ou desabilitado",
      },
      {
        kind: "modulo",
        heading: "📚 PASSO 2 — Verificar modelo e build.prop",
        body: "Emuladores têm modelos específicos:\n• BlueStacks: 'Bluestacks' ou 'Samsung SM-G998B' (spoof)\n• LDPlayer: 'LDPlayer' ou 'LGE Nexus'\n• MuMu: 'MUMU' ou 'Xiaomi'\n• NoxPlayer: 'Nox'\n\nComo verificar:\n1. Configurações → Sobre o telefone → Modelo do dispositivo\n2. Configurações → Sobre o telefone → Número de série\n   (Emuladores têm número de série genérico ou padrão)\n3. Pede pra mostrar a câmera traseira funcionando (emuladores não têm câmera real)\n4. Pede pra mover o celular — giroscópio não reage em emulador",
        image: "/guide/mobile/android-emu-check.svg",
      },
      {
        kind: "tecnica",
        heading: "🕵️ Bypass de detecção de emulador",
        body: "Emuladores modernos têm bypass da detecção do Free Fire:\n• BlueStacks: modo 'Advanced Gaming Mode' com bypass\n• LDPlayer: 'Anti-ban' e spoof de device\n• Ferramenta: 'Cheat Engine PC' pode ser usado junto com emulador\n\nComo detectar mesmo com bypass:\n1. Resolução inconsistente com o modelo 'declarado'\n2. Tempo de resposta do toque não-humano (muito rápido/preciso)\n3. Ausência de sensor de luz ambiente\n4. CPU/GPU reportados não combinam com o 'modelo' de celular\n5. Temperatura do dispositivo:\n   Emuladores no PC ficam quentes no PC mas reportam temperatura irreal no 'celular'\n\nPede pra mostrar Configurações → Bateria → Temperatura do dispositivo.\nEmulador: temperatura constante e irreal (0°C ou 25.0°C fixo).",
        example: "Player disse que estava num Poco X3 Pro. Temperatura mostrava 25.0°C fixo durante gameplay intenso. Poco X3 real ficaria com 38-45°C. Emulador confirmado.",
      },
      {
        kind: "veredito",
        heading: "Veredito — Emulador Android",
        body: "LIMPO = Modelo real identificado + giroscópio funcional + câmera real + temperatura variável\nSUSPEITO = Modelo genérico + sensor zerado + sem câmera\nBAN = Emulador identificado pelo modelo + temperatura constante + sem giroscópio + mouse visível na gameplay",
      },
    ],
    checklist: [
      "Verificar modelo do dispositivo em Configurações → Sobre o telefone",
      "Testar giroscópio: mover celular e ver se reage",
      "Verificar câmera traseira funcionando",
      "Comparar temperatura do dispositivo com gameplay real",
      "Checar número de série e build do dispositivo",
      "Verificar resolução atual em Configurações → Display",
    ],
  },

  // ─── 08 · FLUXO COMPLETO ANDROID ─────────────────────────────────────────────
  {
    id: "android-ss-flow",
    title: "Android — Fluxo Completo SS e Veredito",
    platform: "android",
    categoryId: "analise",
    order: 108,
    intro:
      "Fluxo completo de como conduzir uma SS mobile Android do início ao fim: ordem de verificação, documentação de evidências e emissão de veredito correto.",
    coverImage: "/guide/mobile/android-flow.svg",
    sections: [
      {
        kind: "intro",
        heading: "Antes da SS Android — preparação",
        body: "Antes de chamar pra call:\n\n1. Confirma horário exato da partida suspeita\n2. Anota nick, ID no jogo e modelo do celular declarado\n3. Define o método de SS (Discord screen share, FaceTime, presencial)\n4. Não avisa o que vai procurar\n5. Pede que o player feche todos os apps antes de começar\n\nImportante: pede pra mostrar tela completa SEM tocar nas notificações primeiro.\nNotificação de 'GameGuardian ativo' pode aparecer antes de esconder.",
        image: "/guide/mobile/android-flow.svg",
      },
      {
        kind: "modulo",
        heading: "📚 ORDEM de verificação Android (mais crítico primeiro)",
        body: "1. Tela inicial e gaveta — apps de cheat visíveis (GG, MT Manager)\n2. Configurações → Apps → todos os apps — lista completa\n3. Configurações → Apps → Permissões especiais → Exibir sobre outros apps\n4. Magisk Manager ou KernelSU Manager\n5. Configurações → Sobre o telefone → Modelo + Versão do Kernel\n6. Gerenciador de Arquivos → /sdcard/GameGuardian/ e /sdcard/MT/\n7. Free Fire → Configurações → Sobre → versão + comparar com Play Store\n8. /sdcard/Android/obb/com.dts.freefireth/ — data e tamanho\n9. Configurações → Rede → Proxy ou VPN ativa\n10. Documentar com prints em TUDO",
        image: "/guide/mobile/android-checklist.svg",
      },
      {
        kind: "modulo",
        heading: "📚 Como documentar na SS Android",
        body: "Prints necessários:\n• Lista de apps em Configurações → Apps (scroll completo)\n• Configurações → Apps → cada app suspeito (nome + versão + tamanho)\n• Pasta /sdcard/GameGuardian/ se existir\n• Pasta /sdcard/MT/ se existir\n• Data de modificação dos OBBs\n• Versão do Free Fire vs Play Store\n• Superusuário do Magisk se acessível\n• Versão do kernel (Sobre o telefone)\n\nFormato do arquivo: NICK_DATA_HORA_Android_SS.png",
      },
      {
        kind: "tecnica",
        heading: "🕵️ Segundo espaço e perfis de trabalho",
        body: "Cheater pode criar 'Segundo Espaço' ou Perfil de Trabalho com apps ocultos.\n\nComo detectar:\n1. Configurações → busca 'Segundo espaço' ou 'Dual Space'\n   (Presente em Xiaomi, OPPO, Realme)\n2. Configurações → Usuários e Contas → Usuários\n   (Android puro e Samsung)\n3. Pede pra mostrar TODOS os perfis, não só o principal\n4. Perfil adicional com Apps suspeitos = flag máxima\n\nTambém: Island, Shelter, e Work Profile podem ser usados pra esconder apps.\nSe o player tem Island/Shelter instalado = suspeito imediato.",
        example: "Player negou ter GameGuardian. Mas tinha 'Shelter' instalado. Dentro do Shelter (Work Profile): GameGuardian, Magisk e Free Fire Mod. Todo o cheat separado no perfil de trabalho.",
      },
      {
        kind: "veredito",
        heading: "Veredito final Android — critérios",
        body: "INOCENTE:\n• Nenhum app de cheat em nenhum perfil\n• APK oficial da Play Store\n• Sem root (kernel stock, sem Magisk)\n• Proxy/VPN limpos ou com justificativa\n• Cooperação total\n\nSUSPEITO:\n• Apps apagados recentemente\n• Segundo espaço vazio (suspeito já criar)\n• Root presente mas Deny List ativo pro Free Fire\n• Evasão parcial\n→ Aviso + SS extra na próxima semana\n\nBANIMENTO:\n• GameGuardian encontrado (pasta ou histórico)\n• APK modificado confirmado\n• Magisk com módulo de cheat\n• OBB modificado na data da partida\n• Emulador identificado\n→ Ban documentado + notificação à organização",
      },
    ],
    checklist: [
      "Verificar gaveta de apps completa (não acelerar)",
      "Conferir Configurações → Apps → todos com scroll lento",
      "Checar 'Exibir sobre outros apps' para apps de cheat",
      "Verificar Magisk e KernelSU",
      "Inspecionar /sdcard/GameGuardian/ e /sdcard/MT/",
      "Comparar versão do Free Fire com Play Store",
      "Verificar data e tamanho do OBB",
      "Checar Segundo Espaço e perfis adicionais",
      "Documentar com prints nomeados corretamente",
      "Emitir veredito com critérios e evidências claras",
    ],
  },
];
