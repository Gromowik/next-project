# GTC — Empfehlungen zur Baumerstellung

Der **General Tree of Connections (GTC)** ist ein rekursiv verschachtelter Baum, der die Struktur eines Programms auf jeder Ebene beschreibt — vom Ordner bis zum einzelnen Ausdruck. Dieses Dokument enthält die Regeln und Empfehlungen, um einen GTC korrekt aufzubauen.

---

## 1. Grundeinheit

Jede Zeile beschreibt **einen Knoten** des Baums:

```text
LEVEL TYPE LABEL (Kommentar)
```

| Teil | Bedeutung |
|------|-----------|
| `LEVEL` | Ganzzahl ≥ 1 — Tiefe des Knotens im Baum |
| `TYPE` | Knotentyp (siehe §3) |
| `LABEL` | Beliebiger Name oder Beschreibung |
| `(Kommentar)` | Optional — in runden Klammern, beeinflusst das Parsen nicht |

Beispiel:

```text
1 function saveFlowAction
2 input
3 param flow (Flow)
3 param sequence (number)
2 body
3 call readSessionFromCookie → session
2 output
3 case success (SaveFlowActionResult)
```

---

## 2. Regeln für Ebenen

### Einrückung nach unten: nur +1

Der Übergang zu einer tieferen Ebene ist nur um **einen Schritt** erlaubt:

```text
✅ Korrekt:
1 function
2 body
3 branch if

❌ Falsch — Ebene 2 übersprungen:
1 function
3 branch if
```

### Gleiche Ebene = Nachbarknoten

Knoten mit gleichem Level gehören zum selben Elternknoten:

```text
2 input
2 body       ← Geschwister von "input"
2 output     ← Geschwister von "input" und "body"
```

### Kleinerer Level = Aufstieg im Baum

Wenn der Level sinkt, schließt sich der aktuelle Zweig und der Baum geht zum passenden Elternknoten zurück:

```text
3 call readSessionFromCookie
3 branch if !session
4 return { ok: false }
3 branch try      ← Ebene 3 wieder: neuer Geschwisterknoten unter "body"
```

---

## 3. Knotentypen

| Typ | Bedeutung |
|-----|-----------|
| `function` | Funktionsdefinition |
| `block` | Allgemeiner Block / Scope |
| `branch` | Verzweigung (`if`, `else`, `try`, `catch`) |
| `condition` | Bedingungsausdruck |
| `loop` | Schleife (`for`, `while`) |
| `call` | Funktionsaufruf |
| `param` | Eingabeparameter |
| `arg` | Argument eines Aufrufs |
| `case` | Möglicher Rückgabepfad |
| `action` | Einzelne Anweisung |
| `return` | Rückgabewert |
| `comment` | Erklärung, beeinflusst keine Struktur |

---

## 4. Funktionsstruktur

Jede Funktion wird in drei Teile aufgeteilt:

```text
1 function NAME
2 input
3 …
2 body
3 …
2 output
3 …
```

### Eingabe (`input`)

Für jeden Parameter: `param NAME (Typ)`

- Ein Attribut → Klammern auf derselben Zeile
- Zwei oder mehr Attribute → eigene Kindknoten (Level +1)

```text
2 input
3 param flow (Flow)
3 param sequence (number)
```

Oder im vollständigen Format:

```text
2 input
3 param flow
4 content flow
4 type    Flow
```

### Ausgabe (`output`)

Wenn die Funktion mehrere mögliche Rückgabewerte hat → `case` statt direktem `content`:

```text
2 output
3 case success
4 content { ok: true }
4 type    SaveFlowActionResult
3 case auth-error
4 content { ok: false, reason: "not_authenticated" }
4 type    SaveFlowActionResult
3 case db-error
4 content { ok: false, reason: "db_error" }
4 type    SaveFlowActionResult
```

> Regel: ein Rückgabepfad → `content` auf Ebene 3. Mehrere Pfade → `case` auf Ebene 3, `content`/`type` auf Ebene 4.

### Körper (`body`)

Sequenzielle Aufrufe und Verzweigungen als direkte Kinder:

```text
2 body
3 call readSessionFromCookie → session (Promise<Session | null>)
3 branch if !session
4 return { ok: false, reason: "not_authenticated" }
3 branch try
4 call saveFlowForUser
5 arg userId   session.sub
5 arg flow     flow
5 arg sequence sequence
4 return { ok: true }
3 branch catch
4 return { ok: false, reason: "db_error" }
```

---

## 5. Vollständiges Beispiel: `saveFlowAction`

