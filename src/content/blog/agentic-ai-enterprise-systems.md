---
title: "Sistemi AI Agentici: Architetture sicure per istituti finanziari e grandi imprese"
description: "Dall'AI Act a DORA: come progettare sistemi agentici conformi per istituti finanziari e grandi imprese. Una guida tecnica su come implementare automazione intelligente senza compromettere sicurezza, sovranità del dato e requisiti di audit."
pubDate: 2026-04-15
category: "Enterprise AI & Compliance"
readingTime: "10 min"
---

Il settore finanziario italiano e le grandi organizzazioni enterprise sono sotto una pressione normativa senza precedenti. Il [Digital Operational Resilience Act (DORA)](https://finance.ec.europa.eu/digital-finance/digital-operational-resilience-act-dora_en) è entrato pienamente in vigore, imponendo standard rigorosi sulla resilienza ICT. Parallelamente, l'[AI Act europeo](https://artificialintelligenceact.eu/it/) ha iniziato a proiettare i suoi effetti sui sistemi classificati ad alto rischio. I player Fintech — privi di vincoli legacy e strutturalmente più agili — stanno accelerando il time-to-market delle soluzioni basate su intelligenza artificiale, costringendo gli istituti tradizionali a una rincorsa tecnologica e normativa.

La domanda che viene posta più frequentemente dai responsabili tecnici in questi contesti non è "possiamo usare l'AI?" ma "come usiamo l'AI senza esporci a rischi normativi che non siamo preparati a gestire?".

È la domanda giusta. Ed è anche una domanda che ha risposte concrete.

## Il contesto normativo in sintesi

Prima di parlare di architettura, è necessario essere precisi sul contesto normativo, perché molte banche e grandi imprese operano con una comprensione parziale o imprecisa di cosa richiede effettivamente la regolamentazione.

**DORA** si concentra sulla resilienza operativa digitale: gestione del rischio ICT, incident reporting, test di penetrazione, gestione dei fornitori di terze parti. Per i sistemi AI, DORA implica che ogni componente — inclusi i modelli AI — deve essere parte di una governance del rischio documentata, con piani di continuità verificabili e procedure di ripristino.

**L'AI Act** introduce una classificazione per livello di rischio. I sistemi AI usati in ambito creditizio, assicurativo o di valutazione del rischio finanziario sono **sistemi ad alto rischio (Capitolo III)**. Questo comporta obblighi specifici: registrazione nel database EU, documentazione tecnica, misure di sorveglianza umana, robustezza e accuratezza verificabili, e trasparenza verso i supervisori.

**La Direttiva NIS2**, [recepita in Italia nel 2024](https://www.acn.gov.it/portale/nis), estende gli obblighi di sicurezza informatica anche a operatori di servizi essenziali, richiedendo una gestione del rischio che includa l'intera catena di approvvigionamento del software AI.

Il quadro normativo non impedisce l'adozione AI. Richiede che l'adozione sia **documentata, verificabile e governata**. Si tratta di requisiti architetturali, non di divieti.

## Il rischio reale: non la norma, ma l'improvvisazione

Il rischio più grande che si osserva nelle istituzioni finanziarie e nelle grandi imprese non è la normativa in sé, ma il tentativo di adottare strumenti AI progettati per contesti consumer in ambienti enterprise ad alto rischio.

Questo si manifesta in pattern ricorrenti:

- **Shadow AI**: team che utilizzano strumenti consumer per elaborare documenti riservati, violando i principi del [GDPR](https://www.garanteprivacy.it/regolamentoeuropeo)
- **Vendor lock-in non governato**: acquisto di soluzioni "black box" senza controllo sui log o sulla residenza dei dati.
- **Proof of concept che non scalano**: sistemi AI costruiti come esperimenti, senza piani di scalabilità, monitoraggio o dismissione sicura
- **Explainability assente**: modelli deployati in produzione senza meccanismi per spiegare le decisioni a clienti, regolatori o in caso di contestazione legale

Ognuno di questi pattern è un rischio normativo concreto, non teorico.

## Un'architettura AI conforme per il mercato Enterprise: principi fondamentali

Progettare un sistema AI conforme in ambiti ad alta regolamentazione non significa scegliere il modello più performante e sperare che passi l'audit. Significa costruire dall'inizio con la governance integrata.

### 1. Data governance prima del modello

Prima di scegliere un LLM o un framework di ML, l'organizzazione deve rispondere a domande precise: Dove risiedono i dati di training? Sono dati personali ai sensi del GDPR? Ci sono dati classificati come riservati? Quali dati possono uscire dall'infrastruttura on-premise?

Per le organizzazioni che gestiscono dati critici, la risposta più frequentemente corretta è: **i modelli devono operare on-premise o in cloud privato certificato**. Questo non preclude l’utilizzo di LLM di frontiera (come quelli di OpenAI o di Anthropic); ne impone però un’integrazione controllata. Una strategia efficace consiste nel privilegiare istanze private (es. Azure OpenAI con Data Residency in EU) o modelli open-weights orchestrati internamente.

Un pattern emergente per conciliare performance e compliance è l'adozione del [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro). In questa architettura, un Server MCP locale agisce da gateway intelligente tra il modello (nel cloud protetto) e i sistemi core aziendali. Invece di trasmettere interi dataset sensibili, il server MCP espone solo tool specifici che effettuano Data Minimization o aggregazione locale. In questo modo, l'LLM riceve solo il contesto o i dati aggregati strettamente necessari per completare il task, garantendo che i dati grezzi e sensibili non lascino mai il perimetro controllato dell'organizzazione.

### 2. Logging e audit trail come requisito di primo ordine

Architetturalmente, è necessario un layer di osservabilità separato dal modello, con storage immutabile dei log e retention policy conforme alle normative di settore (tipicamente 5-7 anni). Ogni inferenza deve essere tracciabile: input, versione del modello, confidenza e output.

### 3. Human-in-the-loop (HITL)

La sorveglianza umana non può ridursi a una mera validazione formale dell'output tramite una 'checkbox' nella UI. Il decisore umano deve avere accesso alle *feature* principali che hanno determinato lo scoring, al range di confidenza e a eventuali anomalie rilevate rispetto ai pattern storici.

### 4. Model cards e documentazione tecnica

L'AI Act richiede documentazione tecnica per i sistemi ad alto rischio. Questo include: descrizione del sistema, dati di training usati, metriche di performance su dataset di validazione, limitazioni note, istruzioni per il deployment sicuro. Non è documentazione per i manager — è documentazione per i regolatori.

Costruire questa documentazione a posteriori, a sistema già in produzione, è tecnicamente possibile ma estremamente costoso. Costruirla durante il design è parte del processo normale di un sistema progettato con governance by design.

## Sicurezza: il threat model per sistemi AI in contesti critici

I sistemi AI introducono superfici di attacco specifiche:

**Prompt injection**: un attaccante che controlla input testuale non strutturato può tentare di manipolare il comportamento del modello. In un sistema che processa email, documenti o messaggi di clienti, questo è un vettore concreto. La mitigazione richiede: validazione dell'input, sandboxing del contesto del modello, e monitoraggio delle anomalie nell'output.

**Training data poisoning**: se il modello viene fine-tuned su dati interni, la qualità e l'integrità di quei dati diventa critica per la sicurezza. Dati manipolati in input di training possono produrre bias o backdoor nei modelli deployati.

**Model extraction**: attraverso query sistematiche, un attaccante può tentare di ricostruire le caratteristiche di un modello proprietario. Per sistemi che incorporano logiche di business proprietarie, questo è un rischio di proprietà intellettuale oltre che di sicurezza.

**Inference attacks**: in alcuni scenari, l'output di un modello può rivelare informazioni sui dati di training. Per modelli fine-tuned su dati clienti, questo può costituire una violazione del GDPR.

## La scalabilità: costruire per i volumi della grande impresa

Un sistema agentico che brilla in un ambiente di test può collassare quando viene esposto ai volumi reali di un istituto di credito o di una grande multinazionale. 
Progettare per la produzione significa soddisfare requisiti infrastrutturali non negoziabili:

- **Latency SLA**: per decisioni critiche (rilevamento frodi, scoring istantaneo), la latenza del modello deve scendere sotto le poche centinaia di millisecondi.
- **Throughput garantito**: l'architettura deve gestire i picchi di carico (chiusure di fine mese, campagne massive o eventi di mercato volatili) senza degradazione del servizio.
- **Fault tolerance**: il fallimento di un componente AI non deve mai bloccare il processo di business core. I meccanismi di fallback devono essere progettati nativamente, non improvvisati.
- **Cost at scale**: il costo per inferenza, se proiettato su milioni di operazioni, deve essere sostenibile all'interno del business case iniziale.

## Il percorso consigliato per l'adozione Enterprise

Basandomi sull'esperienza di progettazione di sistemi AI in produzione, il percorso che raccomando alle grandi organizzazioni è rigorosamente sequenziale, non parallelo:

**Fase 1 — Inventario e classificazione**: catalogare tutti gli usi attuali e pianificati dell'AI nell'organizzazione. Classificarli per livello di rischio AI Act e identificare i gap di governance.

**Fase 2 — Governance framework**: definire le policy per l'utilizzo dell'AI. Quali dati possono alimentare i sistemi? Quali strumenti sono approvati dall'IT Security? Chi ha la responsabilità dell'approvazione finale e come viene strutturato il monitoraggio continuo?

**Fase 3 — Pilota governato**: scegliere un caso d'uso a basso rischio (es. automazione della reportistica interna o analisi documentale non-core) e implementarlo seguendo il framework di governance completo. Questo approccio permette di costruire competenza interna e validare il pattern architetturale davanti agli stakeholder.

**Fase 4 — Scaling con governance**: estendere il framework a casi d'uso più complessi, forti di una governance già collaudata e di una infrastruttura pronta a scalare.

L'errore più comune è invertire l'ordine: deployare il caso d'uso più ambizioso senza una struttura di controllo, per poi tentare di aggiungere la compliance a posteriori — un'operazione tecnicamente rischiosa ed estremamente costosa.

## Conclusione

L'adozione dell'AI in settori ad alta criticità non è una questione di "permesso normativo". È una sfida architettonica: come costruire sistemi che siano simultaneamente efficaci, scalabili e conformi.

La risposta non è aspettare che il quadro normativo si stabilizzi — le tecnologie e le regole si evolveranno continuamente. La vera soluzione risiede nel costruire seguendo i principi della **governance-by-design**. 

Le organizzazioni che oggi scelgono questo approccio stanno trasformando la compliance da un onere burocratico a un vantaggio competitivo duraturo. Non si tratta solo di rispettare le regole, ma di costruire l'infrastruttura di fiducia necessaria per guidare l'innovazione del futuro.

---

*Gestite sistemi complessi in settori regolamentati e volete capire come applicare questi principi di governance al vostro contesto specifico? [Prenota una Discovery Call di 30 minuti](https://calendly.com/luca-flammia/30min).*
