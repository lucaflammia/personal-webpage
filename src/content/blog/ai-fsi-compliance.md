---
title: "AI nell'universo FSI: Sicurezza, Compliance e Scalabilità"
description: "Banche e assicurazioni adottano AI sotto la pressione di DORA e AI Act. Come costruire sistemi che passino i controlli normativi senza sacrificare l'efficacia."
pubDate: 2026-04-15
category: "FSI & Compliance"
readingTime: "10 min"
---

Il settore finanziario italiano è sotto una pressione normativa senza precedenti. DORA (Digital Operational Resilience Act) è entrato in vigore a gennaio 2025. L'AI Act europeo ha iniziato a proiettare i suoi effetti sui sistemi classificati ad alto rischio. E nel frattempo, i concorrenti fintech — meno vincolati dalla struttura legacy, più agili nell'adozione tecnologica — stanno accelerando.

La domanda che mi viene posta più frequentemente dai responsabili tecnici in ambito FSI non è "possiamo usare l'AI?" ma "come usiamo l'AI senza esporci a rischi normativi che non siamo preparati a gestire?".

È la domanda giusta. Ed è anche una domanda che ha risposte concrete.

## Il contesto normativo in sintesi

Prima di parlare di architettura, è necessario essere precisi sul contesto normativo, perché molte aziende FSI operano con una comprensione parziale o imprecisa di cosa richiede effettivamente la regolamentazione.

**DORA** si concentra sulla resilienza operativa digitale: gestione del rischio ICT, incident reporting, test di penetrazione, gestione dei fornitori di terze parti. Per i sistemi AI in ambito FSI, DORA implica che ogni componente — inclusi i modelli AI — deve essere parte di una governance del rischio documentata, con piani di continuità e procedure di ripristino.

**L'AI Act** introduce una classificazione per livello di rischio. I sistemi AI usati in ambito creditizio, assicurativo o di valutazione del rischio finanziario sono **sistemi ad alto rischio** (Allegato III). Questo comporta obblighi specifici: registrazione nel database EU, documentazione tecnica, misure di sorveglianza umana, robustezza e accuratezza verificabili, e trasparenza verso i supervisori.

**La Direttiva NIS2**, recepita in Italia nel 2024, estende gli obblighi di sicurezza informatica anche a operatori di servizi essenziali, categoria che include molti istituti finanziari.

Il quadro normativo non impedisce l'adozione AI. Richiede che l'adozione sia **documentata, verificabile e governata**. Si tratta di requisiti architetturali, non di divieti.

## Il rischio reale: non la norma, ma l'improvvisazione

Il rischio più grande che osservo nelle organizzazioni FSI che si avvicinano all'AI non è la normativa in sé. È il tentativo di adottare strumenti AI progettati per contesti consumer in ambienti enterprise ad alto rischio, senza l'infrastruttura di governance necessaria.

Questo si manifesta in pattern ricorrenti:

- **Shadow AI**: team che usano ChatGPT o altri strumenti consumer per elaborare documenti riservati, al di fuori di qualsiasi controllo IT o compliance
- **Vendor lock-in non governato**: acquisto di soluzioni AI preconfezionate senza comprendere cosa accade ai dati, dove vengono processati, chi ha accesso ai log
- **Proof of concept che non scalano**: sistemi AI costruiti come esperimenti, senza piani di scalabilità, monitoraggio o dismissione sicura
- **Explainability assente**: modelli deployati in produzione senza meccanismi per spiegare le decisioni a clienti, regolatori o in caso di contestazione legale

Ognuno di questi pattern è un rischio normativo concreto, non teorico.

## Un'architettura AI conforme per FSI: principi fondamentali

Progettare un sistema AI conforme in ambito FSI non significa scegliere il modello più performante e sperare che passi l'audit. Significa costruire dall'inizio con la governance integrata.

### 1. Data governance prima del modello

Prima di scegliere un LLM o un framework di ML, l'organizzazione deve rispondere a domande precise: Dove risiedono i dati di training? Sono dati personali ai sensi del GDPR? Ci sono dati classificati come riservati? Quali dati possono uscire dall'infrastruttura on-premise?

In ambito FSI, la risposta più frequentemente corretta è: **i modelli devono girare on-premise o in cloud privato certificato, con dati che non lasciano mai il perimetro controllato**. Questo non esclude i LLM — esclude i LLM accessibili solo via API pubblica senza garanzie contrattuali adeguate.

### 2. Logging e audit trail come requisito di primo ordine

Ogni decisione prodotta da un sistema AI in ambito FSI deve essere ricostruibile. Chi ha fatto la richiesta, con quali parametri, quale modello ha risposto, con quale confidenza, in quale momento. Questo non è gold-plating — è un requisito di audit.

Architetturalmente, questo significa un layer di osservabilità separato dal modello, con storage immutabile dei log, retention policy conforme alle normative di settore (tipicamente 5-7 anni per il FSI), e API di query per i team di compliance.

### 3. Human-in-the-loop non come afterthought

L'AI Act per i sistemi ad alto rischio richiede "supervisione umana significativa". Non basta un flag UI che dice "rivedi questa decisione". Significa progettare workflow in cui l'umano ha effettivamente accesso alle informazioni necessarie per valutare la raccomandazione AI, il tempo per farlo, e la capacità tecnica di capire su quali basi è stata prodotta.

