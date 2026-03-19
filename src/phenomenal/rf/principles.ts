import type { RfPrinciple } from "@/phenomenal/types/rf";

export const principles: RfPrinciple[] = [
  {
    id: "rf-de-variables",
    title: "Prinzip: Variablen",
    description: "Variablen speichern Werte; mit let veränderbar, mit const konstant.",
    tags: ["javascript", "variablen", "grundlagen"],
  },
  {
    id: "rf-de-functions",
    title: "Prinzip: Funktionen",
    description: "Funktionen kapseln Logik, nehmen Parameter und geben Werte zurück.",
    tags: ["javascript", "funktionen"],
  },
  {
    id: "rf-de-dom",
    title: "Prinzip: DOM",
    description: "DOM stellt HTML als Baum dar; Elemente werden über APIs gelesen und verändert.",
    tags: ["javascript", "dom", "browser"],
  },
  {
    id: "rf-de-arrays",
    title: "Prinzip: Arrays und Iteration",
    description: "Arrays speichern geordnete Werte; map/filter/reduce verarbeiten Daten deklarativ.",
    tags: ["javascript", "arrays", "iteration"],
  },
  {
    id: "rf-de-async",
    title: "Prinzip: Asynchronität",
    description: "Promises und async/await steuern asynchrone Abläufe lesbar und kontrolliert.",
    tags: ["javascript", "async", "promises"],
  },
  {
    id: "rf-de-scope",
    title: "Prinzip: Scope und Closures",
    description: "Funktionen behalten Zugriff auf ihren lexikalischen Scope auch nach dem Aufruf.",
    tags: ["javascript", "scope", "closure"],
  },
];
