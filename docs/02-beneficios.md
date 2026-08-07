# 02 — Benefícios

## 2.1 Os três diferenciais

O valor do Circula·MG não está em "ter um catálogo de bens" — isso o Portal
Doações gov.br já faz. Está em três capacidades que uma solução nacional
genérica dificilmente entrega no curto prazo.

### 1. Notificação ativa: de *pull* para *push*

No modelo nacional, o servidor que precisa de um projetor tem de suspeitar que
existe um projetor disponível e ir buscá-lo no catálogo. Na prática, ninguém
consulta um catálogo nacional diariamente.

O Circula·MG inverte o sentido: o servidor **declara previamente seu interesse**
numa combinação de *categoria × campus*, e o sistema o avisa quando um bem
compatível é publicado.

> *"Novo bem **Projetor multimídia** classificado como **Recuperável** em
> Alfenas — compatível com Núcleo de Tecnologia · há 1 h"*

**Ganho:** elimina a dependência de busca manual, que é a principal razão pela
qual bens publicados não encontram destinatário.

### 2. Workflow acoplado à comissão de avaliação

O Decreto nº 12.785/2025 (art. 19) exige que a classificação seja atribuída por
comissão formal. Em vez de tratar isso como um rito externo que roda em processo
SEI e depois é transcrito para o sistema, o Circula·MG faz da comissão **uma
etapa do próprio fluxo**: o cadastro do setor de patrimônio é submetido como
*classificação proposta*, e a publicação na vitrine só ocorre após a confirmação
da comissão.

**Ganho:** elimina retrabalho e reduz o intervalo entre a decisão da comissão e
a disponibilidade efetiva do bem.

### 3. Indicadores locais de desempenho

O painel entrega o que a visão nacional agregada não mostra: **quanto tempo um
bem leva para circular naquele campus** e **onde a ociosidade está
concentrada**.

**Ganho:** transforma reaproveitamento em algo mensurável e, portanto, gerenciável.

---

## 2.2 Benefícios por stakeholder

### Gestão da universidade (Reitoria, Pró-Reitoria de Administração)

- **Economia orçamentária direta** — cada bem reaproveitado é uma compra não
  realizada; em cenário de restrição orçamentária, o estoque ocioso vira
  capacidade instalada.
- **Conformidade demonstrável** — a classificação nas 5 categorias do art. 3º e
  o registro da decisão da comissão produzem trilha de evidência para órgãos de
  controle.
- **Visibilidade de rede** — em vez de 4 campi operando como ilhas, um único
  inventário circulante.

### Setor de Patrimônio

- **Fim do "cemitério de almoxarifado"** — bens ociosos deixam de ser passivo de
  espaço físico e viram oferta ativa.
- **Cadastro em um formulário curto** — nome, campus, setor, classificação
  proposta e descrição; sem duplicar o rito documental.
- **Rastreabilidade por bem** — o *stepper* de 6 etapas mostra, a qualquer
  momento, onde cada item está no processo.

### Comissão de Avaliação

- **Fila de trabalho organizada** — os cadastros chegam com classificação já
  proposta e justificada, cabendo à comissão confirmar, alterar ou devolver.
- **Decisão registrada no sistema** — a atribuição prevista no art. 19 fica
  documentada com autoria e data, em vez de existir só em ata.

### Servidor Solicitante / unidades demandantes

- **Descoberta sem esforço** — recebe o aviso em vez de precisar procurar.
- **Atendimento mais rápido que uma compra** — manifestar interesse é um clique;
  abrir processo de aquisição são meses.
- **Transparência de estado** — sabe se o bem está `Disponível`, `Reservado` ou
  já `Transferido`.

### Sociedade, meio ambiente e órgãos de controle

- **Economia circular efetiva** — prolonga a vida útil de bens públicos, evitando
  descarte precoce e a extração associada a novas aquisições.
- **Caminho para as cooperativas de catadores** — os bens classificados como
  antieconômicos e irrecuperáveis ficam explicitamente identificados na vitrine,
  facilitando a destinação preferencial prevista no art. 13, IV.
- **Publicidade** — o perfil de Consulta Pública expõe vitrine e indicadores.

### Projeto de pesquisa