In pratica, per un sistema di scoring creditizio AI-assisted: il decisore umano deve vedere non solo il punteggio finale, ma le feature principali che lo hanno determinato, il range di confidenza del modello, e eventuali anomalie rispetto ai pattern storici.

### 4. Model cards e documentazione tecnica

L'AI Act richiede documentazione tecnica per i sistemi ad alto rischio. Questo include: descrizione del sistema, dati di training usati, metriche di performance su dataset di validazione, limitazioni note, istruzioni per il deployment sicuro. Non è documentazione per i manager — è documentazione per i regolatori.

Costruire questa documentazione a posteriori, a sistema già in produzione, è tecnicamente possibile ma estremamente costoso. Costruirla durante il design è parte del processo normale di un sistema progettato con governance by design.

## Sicurezza: il threat model per sistemi AI in FSI

I sistemi AI introducono superfici di attacco che i team di sicurezza tradizionali non sono abituati a gestire.

**Prompt injection**: un attaccante che controlla input testuale non strutturato può tentare di manipolare il comportamento del modello. In un sistema che processa email, documenti o messaggi di clienti, questo è un vettore concreto. La mitigazione richiede: validazione dell'input, sandboxing del contesto del modello, e monitoraggio delle anomalie nell'output.

**Training data poisoning**: se il modello viene fine-tuned su dati interni, la qualità e l'integrità di quei dati diventa critica per la sicurezza. Dati manipolati in input di training possono produrre bias o backdoor nei modelli deployati.

**Model extraction**: attraverso query sistematiche, un attaccante può tentare di ricostruire le caratteristiche di un modello proprietario. Per sistemi che incorporano logiche di business proprietarie, questo è un rischio di proprietà intellettuale oltre che di sicurezza.

**Inference attacks**: in alcuni scenari, l'output di un modello può rivelare informazioni sui dati di training. Per modelli fine-tuned su dati clienti, questo può costituire una violazione del GDPR.

Nessuno di questi rischi è insormontabile. Tutti richiedono di essere nel threat model fin dall'inizio del progetto.

## La scalabilità: costruire per il volume FSI

Una delle sfide più sottovalutate nell'adozione AI in ambito FSI è la scalabilità sotto carico. Un modello che funziona in un proof of concept con 100 richieste al giorno può collassare sotto i volumi di produzione di una banca retail.

I requisiti di scalabilità per sistemi AI in FSI tipicamente includono:

- **Latency SLA**: per decisioni real-time (frode, scoring), la latenza del modello deve essere inferiore a poche centinaia di millisecondi. Modelli grandi e API pubbliche spesso non soddisfano questo requisito
- **Throughput garantito**: picchi di carico (fine mese, campagne, eventi di mercato) devono essere gestiti senza degradazione del servizio
- **Fault tolerance**: il fallimento del componente AI non deve bloccare il processo di business. I fallback devono essere progettati, non improvvisati
- **Cost at scale**: il costo per inferenza moltiplicato per il volume di produzione deve essere parte del business case fin dall'inizio

Questi requisiti orientano spesso verso soluzioni on-premise o cloud privato con modelli di dimensione appropriata al task — non necessariamente i modelli più grandi disponibili.

## Il percorso consigliato per un'organizzazione FSI

Basandomi sull'esperienza di progettazione di sistemi AI in produzione, il percorso che raccomando alle organizzazioni FSI è sequenziale, non parallelo:

**Fase 1 — Inventario e classificazione**: catalogare tutti gli usi attuali e pianificati dell'AI nell'organizzazione. Classificarli per livello di rischio AI Act e identificare i gap di governance.

**Fase 2 — Governance framework**: definire le policy per uso AI: quali dati possono entrare in sistemi AI, quali strumenti sono approvati, chi approva nuovi sistemi, come vengono monitorati.

**Fase 3 — Pilota governato**: scegliere un caso d'uso a basso rischio (es: generazione di bozze di reportistica interna, non decisioni su clienti) e deployarlo con il framework di governance completo. Questo costruisce competenza interna e dimostra il pattern agli stakeholder.

**Fase 4 — Scaling con governance**: estendere il framework a casi d'uso più complessi, con la governance già collaudata.

L'errore è invertire l'ordine: deployare il caso d'uso più ambizioso senza governance, poi tentare di aggiungere compliance a posteriori.

## Conclusione

L'AI in ambito FSI non è una questione di "possiamo permettercelo normativamente". È una questione di "come costruiamo sistemi che siano simultaneamente efficaci, scalabili e conformi".

La risposta non è aspettare che il quadro normativo si stabilizzi — si evolverà continuamente. La risposta è costruire con principi di governance solidi che si adattano alla normativa anziché doverla rincorrere.

Le organizzazioni FSI che nel 2026 stanno deployando AI con questo approccio stanno costruendo un vantaggio competitivo duraturo. Non perché l'AI sia magica, ma perché la governance è un differenziatore quando la maggioranza del mercato la tratta ancora come un costo.

---

*Operate in ambito FSI e volete capire come applicare questi principi al vostro contesto specifico? [Prenota una Discovery Call di 30 minuti](#booking).*