```text
1 function saveFlowAction
2 input
3 param flow (Flow)
3 param sequence (number)
2 body
3 call readSessionFromCookie → session (Promise<Session | null>)
3 branch if !session
4 return { ok: false, reason: "not_authenticated" }
3 branch try
4 call saveFlowForUser
5 arg userId   session.sub
5 arg flow     flow
5 arg sequence sequence
4 return { ok: true }
3 branch catch
4 return { ok: false, reason: "db_error" }
2 output
3 case success
4 content { ok: true }
4 type    SaveFlowActionResult
3 case auth-error
4 content { ok: false, reason: "not_authenticated" }
4 type    SaveFlowActionResult
3 case db-error
4 content { ok: false, reason: "db_error" }
4 type    SaveFlowActionResult
```

---

## 6. Minimale formale Grammatik

```text
NODE  := LEVEL TYPE LABEL [COMMENT]
LEVEL := Ganzzahl ≥ 1
TYPE  := function | block | branch | condition | loop | call
       | param | arg | case | action | return | comment
LABEL := beliebiger Text
COMMENT := "(" beliebiger Text ")"
```

Baumregeln:

1. Die erste Zeile hat Level `1`.
2. Ein Knoten mit Level `n` wird Kind des nächsten vorherigen Knotens mit Level `n-1`.
3. Gleicher Level = Geschwisterknoten desselben Elternteils.
4. Kleinerer Level = Aufstieg zum passenden Vorfahren.
5. Übersprungene Level beim Abstieg sind verboten.

---

## 7. Makro- und Mikroebene

Der GTC gilt auf jeder Ebene des Programms:

| Ebene | Beispiel |
|-------|---------|
| Makro | Ordner, Dateien, Module |
| Mittel | Funktionen, Klassen, Komponenten |
| Mikro | Parameterblöcke, Verzweigungen, Ausdrücke |

Ein Beacon im GTC kann auf jede dieser Ebenen zeigen. Die Granularität des Beacons bestimmt, wie tief der Durchlauf in den Baum eindringt.

---

## 8. Allgemeine Entscheidungsregel

> **Ein Attribut → Klammern auf derselben Zeile.**
> **Zwei oder mehr Attribute → eigener Kindknoten.**

Diese Regel gilt für `param`, `case`, `call` und alle anderen Knotentypen gleichermassen.

---

## 9. GTC als einzige Wahrheitsquelle — Ansicht vs. Bau

### Der GTC ist vollständig — die Ansicht ist variabel

Der GTC wird **einmal** gebaut und bleibt unveränderlich. Er wird nicht mehrfach gebaut, sondern nur unterschiedlich **betrachtet**. Jede Ansicht ist eine Projektion auf eine bestimmte Tiefe:

```
GTC (vollständig, unveränderlich)
│
├── Ansicht depth=1   → nur Wurzel sichtbar
├── Ansicht depth=2   → Wurzel + direkte Kinder
├── Ansicht depth=3   → drei Ebenen aufgeklappt
└── Ansicht depth=∞   → alles sichtbar
```

Die Projektion verändert den GTC nicht. Sie bestimmt nur, wie viel davon angezeigt wird.

### Skalierung am Beispiel

Dieselbe Funktion auf verschiedenen Tiefen:

**depth=1:**
```text
1 function saveFlowAction
```

**depth=2:**
```text
1 function saveFlowAction
2 input
2 body
2 output
```

**depth=4 — vollständig** (wie in §5 beschrieben).

Derselbe GTC, dieselben Regeln, nur unterschiedlich aufgefaltet.

### Individuelle Projektionen vs. gemeinsamer Bau

Es gibt zwei Ebenen, die klar getrennt werden müssen:

| | Erlaubt individuell? | Regel |
|---|---|---|
| **Ansicht** (Tiefe, Fokus, Filter) | ✅ Ja | Jeder wählt, wie tief er schaut |
| **Bau des GTC** (Knotentypen, Struktur) | ❌ Nein | Gemeinsame Regeln für alle |

Jemand könnte sagen: „Ich würde `readSessionFromCookie` nicht als `call` eintragen, sondern als `action`." Das ist eine individuelle Interpretation. Das Ziel aber ist ein GTC, der für **alle** nach denselben Prinzipien gebaut ist — sonst ist kein zuverlässiger Vergleich möglich.

### Die zwei Ebenen — O und O'

```
GTC (Baum)    — gebaut nach gemeinsamen Regeln — unveränderlich   ← O
     │
     └── Sicht — individuelle Projektion, Tiefe, Filter, Fokus    ← O'
```

Der GTC selbst ist das **O** — der destillierte Kern, der für alle gleich ist.
Die Sicht ist das **O'** — die Projektion nach außen, kontextabhängig.

Das ist dasselbe Prinzip wie in der Grundterminologie: O bleibt stabil, O' variiert nach Kontext und Betrachter.