- **Prova de conceito executável** para a defesa de qualificação;
- **Instrumento de campo** para os ciclos de pesquisa-ação (diagnóstico,
  intervenção, avaliação) com servidores dos setores de patrimônio;
- **Base de dados própria** sobre reaproveitamento em escala local, hoje
  inexistente.

---

## 2.3 Matriz dor → solução

| Dor identificada | Como o Circula·MG resolve | Onde isso aparece no produto |
|---|---|---|
| Bem ocioso invisível para quem precisa dele | Vitrine compartilhada entre campi + notificação por categoria/campus | Módulo **Vitrine**, módulo **Notificações** |
| Ninguém consulta o catálogo nacional espontaneamente | Notificação *push* para interesse pré-declarado | Módulo **Notificações** |
| Classificação do decreto tratada como burocracia à parte | Seletor visual das 5 categorias no cadastro + etapa formal da comissão | Módulo **Cadastrar bem**, etapa 2 do *stepper* |
| Não se sabe onde o bem está no processo | *Stepper* de 6 etapas visível no detalhe do bem | Modal de **Detalhe do bem** |
| Gestão sem métrica de reaproveitamento | 4 KPIs + distribuição por categoria + volume por campus | Módulo **Painel** |
| Ociosidade concentrada em um campus passa despercebida | Gráfico de bens publicados por campus | Módulo **Painel** |
| Bem antieconômico/irrecuperável sem destinação clara | Categoria explícita e filtrável, alinhada ao art. 13, IV | Filtro de categoria na **Vitrine** |

---

## 2.4 Indicadores de sucesso

Os quatro KPIs abaixo **já estão implementados no painel do protótipo**,
calculados sobre os dados simulados:

| KPI | Como é calculado hoje | Para que serve |
|---|---|---|
| **Bens cadastrados** | Total de registros | Volume de adesão da rede |
| **Disponíveis na vitrine** | Registros com status `disponivel` | Oferta corrente |
| **Reaproveitados** | Registros com status `transferido` | Ciclos concluídos — o resultado que importa |
| **Tempo médio** | Média de dias desde a publicação | Velocidade: publicação → interesse |

### Métricas propostas para o piloto *(ainda não implementadas)*

| Métrica | Definição | Por que importa |
|---|---|---|
| **Taxa de reaproveitamento** | reaproveitados ÷ publicados, por campus e por período | Mede eficácia, não só volume |
| **Tempo de ciclo completo** | cadastro → reaproveitado, em dias | Expõe onde o processo trava |
| **Tempo em fila da comissão** | classificação proposta → confirmada | Isola o gargalo do rito de avaliação |
| **Taxa de conversão da notificação** | interesses manifestados ÷ notificações enviadas | Valida se a segmentação está correta |
| **Bens sem interesse após N dias** | itens publicados há mais de N dias sem manifestação | Aciona destinação alternativa (doação externa) |
| **Compras evitadas (valor estimado)** | soma do valor de mercado dos bens transferidos | Traduz o benefício em orçamento |

---

## 2.5 Limitações e riscos

Documentados aqui por honestidade de projeto — nenhum deles invalida o produto,
mas todos precisam de resposta antes do piloto.

| Risco | Natureza | Mitigação prevista |
|---|---|---|
| **Dupla digitação** entre Circula·MG e Siads | Operacional | Camada de interoperabilidade (roadmap, item 5) — o Siads permanece como fonte de verdade patrimonial |
| **Adesão baixa** dos setores de patrimônio | Cultural | Ciclos de pesquisa-ação e testes de usabilidade com os próprios servidores (roadmap, item 6) |
| **Sobreposição percebida** com o sistema nacional | Institucional | Posicionamento explícito como camada complementar; publicação no sistema da Seges/MGI permanece obrigatória |
| **Notificação em excesso** vira ruído | Produto | Segmentação por categoria × campus × setor; agrupamento e digest a definir |
| **Ausência de baixa patrimonial formal** no sistema | Jurídico | O Circula·MG registra a intenção e o encontro entre oferta e demanda; o ato formal continua no rito administrativo |
| **Protótipo sem persistência nem autenticação** | Técnico | Itens 1 e 2 do roadmap são pré-requisito de qualquer piloto real |

---

**Anterior:** [01 — Descrição](01-descricao.md) · **Próximo:** [03 — Como funciona](03-como-funciona.md)
